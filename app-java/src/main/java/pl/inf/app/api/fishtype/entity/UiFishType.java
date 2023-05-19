package pl.inf.app.api.fishtype.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UiFishType {
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
