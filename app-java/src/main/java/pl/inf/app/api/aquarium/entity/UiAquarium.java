package pl.inf.app.api.aquarium.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UiAquarium {
	private int id;
	private String name;
	private float length;
	private float width;
	private float height;
	private float no2;
	private float no3;
	private float gh;
	private float kh;
	private float ph;
}
