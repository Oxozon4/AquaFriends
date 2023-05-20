package pl.inf.app.api.decoratortype.control;

import org.springframework.stereotype.Component;
import pl.inf.app.api.decoratortype.entity.UiDecoratorType;
import pl.inf.app.bm.decoratortype.entity.DecoratorTypeBE;
import pl.inf.app.utils.Mapper;

@Component
public class DecoratorTypeToUiMapper implements Mapper<DecoratorTypeBE, UiDecoratorType> {
	@Override
	public UiDecoratorType map(final DecoratorTypeBE source) {
		final UiDecoratorType uiDecoratorType = new UiDecoratorType();
		uiDecoratorType.setId(source.getId());
		uiDecoratorType.setName(source.getName());
		uiDecoratorType.setType(source.getType());
		return uiDecoratorType;
	}
}
