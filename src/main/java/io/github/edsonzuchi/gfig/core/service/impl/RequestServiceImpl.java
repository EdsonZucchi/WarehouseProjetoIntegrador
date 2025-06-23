package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.ProductException;
import io.github.edsonzuchi.gfig.core.exception.RequestException;
import io.github.edsonzuchi.gfig.core.exception.WarehouseException;
import io.github.edsonzuchi.gfig.core.model.dto.request.RequestItemRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.RequestRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.RequestItemResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.RequestListResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.RequestResponse;
import io.github.edsonzuchi.gfig.core.model.entity.Request;
import io.github.edsonzuchi.gfig.core.model.entity.RequestItem;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.model.enums.StatusRequest;
import io.github.edsonzuchi.gfig.core.service.RequestService;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.infra.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository repository;
    private final RequestItemRepository itemRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;
    private final UtilsService utilsService;

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
        var requestOptional = repository.findById(requestItem.id());
        if (requestOptional.isEmpty()) {
            throw RequestException.REQUEST_NOT_FOUND;
        }
        var request = requestOptional.get();

        var productOptional = productRepository.findById(requestItem.id());
        if (productOptional.isEmpty()) {
            throw ProductException.PRODUCT_NOT_FOUND;
        }
        var product = productOptional.get();

        var variantOptional = variantRepository.findById(requestItem.id());
        if (variantOptional.isEmpty()) {
            throw ProductException.VARIANT_NOT_FOUND;
        }
        var variant = variantOptional.get();

        if (requestItem.quantity() <= 0) {
            throw RequestException.REQUEST_ITEM_QUANTITY_INVALID;
        }

        RequestItem savedRequest;
        if (requestItem.id() == null) {
            savedRequest = new RequestItem();
        } else {
            var requestItemOptional = itemRepository.findById(requestItem.id());
            if (requestItemOptional.isEmpty()) {
                throw RequestException.REQUEST_ITEM_NOT_FOUND;
            }
            savedRequest = requestItemOptional.get();
        }

        savedRequest.setRequest(request);
        savedRequest.setProduct(product);
        savedRequest.setVariant(variant);
        savedRequest.setQuantityRequested(requestItem.quantity());
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

        var items = itemRepository.findByRequestId(idRequest);
        if (items.isEmpty()) {
            throw RequestException.REQUEST_ITEM_NOT_FOUND;
        }

        var request = requestOptional.get();
        request.setStatusRequest(StatusRequest.ACCEPTED);
        repository.save(request);

        return new RequestResponse(
                request.getId(),
                utilsService.userResponse(request.getUser().getId()),
                utilsService.warehouseResponse(request.getWarehouseRequested().getId()),
                utilsService.warehouseResponse(request.getWarehouseReturned().getId()),
                request.getStatusRequest().getTranslate(),
                request.getBodyRequested(),
                request.getBodyReturned()
        );
    }

    @Override
    public List<RequestResponse> getRequests(User user) {
        List<RequestResponse> requestResponses = new ArrayList<>();

        List<Request> requests;
        if (user.getAuthorities().size() > 1) {
            requests = repository.findAllByUserId(user.getId());
        } else {
            requests = repository.findAll();
        }

        for (Request request : requests) {
            requestResponses.add(new RequestResponse(
                    request.getId(),
                    utilsService.userResponse(user.getId()),
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
                    utilsService.requestResponse(item.getRequest().getId()),
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
                request.getBodyRequested(),
                requestItemResponses
        );
    }
}
