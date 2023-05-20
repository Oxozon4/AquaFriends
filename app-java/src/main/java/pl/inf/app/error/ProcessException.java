package pl.inf.app.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.Arrays;

/**
 * Custom exception to convert to user response.
 */
@Getter
public class ProcessException extends RuntimeException {
	private final String description;
	private final HttpStatus httpStatus;
	private final Object[] params;

	/**
	 * Constructor with errorType
	 *
	 * @param errorType the type of error
	 * @param params    arguments to fill descriptions
	 */
	public ProcessException(final ErrorType errorType, final Object... params) {
		super(errorType.getDescription());
		this.httpStatus = errorType.getDefaultStatus();
		this.description = errorType.getDescription();
		this.params = params;
	}

	@Override
	public String toString() {
		return "ProcessException: " + "httpStatus=" + httpStatus + ", description=" + description + ", params=" +
			   Arrays.toString(params);
	}
}
