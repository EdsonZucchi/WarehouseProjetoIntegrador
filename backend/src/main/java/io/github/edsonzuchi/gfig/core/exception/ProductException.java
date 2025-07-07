package io.github.edsonzuchi.gfig.core.exception;

public class ProductException extends RuntimeException {

    public static final ProductException PRODUCT_NOT_FOUND = new ProductException("Product not found");
    public static final ProductException VARIANT_NOT_FOUND = new ProductException("Variant not found");
    public static final ProductException NAME_IS_BLANK = new ProductException("Name is blank");
    public static final ProductException NAME_IS_USAGE = new ProductException("Name is usage");
    public static final ProductException CODE_IS_BLANK = new ProductException("Code is blank");
    public static final ProductException DESCRIPTION_IS_BLANK = new ProductException("Description is blank");
    public static final ProductException UM_IS_BLANK = new ProductException("UM is blank");
    public static final ProductException UM_INVALID = new ProductException("UM invalid");

    public ProductException(String message) {
        super(message);
    }
}
