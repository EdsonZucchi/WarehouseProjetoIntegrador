package io.github.edsonzuchi.gfig.core.exception;

public class WarehouseException extends RuntimeException {

    public static WarehouseException NAME_IS_BLANK = new WarehouseException("Name warehouse is blank");
    public static WarehouseException WAREHOUSE_NOT_FOUND = new WarehouseException("Warehouse not found");

    public WarehouseException() {
    }

    public WarehouseException(String message) {
        super(message);
    }

    public WarehouseException(String message, Throwable cause) {
        super(message, cause);
    }

    public WarehouseException(Throwable cause) {
        super(cause);
    }

    public WarehouseException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
