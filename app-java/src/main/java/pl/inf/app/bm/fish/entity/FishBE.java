package pl.inf.app.bm.fish.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.bm.aquarium.entity.AquariumBE;
import pl.inf.app.bm.fishtype.entity.FishTypeBE;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.sql.Timestamp;

@Getter
@Setter
@Builder
@Entity
@Table(name = "fish", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
public class FishBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private Timestamp birthDay;
	@Enumerated(EnumType.STRING)
	private HealthStatus healthStatus;
	@ManyToOne
	@JoinColumn(name = "aquarium_id")
	private AquariumBE aquariumBE;
	@ManyToOne
	@JoinColumn(name = "fish_type_id")
	private FishTypeBE fishType;

	public enum HealthStatus {
		HEALTHY,
		SICK,
		DEAD
	}
}
