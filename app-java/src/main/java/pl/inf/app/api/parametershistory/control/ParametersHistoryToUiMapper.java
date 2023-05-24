package pl.inf.app.api.parametershistory.control;

import org.springframework.stereotype.Component;
import pl.inf.app.api.parametershistory.entity.UiParametersHistory;
import pl.inf.app.bm.parametershistory.entity.ParametersHistoryBE;
import pl.inf.app.utils.Mapper;

@Component
public class ParametersHistoryToUiMapper implements Mapper<ParametersHistoryBE, UiParametersHistory> {
	@Override
	public UiParametersHistory map(final ParametersHistoryBE source) {
		final UiParametersHistory uiParametersHistory = new UiParametersHistory();
		uiParametersHistory.setId(source.getId());
		uiParametersHistory.setKh(source.getKh());
		uiParametersHistory.setGh(source.getGh());
		uiParametersHistory.setPh(source.getPh());
		uiParametersHistory.setNo2(source.getNo2());
		uiParametersHistory.setNo3(source.getNo3());
		uiParametersHistory.setTimestamp(source.getTimestamp());
		return uiParametersHistory;
	}
}
