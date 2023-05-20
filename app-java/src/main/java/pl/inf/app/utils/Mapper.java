package pl.inf.app.utils;

/**
 * Interface to map entities
 *
 * @param <S> Source  Type
 * @param <T> Target  Type
 */
@FunctionalInterface
public interface Mapper<S, T> {

	/**
	 * Map the source entity to the target model
	 *
	 * @param source The source entity
	 * @return mapped model
	 */
	T map(final S source);
}
