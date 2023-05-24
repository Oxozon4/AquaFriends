package pl.inf.app.api.fish.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.api.aquarium.entity.UiAquarium;
import pl.inf.app.api.fishtype.entity.UiFishType;
import pl.inf.app.bm.fish.entity.FishBE;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UiFish {
	private int id;
	private Timestamp birthDay;
	private FishBE.HealthStatus healthStatus;
	private UiFishType fishType;
	private UiAquarium aquarium;
}
