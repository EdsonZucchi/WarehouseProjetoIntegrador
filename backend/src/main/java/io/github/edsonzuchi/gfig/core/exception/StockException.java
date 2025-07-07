package io.github.edsonzuchi.gfig.core.exception;

public class StockException extends Exception {

    public static StockException WAREHOUSE_IS_NULL = new StockException("Warehouse is null");
    public static StockException WAREHOUSE_NOT_FOUND = new StockException("Warehouse is not found");
    public static StockException PRODUCT_IS_NULL = new StockException("Product is null");
    public static StockException PRODUCT_NOT_FOUND = new StockException("Product not found");
    public static StockException VARIANT_NOT_FOUND = new StockException("Variant not found");
    public static StockException VARIANT_NOT_INFORMATE = new StockException("Variant not informed");
    public static StockException TYPE_IS_NULL = new StockException("Type is null");
    public static StockException QUANTITY_LESS_THAN_ZERO = new StockException("Quantity less than 0");
    public static StockException QUANTITY_MORE_THAN_ONE = new StockException("Quantity more than 1");
    public static StockException QUANTITY_IS_NULL = new StockException("Quantity is null");

    public StockException() {
        super();
    }

    public StockException(String message) {
        super(message);
    }

    public StockException(String message, Throwable cause) {
        super(message, cause);
    }

    public StockException(Throwable cause) {
        super(cause);
    }

    protected StockException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
