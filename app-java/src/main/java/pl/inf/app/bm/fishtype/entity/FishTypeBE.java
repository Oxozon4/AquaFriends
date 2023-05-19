package pl.inf.app.bm.fishtype.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "fish_type", schema = "public")
public class FishTypeBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private float maxNo2;
	private float minNo2;
	private float maxNo3;
	private float minNo3;
	private float maxGh;
	private float minGh;
	private float maxKh;
	private float minKh;
	private float maxPh;
	private float minPh;
}
