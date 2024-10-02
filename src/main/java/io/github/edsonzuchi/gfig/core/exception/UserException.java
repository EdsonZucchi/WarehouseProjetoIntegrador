package io.github.edsonzuchi.gfig.core.exception;

public class UserException extends Exception {

    public static UserException userNotFound = new UserException("User not found");
    public static UserException userExists = new UserException("Email already exists");
    public static UserException wrongPassword = new UserException("Wrong password");
    public static UserException roleNotFound = new UserException("Role not found");

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
