package pl.inf.app.bm.fishtype.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.inf.app.api.fishtype.entity.UiFishType;
import pl.inf.app.bm.fishtype.control.FishTypeRepositoryBA;
import pl.inf.app.bm.fishtype.entity.FishTypeBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;
import pl.inf.app.utils.Mapper;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FishTypeBF {
	private final FishTypeRepositoryBA fishTypeRepositoryBA;

	@Transactional
	public <T> T getById(final int id, final Mapper<FishTypeBE, T> uiMapper) {
		return fishTypeRepositoryBA.findById(id)
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	@Transactional
	public <T> List<T> getAll(final Mapper<FishTypeBE, T> uiMapper) {
		return fishTypeRepositoryBA.findAll().stream().map(uiMapper::map).collect(Collectors.toList());
	}

	@Transactional
	public <T> T save(UiFishType fishType, final Mapper<FishTypeBE, T> uiMapper) {
		final FishTypeBE fishTypeBE = FishTypeBE.builder()
				.name(fishType.getName())
				.maxGh(fishType.getMaxGh())
				.minGh(fishType.getMinGh())
				.maxKh(fishType.getMaxKh())
				.minKh(fishType.getMinKh())
				.maxNo2(fishType.getMaxNo2())
				.minNo2(fishType.getMinNo2())
				.maxNo3(fishType.getMaxNo3())
				.minNo3(fishType.getMinNo3())
				.enemies(new HashSet<>(fishTypeRepositoryBA.findAllById(
						fishType.getEnemies().stream().map(UiFishType::getId).collect(Collectors.toList()))))
				.build();
		return uiMapper.map(fishTypeRepositoryBA.save(fishTypeBE));
	}

	@Transactional
	public <T> T update(Integer id, UiFishType fishType, Mapper<FishTypeBE, T> uiMapper) {
		return fishTypeRepositoryBA.findById(id).map(fishTypeBE -> {
			fishTypeBE.setName(fishType.getName());
			fishTypeBE.setMaxPh(fishType.getMaxPh());
			fishTypeBE.setMinPh(fishType.getMinPh());
			fishTypeBE.setMaxGh(fishType.getMinGh());
			fishTypeBE.setMinGh(fishType.getMinGh());
			fishTypeBE.setMaxKh(fishType.getMaxKh());
			fishTypeBE.setMinKh(fishType.getMinKh());
			fishTypeBE.setMaxNo2(fishType.getMaxNo2());
			fishTypeBE.setMinNo2(fishType.getMinNo2());
			fishTypeBE.setMaxNo3(fishType.getMaxNo3());
			fishTypeBE.setMinNo3(fishType.getMinNo3());
			fishTypeBE.setEnemies(new HashSet<>(fishTypeRepositoryBA.findAllById(
					fishType.getEnemies().stream().map(UiFishType::getId).collect(Collectors.toList()))));
			return fishTypeBE;
		}).map(uiMapper::map).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public void delete(Integer id) {
		fishTypeRepositoryBA.deleteById(id);
	}
}
