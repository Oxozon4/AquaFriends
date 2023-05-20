package pl.inf.app.bm.fishtyperelation.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.inf.app.api.fishtyperelation.entity.UiFishTypeRelation;
import pl.inf.app.bm.fishtype.control.FishTypeRepositoryBA;
import pl.inf.app.bm.fishtyperelation.control.FishTypeRelationRepositoryBA;
import pl.inf.app.bm.fishtyperelation.entity.FishTypeRelationBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;
import pl.inf.app.utils.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FishTypeRelationBF {
	private final FishTypeRelationRepositoryBA fishTypeRelationRepositoryBA;
	private final FishTypeRepositoryBA fishTypeRepositoryBA;

	public <T> T getById(final int id, final Mapper<FishTypeRelationBE, T> uiMapper) {
		return fishTypeRelationRepositoryBA.findById(id)
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public <T> List<T> getAll(final Mapper<FishTypeRelationBE, T> uiMapper) {
		return fishTypeRelationRepositoryBA.findAll().stream().map(uiMapper::map).collect(Collectors.toList());
	}

	@Transactional
	public <T> T save(UiFishTypeRelation fishTypeRelation, final Mapper<FishTypeRelationBE, T> uiMapper) {
		final FishTypeRelationBE fishTypeRelationBE = FishTypeRelationBE.builder()
				.relation(fishTypeRelation.getRelation())
				.fish1(fishTypeRepositoryBA.findById(fishTypeRelation.getFish1().getId())
						.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR)))
				.fish2(fishTypeRepositoryBA.findById(fishTypeRelation.getFish2().getId())
						.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR)))
				.build();
		return uiMapper.map(fishTypeRelationRepositoryBA.save(fishTypeRelationBE));
	}

	public void delete(Integer id) {
		fishTypeRelationRepositoryBA.deleteById(id);
	}
}
