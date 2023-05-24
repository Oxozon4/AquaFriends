package pl.inf.app.api.aquariumtemplate.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.api.accessorytype.entity.UiAccessoryType;
import pl.inf.app.bm.accessorytype.entity.AccessoryTypeBE;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UiAquariumTemplate {
	private int id;
	private String name;
	private float length;
	private float width;
	private float height;
	private Set<UiAccessoryType> accessories = new HashSet<>();
}
