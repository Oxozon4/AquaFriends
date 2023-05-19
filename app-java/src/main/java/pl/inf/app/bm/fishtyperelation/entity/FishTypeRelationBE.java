package pl.inf.app.bm.fishtyperelation.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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

@Getter
@Setter
@Builder
@Entity
@Table(name = "fish_type_relation", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
public class FishTypeRelationBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Enumerated(EnumType.STRING)
	private Relation relation;
	@ManyToOne
	@JoinColumn(name = "fish1_id")
	private FishTypeBE fish1;
	@ManyToOne
	@JoinColumn(name = "fish2_id")
	private FishTypeBE fish2;

	public enum Relation {
		FRIEND,
		ENEMY
	}
}
