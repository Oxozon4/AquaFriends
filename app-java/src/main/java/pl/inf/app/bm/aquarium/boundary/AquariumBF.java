package pl.inf.app.bm.aquarium.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.inf.app.api.aquarium.entity.UiAquarium;
import pl.inf.app.bm.aquarium.control.AquariumRepositoryBA;
import pl.inf.app.bm.aquarium.entity.AquariumBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;
import pl.inf.app.utils.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AquariumBF {
	private final AquariumRepositoryBA aquariumRepositoryBA;

	public <T> T getById(final int id, final Mapper<AquariumBE, T> uiMapper) {
		return aquariumRepositoryBA.findById(id)
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public <T> List<T> getAll(final Mapper<AquariumBE, T> uiMapper) {
		return aquariumRepositoryBA.findAll().stream().map(uiMapper::map).collect(Collectors.toList());
	}

	public <T> T save(UiAquarium aquarium, final Mapper<AquariumBE, T> uiMapper) {
		final AquariumBE aquariumBE = AquariumBE.builder()
				.length(aquarium.getLength())
				.width(aquarium.getWidth())
				.height(aquarium.getHeight())
				.name(aquarium.getName())
				.build();
		return uiMapper.map(aquariumRepositoryBA.save(aquariumBE));
	}

	@Transactional
	public <T> T update(Integer id, UiAquarium aquarium, Mapper<AquariumBE, T> uiMapper) {
		return aquariumRepositoryBA.findById(id).map(aquariumBE -> {
			aquariumBE.setName(aquarium.getName());
			aquariumBE.setHeight(aquarium.getHeight());
			aquariumBE.setWidth(aquarium.getWidth());
			aquariumBE.setLength(aquarium.getLength());
			return aquariumBE;
		}).map(uiMapper::map).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public void delete(Integer id) {
		aquariumRepositoryBA.deleteById(id);
	}
}
