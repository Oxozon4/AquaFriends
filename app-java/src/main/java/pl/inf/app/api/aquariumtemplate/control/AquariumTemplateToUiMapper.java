package pl.inf.app.api.aquariumtemplate.control;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.inf.app.api.accessorytype.control.AccessoryTypeToUiMapper;
import pl.inf.app.api.aquariumtemplate.entity.UiAquariumTemplate;
import pl.inf.app.bm.aquariumtemplate.entity.AquariumTemplateBE;
import pl.inf.app.utils.Mapper;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AquariumTemplateToUiMapper implements Mapper<AquariumTemplateBE, UiAquariumTemplate> {
	private final AccessoryTypeToUiMapper accessoryTypeToUiMapper;

	@Override
	public UiAquariumTemplate map(final AquariumTemplateBE source) {
		final UiAquariumTemplate uiAquariumTemplate = new UiAquariumTemplate();
		uiAquariumTemplate.setId(source.getId());
		uiAquariumTemplate.setName(source.getName());
		uiAquariumTemplate.setHeight(source.getHeight());
		uiAquariumTemplate.setWidth(source.getWidth());
		uiAquariumTemplate.setLength(source.getLength());
		uiAquariumTemplate.setAccessories(
				source.getAccessories().stream().map(accessoryTypeToUiMapper::map).collect(Collectors.toSet()));

		return uiAquariumTemplate;
	}
}
