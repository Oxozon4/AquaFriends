package pl.inf.app.utils;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * A class represents a pair of objects. The source object and the object to fill.
 *
 * @param <S> Source class type
 * @param <T> Target class type
 */
@Getter
@RequiredArgsConstructor
public class Filler<S, T> {
	private final S source;
	private final T target;
}
