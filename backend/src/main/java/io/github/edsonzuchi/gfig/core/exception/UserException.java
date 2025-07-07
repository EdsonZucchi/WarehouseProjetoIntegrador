package io.github.edsonzuchi.gfig.core.exception;

public class UserException extends Exception {

    public static UserException USER_NOT_FOUND = new UserException("User not found");
    public static UserException USER_ADMIN_EXISTS = new UserException("User admin exists");
    public static UserException USER_EXISTS = new UserException("Email already exists");
    public static UserException WRONG_PASSWORD = new UserException("Wrong password");
    public static UserException ROLE_NOT_FOUND = new UserException("Role not found");
    public static UserException USER_INACTIVE = new UserException("User inactive");

    public UserException() {
        super();
    }

    public UserException(String message) {
        super(message);
    }

    public UserException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserException(Throwable cause) {
        super(cause);
    }

    protected UserException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
