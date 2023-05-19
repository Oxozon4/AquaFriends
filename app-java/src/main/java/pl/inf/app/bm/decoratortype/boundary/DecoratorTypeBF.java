package pl.inf.app.bm.decoratortype.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.inf.app.api.decoratortype.entity.UiDecoratorType;
import pl.inf.app.bm.decoratortype.control.DecoratorTypeRepositoryBA;
import pl.inf.app.bm.decoratortype.entity.DecoratorTypeBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;
import pl.inf.app.utils.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DecoratorTypeBF {
	private final DecoratorTypeRepositoryBA decoratorTypeRepositoryBA;

	public <T> T getById(final int id, final Mapper<DecoratorTypeBE, T> uiMapper) {
		return decoratorTypeRepositoryBA.findById(id)
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public <T> List<T> getAll(final Mapper<DecoratorTypeBE, T> uiMapper) {
		return decoratorTypeRepositoryBA.findAll().stream().map(uiMapper::map).collect(Collectors.toList());
	}

	public <T> T save(UiDecoratorType decoratorType, final Mapper<DecoratorTypeBE, T> uiMapper) {
		final DecoratorTypeBE decoratorTypeBE =
				DecoratorTypeBE.builder().type(decoratorType.getType()).name(decoratorType.getName()).build();
		return uiMapper.map(decoratorTypeRepositoryBA.save(decoratorTypeBE));
	}

	@Transactional
	public <T> T update(Integer id, UiDecoratorType decoratorType, Mapper<DecoratorTypeBE, T> uiMapper) {
		return decoratorTypeRepositoryBA.findById(id).map(decoratorTypeBE -> {
			decoratorTypeBE.setName(decoratorType.getName());
			decoratorTypeBE.setType(decoratorType.getType());
			return decoratorTypeBE;
		}).map(uiMapper::map).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public void delete(Integer id) {
		decoratorTypeRepositoryBA.deleteById(id);
	}
}
