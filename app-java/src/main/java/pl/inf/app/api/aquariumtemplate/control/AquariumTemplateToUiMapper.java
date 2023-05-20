package pl.inf.app.api.aquariumtemplate.control;

import org.springframework.stereotype.Component;
import pl.inf.app.api.aquariumtemplate.entity.UiAquariumTemplate;
import pl.inf.app.bm.aquariumtemplate.entity.AquariumTemplateBE;
import pl.inf.app.utils.Mapper;

@Component
public class AquariumTemplateToUiMapper implements Mapper<AquariumTemplateBE, UiAquariumTemplate> {
	@Override
	public UiAquariumTemplate map(final AquariumTemplateBE source) {
		final UiAquariumTemplate uiAquariumTemplate = new UiAquariumTemplate();
		uiAquariumTemplate.setId(source.getId());
		uiAquariumTemplate.setName(source.getName());
		uiAquariumTemplate.setHeight(source.getHeight());
		uiAquariumTemplate.setWidth(source.getWidth());
		uiAquariumTemplate.setLength(source.getLength());
		return uiAquariumTemplate;
	}
}
