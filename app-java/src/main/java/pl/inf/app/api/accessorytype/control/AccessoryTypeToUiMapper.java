package pl.inf.app.api.accessorytype.control;

import org.springframework.stereotype.Component;
import pl.inf.app.api.accessorytype.entity.UiAccessoryType;
import pl.inf.app.bm.accessorytype.entity.AccessoryTypeBE;
import pl.inf.app.utils.Mapper;

@Component
public class AccessoryTypeToUiMapper implements Mapper<AccessoryTypeBE, UiAccessoryType> {
	@Override
	public UiAccessoryType map(final AccessoryTypeBE source) {
		final UiAccessoryType uiAccessoryType = new UiAccessoryType();
		uiAccessoryType.setId(source.getId());
		uiAccessoryType.setName(source.getName());
		uiAccessoryType.setVolume(source.getVolume());
		return uiAccessoryType;
	}
}
