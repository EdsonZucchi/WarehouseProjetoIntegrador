package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.ProductException;
import io.github.edsonzuchi.gfig.core.exception.RequestException;
import io.github.edsonzuchi.gfig.core.exception.StockException;
import io.github.edsonzuchi.gfig.core.exception.WarehouseException;
import io.github.edsonzuchi.gfig.core.model.dto.request.RequestItemRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.RequestRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRelease;
import io.github.edsonzuchi.gfig.core.model.dto.response.*;
import io.github.edsonzuchi.gfig.core.model.entity.*;
import io.github.edsonzuchi.gfig.core.model.enums.StatusCode;
import io.github.edsonzuchi.gfig.core.model.enums.StatusRequest;
import io.github.edsonzuchi.gfig.core.model.enums.TypeMovement;
import io.github.edsonzuchi.gfig.core.model.enums.UserRole;
import io.github.edsonzuchi.gfig.core.service.RequestService;
import io.github.edsonzuchi.gfig.core.service.StockService;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.infra.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository repository;
    private final RequestItemRepository itemRepository;
    private final WarehouseRepository warehouseRepository;
    private final VariantRepository variantRepository;
    private final UtilsService utilsService;
    private final StockRepository stockRepository;
    private final StockService stockService;

    @Override
    public RequestResponse saveRequest(RequestRequest request, User user) {
        var warehouseOptional = warehouseRepository.findById(request.warehouseId());
        if (warehouseOptional.isEmpty()) {
            throw WarehouseException.WAREHOUSE_NOT_FOUND;
        }
        var warehouse = warehouseOptional.get();

        Request savedRequest;
        if (request.id() == null) {
            savedRequest = new Request();
            savedRequest.setUser(user);
            savedRequest.setStatusRequest(StatusRequest.TYPING);
        } else {
            savedRequest = repository.findById(request.id()).get();
            if (savedRequest == null) {
                throw RequestException.REQUEST_NOT_FOUND;
            }
            if (!Objects.equals(savedRequest.getUser().getId(), user.getId())) {
                throw RequestException.REQUEST_USER_DIFFERENT;
            }
        }

        savedRequest.setBodyRequested(request.body());
        savedRequest.setWarehouseRequested(warehouse);
        var save = repository.save(savedRequest);

        return new RequestResponse(
                save.getId(),
                utilsService.userResponse(user.getId()),
                utilsService.warehouseResponse(save.getWarehouseRequested().getId()),
                null,
                save.getStatusRequest().getTranslate(),
                save.getBodyRequested(),
                save.getBodyReturned()
        );
    }

    @Override
    public RequestItemResponse saveRequestItem(RequestItemRequest requestItem, User user) {
        var requestOptional = repository.findById(requestItem.idRequest());
        if (requestOptional.isEmpty()) {
            throw RequestException.REQUEST_NOT_FOUND;
        }
        var request = requestOptional.get();

        var variantOptional = variantRepository.findById(requestItem.idVariant());
        if (variantOptional.isEmpty()) {
            throw ProductException.VARIANT_NOT_FOUND;
        }
        var variant = variantOptional.get();
        var product = variant.getProduct();

        if (requestItem.quantity() < 0) {
            throw RequestException.REQUEST_ITEM_QUANTITY_INVALID;
        }

        RequestItem savedRequest;
        var optional = itemRepository.findByRequestIdAndVariantId(request.getId(), variant.getId());
        savedRequest = optional.orElseGet(RequestItem::new);

        savedRequest.setRequest(request);
        savedRequest.setProduct(product);
        savedRequest.setVariant(variant);
        savedRequest.setQuantityRequested(requestItem.quantity());

        if (savedRequest.getQuantityRequested() == 0) {
            itemRepository.delete(savedRequest);
            return null;
        }

        itemRepository.save(savedRequest);

        return new RequestItemResponse(
                savedRequest.getId(),
                utilsService.requestResponse(savedRequest.getId()),
                utilsService.productResponse(savedRequest.getProduct().getId()),
                utilsService.variantResponse(savedRequest.getVariant().getId()),
                savedRequest.getQuantityRequested()
        );
    }

    @Override
    public RequestResponse finishTypingRequest(Long idRequest) {
        var requestOptional = repository.findById(idRequest);
        if (requestOptional.isEmpty()) {
            throw RequestException.REQUEST_NOT_FOUND;
        }
        var request = requestOptional.get();
        if (request.getStatusRequest() != StatusRequest.TYPING) {
            throw RequestException.REQUEST_NOT_POSSIBLE;
        }

        var items = itemRepository.findByRequestId(idRequest);
        if (items.isEmpty()) {
            throw RequestException.REQUEST_ITEM_NOT_FOUND;
        }

        try {
            List<StockRelease> stockReleases = new ArrayList<>();
            for (var item : items) {
                stockReleases.add(new StockRelease(
                        request.getWarehouseRequested().getId(),
                        item.getProduct().getId(),
                        item.getVariant().getId(),
                        item.getQuantityRequested(),
                        TypeMovement.REQUEST
                ));
            }
            stockService.StockListRegister(stockReleases);
        } catch (StockException se) {
            throw RequestException.STOCK_INSUFFICIENT;
        }

        request.setStatusRequest(StatusRequest.ACCEPTED);
        repository.save(request);

        return new RequestResponse(
                request.getId(),
                utilsService.userResponse(request.getUser().getId()),
                utilsService.warehouseResponse(request.getWarehouseRequested().getId()),
                (request.getWarehouseReturned() != null ? utilsService.warehouseResponse(request.getWarehouseReturned().getId()) : null),                request.getStatusRequest().getTranslate(),
                request.getBodyRequested(),
                request.getBodyReturned()
        );
    }

    @Override
    public List<RequestResponse> getRequests(User user) {
        List<RequestResponse> requestResponses = new ArrayList<>();

        List<Request> requests;
        if (user.getRole() == UserRole.REQUESTER) {
            requests = repository.findAllByUserId(user.getId());
        } else {
            requests = repository.findAll();
        }

        for (Request request : requests) {
            requestResponses.add(new RequestResponse(
                    request.getId(),
                    utilsService.userResponse(request.getUser().getId()),
                    utilsService.warehouseResponse(request.getWarehouseRequested().getId()),
                    (request.getWarehouseReturned() != null ? utilsService.warehouseResponse(request.getWarehouseReturned().getId()) : null),
                    request.getStatusRequest().getTranslate(),
                    request.getBodyRequested(),
                    request.getBodyReturned()
            ));
        }

        return requestResponses;
    }

    @Override
    public RequestListResponse getRequestList(Long idRequest) {
        var requestOptional = repository.findById(idRequest);
        if (requestOptional.isEmpty()) {
            throw RequestException.REQUEST_NOT_FOUND;
        }
        var request = requestOptional.get();

        var items = itemRepository.findByRequestId(idRequest);
        List<RequestItemResponse> requestItemResponses = new ArrayList<>();
        for (RequestItem item : items) {
            requestItemResponses.add(new RequestItemResponse(
                    item.getId(),
                    null,
                    utilsService.productResponse(item.getProduct().getId()),
                    utilsService.variantResponse(item.getVariant().getId()),
                    item.getQuantityRequested()
            ));
        }

        return new RequestListResponse(
                request.getId(),
                utilsService.userResponse(request.getUser().getId()),
                utilsService.warehouseResponse(request.getWarehouseRequested().getId()),
                request.getStatusRequest().getTranslate(),
                request.getStatusRequest().getCode(),
                request.getBodyRequested(),
                requestItemResponses
        );
    }

    @Override
    public List<ProductVariantStockResponse> getItems(Long idRequest, String filter) {
        List<ProductVariantStockResponse> productVariantStockResponses = new ArrayList<>();

        var optional = repository.findById(idRequest);
        if (optional.isEmpty()) {
            throw RequestException.REQUEST_NOT_FOUND;
        }
        var request = optional.get();

        var items = itemRepository.findByRequestId(idRequest);

        if (request.getStatusRequest() == StatusRequest.TYPING) {
            HashMap<Long, RequestItem> requestItems = new HashMap<>();
            for (RequestItem item : items) {
                requestItems.put(item.getVariant().getId(), item);
            }

            var variants = variantRepository.findAll();
            for (Variant variant : variants) {
                if (!variant.isActive()) {
                    continue;
                }
                var product = variant.getProduct();
                if (!product.isActive()) {
                    continue;
                }

                if (product.notContainsFilter(filter) && variant.notContainsFilter(filter)) {
                    continue;
                }

                Double quantityStock = 0.0;
                var optionalStock = stockRepository.findById(new StockId(request.getWarehouseRequested(), product, variant));
                if (optionalStock.isPresent()) {
                    quantityStock = optionalStock.get().getQuantity();
                }

                Double quantitySelect = 0.0;
                if (requestItems.containsKey(variant.getId())) {
                    quantitySelect = requestItems.get(variant.getId()).getQuantityRequested();
                }

                productVariantStockResponses.add(new ProductVariantStockResponse(
                        new ProductResponse(
                                product.getId(),
                                product.getName(),
                                null,
                                new UMResponse(
                                        product.getUm().getAcronym(),
                                        null
                                ),
                                null, null, null, null, null, null
                        ),
                        new VariantResponse(
                                variant.getId(),
                                variant.getName(),
                                variant.getCode(),
                                null
                        ),
                        quantityStock,
                        quantitySelect
                ));
            }
        } else {
            for (RequestItem item : items) {
                var variant = item.getVariant();
                var product = variant.getProduct();

                if (product.notContainsFilter(filter) && variant.notContainsFilter(filter)) {
                    continue;
                }

                Double quantityStock = 0.0;
                var optionalStock = stockRepository.findById(new StockId(request.getWarehouseRequested(), product, variant));
                if (optionalStock.isPresent()) {
                    quantityStock = optionalStock.get().getQuantity();
                }

                productVariantStockResponses.add(new ProductVariantStockResponse(
                        new ProductResponse(
                                product.getId(),
                                product.getName(),
                                null,
                                new UMResponse(
                                        product.getUm().getAcronym(),
                                        null
                                ),
                                null, null, null, null, null, null
                        ),
                        new VariantResponse(
                                variant.getId(),
                                variant.getName(),
                                variant.getCode(),
                                null
                        ),
                        quantityStock,
                        item.getQuantityRequested()
                ));
            }
        }

        return productVariantStockResponses;
    }

    @Override
    @Transactional
    public void cancelRequest(Long idRequest) {
        var optional = repository.findById(idRequest);
        if (optional.isEmpty()) {
            throw RequestException.REQUEST_NOT_FOUND;
        }
        var request = optional.get();

        if (request.getStatusRequest() != StatusRequest.TYPING) {
            throw RequestException.REQUEST_NOT_POSSIBLE;
        }

        itemRepository.deleteByRequest(request);
        repository.delete(request);
    }
}
