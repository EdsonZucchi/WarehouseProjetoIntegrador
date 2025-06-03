package io.github.edsonzuchi.gfig.core.exception;

public class RequestException extends RuntimeException {

  public static final RequestException REQUEST_NOT_FOUND = new RequestException("Request not found");
  public static final RequestException REQUEST_USER_DIFFERENT = new RequestException("Request user different");
  public static final RequestException REQUEST_ITEM_QUANTITY_INVALID = new RequestException("Item quantity invalid");
  public static final RequestException REQUEST_ITEM_NOT_FOUND = new RequestException("Item not found");

  public RequestException(String message) {
        super(message);
    }
}
