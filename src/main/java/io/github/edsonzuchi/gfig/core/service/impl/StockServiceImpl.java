package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.StockException;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRelease;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRequest;
import io.github.edsonzuchi.gfig.core.model.entity.Stock;
import io.github.edsonzuchi.gfig.core.model.entity.StockId;
import io.github.edsonzuchi.gfig.core.model.entity.Variant;
import io.github.edsonzuchi.gfig.core.model.entity.Warehouse;
import io.github.edsonzuchi.gfig.core.model.enums.TypeMovement;
import io.github.edsonzuchi.gfig.core.service.StockService;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.infra.repository.ProductRepository;
import io.github.edsonzuchi.gfig.infra.repository.StockRepository;
import io.github.edsonzuchi.gfig.infra.repository.VariantRepository;
import io.github.edsonzuchi.gfig.infra.repository.WarehouseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;
    private final UtilsService utilsService;

    @Override
    @Transactional
    public Stock StockRegister(StockRelease stockRelease) throws StockException {
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

        return stockRepository.save(stock);
    }

    @Override
    @Transactional
    public void StockListRegister(List<StockRelease> list) throws StockException {
        for (StockRelease stockRelease : list) {
            this.StockRegister(stockRelease);
        }
    }

    @Override
    @Transactional
    public Stock Inventory(StockRequest request) throws StockException {
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
        ));
    }
}
