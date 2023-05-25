package pl.inf.app.api.fishtype.control;

import org.springframework.stereotype.Component;
import pl.inf.app.api.fishtype.entity.UiFishType;
import pl.inf.app.bm.fishtype.entity.FishTypeBE;
import pl.inf.app.utils.Mapper;

import java.util.stream.Collectors;

@Component
public class FishTypeToUiMapper implements Mapper<FishTypeBE, UiFishType> {
	@Override
	public UiFishType map(final FishTypeBE source) {
		final UiFishType uiFishType = new UiFishType();
		uiFishType.setId(source.getId());
		uiFishType.setName(source.getName());
		uiFishType.setMaxPh(source.getMaxPh());
		uiFishType.setMinPh(source.getMinPh());
		uiFishType.setMaxGh(source.getMinGh());
		uiFishType.setMinGh(source.getMinGh());
		uiFishType.setMaxKh(source.getMaxKh());
		uiFishType.setMinKh(source.getMinKh());
		uiFishType.setMaxNo2(source.getMaxNo2());
		uiFishType.setMinNo2(source.getMinNo2());
		uiFishType.setMaxNo3(source.getMaxNo3());
		uiFishType.setMinNo3(source.getMinNo3());
		uiFishType.setEnemies(source.getEnemies()
				.stream()
				.map(fishTypeBE -> UiFishType.builder().id(fishTypeBE.getId()).name(fishTypeBE.getName()).build())
				.collect(Collectors.toSet()));
		return uiFishType;
	}
}
