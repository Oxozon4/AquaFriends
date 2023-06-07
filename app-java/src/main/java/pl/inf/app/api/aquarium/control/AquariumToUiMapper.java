package pl.inf.app.api.aquarium.control;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.inf.app.api.accessorytype.control.AccessoryTypeToUiMapper;
import pl.inf.app.api.aquarium.entity.UiAquarium;
import pl.inf.app.api.decoratortype.control.DecoratorTypeToUiMapper;
import pl.inf.app.api.fish.control.FishToUiMapper;
import pl.inf.app.bm.aquarium.entity.AquariumBE;
import pl.inf.app.utils.Mapper;

import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AquariumToUiMapper implements Mapper<AquariumBE, UiAquarium> {

	private final AccessoryTypeToUiMapper accessoryTypeToUiMapper;
	private final DecoratorTypeToUiMapper decoratorTypeToUiMapper;
	private final FishToUiMapper fishToUiMapper;

	@Override
	public UiAquarium map(final AquariumBE source) {
		final UiAquarium uiAquarium = new UiAquarium();
		uiAquarium.setId(source.getId());
		uiAquarium.setName(source.getName());
		uiAquarium.setHeight(source.getHeight());
		uiAquarium.setLength(source.getLength());
		uiAquarium.setWidth(source.getWidth());
		Optional.ofNullable(source.getAccessories())
				.ifPresent(accessoryTypeBES -> uiAquarium.setAccessories(
						accessoryTypeBES.stream().map(accessoryTypeToUiMapper::map).collect(Collectors.toSet())));
		Optional.ofNullable(source.getDecorators())
				.ifPresent(decoratorTypeBES -> uiAquarium.setDecorators(
						decoratorTypeBES.stream().map(decoratorTypeToUiMapper::map).collect(Collectors.toSet())));
		Optional.ofNullable(source.getFishes())
				.ifPresent(
						fishBES -> uiAquarium.setFishes(fishBES.stream().map(fishToUiMapper::map).collect(Collectors.toSet())));
		return uiAquarium;
	}
}
