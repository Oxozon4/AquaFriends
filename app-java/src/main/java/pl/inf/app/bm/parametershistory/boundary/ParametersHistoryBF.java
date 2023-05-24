package pl.inf.app.bm.parametershistory.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.inf.app.api.parametershistory.entity.UiParametersHistory;
import pl.inf.app.bm.aquarium.control.AquariumRepositoryBA;
import pl.inf.app.bm.parametershistory.control.ParametersHistoryRepositoryBA;
import pl.inf.app.bm.parametershistory.entity.ParametersHistoryBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;
import pl.inf.app.utils.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParametersHistoryBF {
	private final ParametersHistoryRepositoryBA parametersHistoryRepositoryBA;
	private final AquariumRepositoryBA aquariumRepositoryBA;

	public <T> T getById(final int id, final Mapper<ParametersHistoryBE, T> uiMapper, Integer aquariumId) {
		return parametersHistoryRepositoryBA.findById(id)
				.filter(parametersHistoryBE -> parametersHistoryBE.getAquariumBE().getId() == aquariumId)
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public <T> List<T> getAll(final Mapper<ParametersHistoryBE, T> uiMapper, Integer aquariumId) {
		return parametersHistoryRepositoryBA.findAll()
				.stream()
				.filter(parametersHistoryBE -> parametersHistoryBE.getAquariumBE().getId() == aquariumId)
				.map(uiMapper::map)
				.collect(Collectors.toList());
	}

	@Transactional
	public <T> T save(UiParametersHistory parametersHistory, final Mapper<ParametersHistoryBE, T> uiMapper, Integer aquariumId) {
		return aquariumRepositoryBA.findById(aquariumId).map(aquariumBE -> {
			final ParametersHistoryBE parametersHistoryBE = ParametersHistoryBE.builder()
					.gh(parametersHistory.getGh())
					.kh(parametersHistory.getKh())
					.ph(parametersHistory.getPh())
					.no2(parametersHistory.getNo2())
					.no3(parametersHistory.getNo3())
					.timestamp(parametersHistory.getTimestamp())
					.aquariumBE(aquariumBE)
					.build();
			return uiMapper.map(parametersHistoryRepositoryBA.save(parametersHistoryBE));
		}).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	@Transactional
	public <T> T update(Integer id, UiParametersHistory parametersHistory, Mapper<ParametersHistoryBE, T> uiMapper,
						Integer aquariumId) {
		return parametersHistoryRepositoryBA.findById(id)
				.filter(parametersHistoryBE -> parametersHistoryBE.getAquariumBE().getId() == aquariumId)
				.map(parametersHistoryBE -> {
					parametersHistoryBE.setKh(parametersHistory.getKh());
					parametersHistoryBE.setGh(parametersHistory.getGh());
					parametersHistoryBE.setPh(parametersHistory.getPh());
					parametersHistoryBE.setNo2(parametersHistory.getNo2());
					parametersHistoryBE.setNo3(parametersHistory.getNo3());
					parametersHistoryBE.setTimestamp(parametersHistory.getTimestamp());
					return parametersHistoryBE;
				})
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public void delete(Integer id, Integer aquariumId) {
		parametersHistoryRepositoryBA.findById(id)
				.filter(parametersHistoryBE -> parametersHistoryBE.getAquariumBE().getId() == aquariumId)
				.ifPresent(parametersHistoryBE -> parametersHistoryRepositoryBA.deleteById(id));
	}
}
