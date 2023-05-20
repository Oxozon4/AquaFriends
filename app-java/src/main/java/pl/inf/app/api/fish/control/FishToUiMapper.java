package pl.inf.app.api.fish.control;

import org.springframework.stereotype.Component;
import pl.inf.app.api.fish.entity.UiFish;
import pl.inf.app.bm.fish.entity.FishBE;
import pl.inf.app.utils.Mapper;

@Component
public class FishToUiMapper implements Mapper<FishBE, UiFish> {
	@Override
	public UiFish map(final FishBE source) {
		final UiFish uiFish = new UiFish();
		uiFish.setId(source.getId());
		uiFish.setBirthDay(source.getBirthDay());
		uiFish.setHealthStatus(source.getHealthStatus());
		return uiFish;
	}
}
