package pl.inf.app.api.accessorytype.entity;

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
public class UiAccessoryType {
	private int id;
	private String name;
	private float volume;
}
