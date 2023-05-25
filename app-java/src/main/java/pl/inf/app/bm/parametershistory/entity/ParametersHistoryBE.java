package pl.inf.app.bm.parametershistory.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.bm.aquarium.entity.AquariumBE;

import javax.persistence.Entity;
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
@Table(name = "parameters_history", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
public class ParametersHistoryBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private Timestamp timestamp;
	private float no2;
	private float no3;
	private float gh;
	private float kh;
	private float ph;
	@ManyToOne
	@JoinColumn(name = "aquarium_id")
	private AquariumBE aquariumBE;
}
