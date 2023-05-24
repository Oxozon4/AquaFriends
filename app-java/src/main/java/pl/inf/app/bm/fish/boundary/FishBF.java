package pl.inf.app.bm.fish.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.inf.app.api.fish.entity.UiFish;
import pl.inf.app.bm.aquarium.control.AquariumRepositoryBA;
import pl.inf.app.bm.fish.control.FishRepositoryBA;
import pl.inf.app.bm.fish.entity.FishBE;
import pl.inf.app.bm.fishtype.control.FishTypeRepositoryBA;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;
import pl.inf.app.utils.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FishBF {
	private final FishRepositoryBA fishRepositoryBA;
	private final FishTypeRepositoryBA fishTypeRepositoryBA;
	private final AquariumRepositoryBA aquariumRepositoryBA;

	@Transactional
	public <T> T getById(final int id, final Mapper<FishBE, T> uiMapper) {
		return fishRepositoryBA.findById(id)
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	@Transactional
	public <T> List<T> getAll(final Mapper<FishBE, T> uiMapper) {
		return fishRepositoryBA.findAll().stream().map(uiMapper::map).collect(Collectors.toList());
	}

	@Transactional
	public <T> T save(UiFish fish, final Mapper<FishBE, T> uiMapper) {
		final FishBE fishBE = FishBE.builder()
				.birthDay(fish.getBirthDay())
				.healthStatus(fish.getHealthStatus())
				.fishType(fishTypeRepositoryBA.getById(fish.getFishType().getId()))
				.aquariumBE(aquariumRepositoryBA.getById(fish.getAquarium().getId()))
				.build();
		return uiMapper.map(fishRepositoryBA.save(fishBE));
	}

	@Transactional
	public <T> T update(Integer id, UiFish fish, Mapper<FishBE, T> uiMapper) {
		return fishRepositoryBA.findById(id).map(fishBE -> {
			fishBE.setBirthDay(fish.getBirthDay());
			fishBE.setHealthStatus(fish.getHealthStatus());
			fishBE.setFishType(fishTypeRepositoryBA.getById(fish.getFishType().getId()));
			fishBE.setAquariumBE(aquariumRepositoryBA.getById(fish.getAquarium().getId()));
			return fishBE;
		}).map(uiMapper::map).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public void delete(Integer id) {
		fishRepositoryBA.deleteById(id);
	}
}
