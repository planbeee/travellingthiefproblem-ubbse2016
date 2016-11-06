package exception;

public class FeatureEntityNotFoundException extends RuntimeException {

    private final static ErrorResponse.ErrorCode ERROR_CODE = ErrorResponse.ErrorCode.FEATURE_NOT_FOUND;

    public FeatureEntityNotFoundException() {
    }

    public FeatureEntityNotFoundException(String message) {
        super(message);
    }

    public FeatureEntityNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public FeatureEntityNotFoundException(Throwable cause) {
        super(cause);
    }

    public ErrorResponse.ErrorCode getErrorCode() {

        return ERROR_CODE;
    }
}
