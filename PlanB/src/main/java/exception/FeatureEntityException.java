package exception;

import org.apache.log4j.Logger;

public class FeatureEntityException extends RuntimeException {

    private final static ErrorResponse.ErrorCode ERROR_CODE = ErrorResponse.ErrorCode.INVALID_FEATURE;

    public FeatureEntityException() {
    }

    public FeatureEntityException(String message) {
        super(message);
    }

    public FeatureEntityException(String message, Throwable cause) {
        super(message, cause);
    }

    public FeatureEntityException(Throwable cause) {
        super(cause);
    }

    public ErrorResponse.ErrorCode getErrorCode() {

        return ERROR_CODE;
    }

}
