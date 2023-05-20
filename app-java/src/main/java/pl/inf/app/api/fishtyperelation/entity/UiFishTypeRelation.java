package pl.inf.app.api.fishtyperelation.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.api.fishtype.entity.UiFishType;
import pl.inf.app.bm.fishtyperelation.entity.FishTypeRelationBE;

@Getter
@Setter
@NoArgsConstructor
public class UiFishTypeRelation {
	private int id;
	private FishTypeRelationBE.Relation relation;
	private UiFishType fish1;
	private UiFishType fish2;
}
