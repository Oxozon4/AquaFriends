package pl.inf.app.api.fishtyperelation.control;

import org.springframework.stereotype.Component;
import pl.inf.app.api.fishtype.entity.UiFishType;
import pl.inf.app.api.fishtyperelation.entity.UiFishTypeRelation;
import pl.inf.app.bm.fishtype.entity.FishTypeBE;
import pl.inf.app.bm.fishtyperelation.entity.FishTypeRelationBE;
import pl.inf.app.utils.Mapper;

@Component
public class FishTypeRelationToUiMapper implements Mapper<FishTypeRelationBE, UiFishTypeRelation> {

	private static UiFishType mapFish(FishTypeBE source) {
		final UiFishType uiFishType = new UiFishType();
		uiFishType.setId(source.getId());
		uiFishType.setName(source.getName());
		return uiFishType;
	}

	@Override
	public UiFishTypeRelation map(final FishTypeRelationBE source) {
		final UiFishTypeRelation uiFishTypeRelation = new UiFishTypeRelation();
		uiFishTypeRelation.setId(source.getId());
		uiFishTypeRelation.setRelation(source.getRelation());
		uiFishTypeRelation.setFish1(mapFish(source.getFish1()));
		uiFishTypeRelation.setFish2(mapFish(source.getFish2()));
		return uiFishTypeRelation;
	}
}
