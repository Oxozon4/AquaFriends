package pl.inf.app.bm.knowledge.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Builder
@Entity
@Table(name = "knowledge", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
public class KnowledgeBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Enumerated(EnumType.STRING)
	private ProblemType problemType;
	private String info;
	private float min;
	private float max;

	public enum ProblemType {
		WATER,
		NO2,
		NO3,
		PH,
		GH,
		KH
	}
}
