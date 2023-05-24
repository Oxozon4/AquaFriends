package pl.inf.app.api.fish.control;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.inf.app.api.fish.entity.UiFish;
import pl.inf.app.api.fishtype.control.FishTypeToUiMapper;
import pl.inf.app.bm.fish.entity.FishBE;
import pl.inf.app.utils.Mapper;

@Component
@RequiredArgsConstructor
public class FishToUiMapper implements Mapper<FishBE, UiFish> {
	private final FishTypeToUiMapper fishTypeToUiMapper;

	@Override
	public UiFish map(final FishBE source) {
		final UiFish uiFish = new UiFish();
		uiFish.setId(source.getId());
		uiFish.setBirthDay(source.getBirthDay());
		uiFish.setHealthStatus(source.getHealthStatus());
		uiFish.setFishType(fishTypeToUiMapper.map(source.getFishType()));
		return uiFish;
	}
}
