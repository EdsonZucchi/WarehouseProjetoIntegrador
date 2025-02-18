package io.github.edsonzuchi.gfig.core.exception;

public class ProductException extends RuntimeException {

    public static ProductException PRODUCT_NOT_FOUND = new ProductException("Product not found");
    public static ProductException PRODUCT_ALREADY_EXISTS = new ProductException("Product already exists");
    public static ProductException PRODUCT_NAME_IS_BLANK = new ProductException("Product name is blank");
    public static ProductException PRODUCT_IS_NOT_WAREHOUSE = new ProductException("Product is not warehouse");

    public ProductException() {
    }

    public ProductException(String message) {
        super(message);
    }

    public ProductException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProductException(Throwable cause) {
        super(cause);
    }

    public ProductException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
