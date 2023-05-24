package pl.inf.app.bm.aquariumtemplate.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.inf.app.api.accessorytype.entity.UiAccessoryType;
import pl.inf.app.api.aquariumtemplate.entity.UiAquariumTemplate;
import pl.inf.app.bm.accessorytype.control.AccessoryTypeRepositoryBA;
import pl.inf.app.bm.aquariumtemplate.control.AquariumTemplateRepositoryBA;
import pl.inf.app.bm.aquariumtemplate.entity.AquariumTemplateBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;
import pl.inf.app.utils.Mapper;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AquariumTemplateBF {
	private final AquariumTemplateRepositoryBA aquariumTemplateRepositoryBA;
	private final AccessoryTypeRepositoryBA accessoryTypeRepositoryBA;

	@Transactional
	public <T> T getById(final int id, final Mapper<AquariumTemplateBE, T> uiMapper) {
		return aquariumTemplateRepositoryBA.findById(id)
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	@Transactional
	public <T> List<T> getAll(final Mapper<AquariumTemplateBE, T> uiMapper) {
		return aquariumTemplateRepositoryBA.findAll().stream().map(uiMapper::map).collect(Collectors.toList());
	}

	@Transactional
	public <T> T save(UiAquariumTemplate aquariumTemplate, final Mapper<AquariumTemplateBE, T> uiMapper) {
		final AquariumTemplateBE aquariumTemplateBE = AquariumTemplateBE.builder()
				.name(aquariumTemplate.getName())
				.height(aquariumTemplate.getHeight())
				.width(aquariumTemplate.getWidth())
				.length(aquariumTemplate.getLength())
				.accessories(new HashSet<>(accessoryTypeRepositoryBA.findAllById(
						aquariumTemplate.getAccessories().stream().map(UiAccessoryType::getId).collect(Collectors.toList()))))
				.build();
		return uiMapper.map(aquariumTemplateRepositoryBA.save(aquariumTemplateBE));
	}

	@Transactional
	public <T> T update(Integer id, UiAquariumTemplate aquariumTemplate, Mapper<AquariumTemplateBE, T> uiMapper) {
		return aquariumTemplateRepositoryBA.findById(id).map(aquariumTemplateBE -> {
			aquariumTemplateBE.setName(aquariumTemplate.getName());
			aquariumTemplateBE.setWidth(aquariumTemplate.getWidth());
			aquariumTemplateBE.setHeight(aquariumTemplate.getHeight());
			aquariumTemplateBE.setLength(aquariumTemplate.getLength());
			aquariumTemplateBE.setAccessories(new HashSet<>(accessoryTypeRepositoryBA.findAllById(
					aquariumTemplate.getAccessories().stream().map(UiAccessoryType::getId).collect(Collectors.toList()))));
			return aquariumTemplateBE;
		}).map(uiMapper::map).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public void delete(Integer id) {
		aquariumTemplateRepositoryBA.deleteById(id);
	}
}
