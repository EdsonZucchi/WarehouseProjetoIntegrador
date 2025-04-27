package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.exception.StockException;
import io.github.edsonzuchi.gfig.core.model.dto.request.StockRelease;
import io.github.edsonzuchi.gfig.core.model.entity.Stock;
import io.github.edsonzuchi.gfig.core.model.entity.StockId;
import io.github.edsonzuchi.gfig.core.model.entity.Variant;
import io.github.edsonzuchi.gfig.core.service.StockService;
import io.github.edsonzuchi.gfig.infra.repository.ProductRepository;
import io.github.edsonzuchi.gfig.infra.repository.StockRepository;
import io.github.edsonzuchi.gfig.infra.repository.VariantRepository;
import io.github.edsonzuchi.gfig.infra.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;

    @Override
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
        Variant variant = null;
        if (stockRelease.idVariant() != null) {
            variant = variantRepository.findById(stockRelease.idVariant()).orElse(null);
            if (variant == null) {
                throw StockException.VARIANT_NOT_FOUND;
            }
        }

        var variantProduct = variantRepository.findByProductId(product.getId());
        if (!variantProduct.isEmpty() && variant == null) {
            throw StockException.VARIANT_NOT_INFORMATE;
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
        stock.setQuantity(operation.executeOperation(stock.getQuantity(), stockRelease.quantity()));

        if (stock.getQuantity() < 0) {
            throw StockException.QUANTITY_LESS_THAN_ZERO;
        }

        return stockRepository.save(stock);
    }
}
