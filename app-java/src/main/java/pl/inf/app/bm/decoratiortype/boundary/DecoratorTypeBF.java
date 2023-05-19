package pl.inf.app.bm.decoratiortype.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.inf.app.bm.decoratiortype.control.DecoratorTypeRepositoryBA;
import pl.inf.app.bm.decoratiortype.entity.DecoratorTypeBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;

@Service
@RequiredArgsConstructor
public class DecoratorTypeBF {
	private final DecoratorTypeRepositoryBA decoratorTypeRepositoryBA;

	public DecoratorTypeBE getById(final int id) {
		return decoratorTypeRepositoryBA.findById(id).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}
}
