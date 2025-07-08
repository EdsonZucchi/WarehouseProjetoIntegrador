package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.StockException;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRegisterRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRelease;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.StockMovementResponse;
import io.github.edsonzuchi.gfig.core.model.entity.*;
import io.github.edsonzuchi.gfig.core.model.enums.TypeMovement;
import io.github.edsonzuchi.gfig.core.service.StockService;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.infra.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;
    private final StockMovementRepository stockMovementRepository;
    private final UtilsService utilsService;

    @Override
    @Transactional
    public Stock StockRegister(StockRelease stockRelease, User user) throws StockException {
        StockId stockId = new StockId();

        if (stockRelease.idWarehouse() == null) {
            throw StockException.WAREHOUSE_IS_NULL;
        }
        if (stockRelease.idProduct() == null) {
            throw StockException.PRODUCT_IS_NULL;
        }
        if (stockRelease.type() == null) {
            throw StockException.TYPE_IS_NULL;
        }
        if (stockRelease.quantity() == null) {
            throw StockException.QUANTITY_IS_NULL;
        }

        if (stockRelease.quantity() <= 0) {
            throw StockException.QUANTITY_MORE_THAN_ONE;
        }

        var warehouse = warehouseRepository.findById(stockRelease.idWarehouse()).orElse(null);
        if (warehouse == null) {
            throw StockException.WAREHOUSE_NOT_FOUND;
        }
        var product = productRepository.findById(stockRelease.idProduct()).orElse(null);
        if (product == null) {
            throw StockException.PRODUCT_NOT_FOUND;
        }
        var variant = variantRepository.findById(stockRelease.idVariant()).orElse(null);
        if (variant == null) {
            throw StockException.VARIANT_NOT_FOUND;
        }

        StockId id = new StockId(warehouse, product, variant);
        Stock stock = stockRepository.findById(id).orElse(null);
        if (stock == null) {
            stock = new Stock();
            stock.setWarehouse(warehouse);
            stock.setProduct(product);
            stock.setVariant(variant);
        }

        var operation = stockRelease.type().getOperation();
        stock.setQuantity(operation.executeOperation((stock.getQuantity() == null ? 0 : stock.getQuantity()), stockRelease.quantity()));

        if (stock.getQuantity() < 0) {
            throw StockException.QUANTITY_LESS_THAN_ZERO;
        }

        this.RegisterLog(new StockRegisterRequest(
                warehouse,
                product,
                variant,
                stockRelease.type(),
                stockRelease.quantity(),
                user
        ));

        return stockRepository.save(stock);
    }

    @Override
    @Transactional
    public void StockListRegister(List<StockRelease> list, User user) throws StockException {
        for (StockRelease stockRelease : list) {
            this.StockRegister(stockRelease, user);
        }
    }

    @Override
    @Transactional
    public Stock Inventory(StockRequest request, User user) throws StockException {
        Variant variant = variantRepository.findById(request.idVariant()).orElse(null);
        if (variant == null) {
            throw StockException.VARIANT_NOT_FOUND;
        }

        Warehouse warehouse = warehouseRepository.findById(request.idWarehouse()).orElse(null);
        if (warehouse == null) {
            throw StockException.WAREHOUSE_NOT_FOUND;
        }

        return this.StockRegister(new StockRelease(
                request.idWarehouse(),
                variant.getProduct().getId(),
                request.idVariant(),
                request.quantity(),
                TypeMovement.INVENTORY
        ), user);
    }

    private void RegisterLog(StockRegisterRequest stock) {
        StockMovement stockMovement = new StockMovement();
        stockMovement.setWarehouse(stock.warehouse());
        stockMovement.setProduct(stock.product());
        stockMovement.setVariant(stock.variant());
        stockMovement.setQuantity(stock.quantity());
        stockMovement.setTypeMovement(stock.typeMovement());
        stockMovement.setUser(stock.user());

        stockMovementRepository.save(stockMovement);
    }

    @Override
    public List<StockMovementResponse> getMovements(String filter, Long warehouseId, String userName) throws StockException {
        List<StockMovementResponse> responses = new ArrayList<>();

        var list = stockMovementRepository.findAll();

        list = list.stream().sorted(Comparator.comparing(StockMovement::getCreatedAt).reversed()).toList();

        for (StockMovement movement : list) {
            var product = movement.getProduct();
            var variant = movement.getVariant();
            var user = movement.getUser();
            var warehouse = movement.getWarehouse();

            if (product.notContainsFilter(filter) &&
                    variant.notContainsFilter(filter)) {
                continue;
            }

            if (user.notContainsFilter(userName)) {
                continue;
            }

            if (warehouseId != 0) {
                if (!Objects.equals(warehouse.getId(), warehouseId)) {
                    continue;
                }
            }

            responses.add(new StockMovementResponse(
                    movement.getId(),
                    utilsService.warehouseResponse(warehouse.getId()),
                    utilsService.productResponse(product.getId()),
                    utilsService.variantResponse(variant.getId()),
                    movement.getQuantity(),
                    movement.getTypeMovement().getDescription(),
                    utilsService.userResponse(user.getId()),
                    movement.getCreatedAt()
            ));
        }

        return responses;
    }
}
