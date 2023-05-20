package pl.inf.app.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@Getter
@RequiredArgsConstructor
public enum ErrorType {
	USER_NOT_FOUND("B001 | User not found. User id: {}", NOT_FOUND),
	REGISTER_ERROR("B002 | Cannot register user : {}", UNPROCESSABLE_ENTITY),
	NOT_FOUND_ERROR("B003 | Not found.", NOT_FOUND);

	private final String description;
	private final HttpStatus defaultStatus;
}
