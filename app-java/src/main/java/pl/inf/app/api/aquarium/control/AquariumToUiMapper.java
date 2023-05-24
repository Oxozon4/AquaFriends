package pl.inf.app.api.aquarium.control;

import org.springframework.stereotype.Component;
import pl.inf.app.api.aquarium.entity.UiAquarium;
import pl.inf.app.bm.aquarium.entity.AquariumBE;
import pl.inf.app.utils.Mapper;

@Component
public class AquariumToUiMapper implements Mapper<AquariumBE, UiAquarium> {
	@Override
	public UiAquarium map(final AquariumBE source) {
		final UiAquarium uiAquarium = new UiAquarium();
		uiAquarium.setId(source.getId());
		uiAquarium.setName(source.getName());
		uiAquarium.setHeight(source.getHeight());
		uiAquarium.setLength(source.getLength());
		uiAquarium.setWidth(source.getWidth());
		return uiAquarium;
	}
}
