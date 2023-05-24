package pl.inf.app.api.aquarium.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.api.accessorytype.entity.UiAccessoryType;
import pl.inf.app.api.decoratortype.entity.UiDecoratorType;
import pl.inf.app.api.fish.entity.UiFish;
import pl.inf.app.bm.accessorytype.entity.AccessoryTypeBE;
import pl.inf.app.bm.decoratortype.entity.DecoratorTypeBE;

import java.util.HashSet;
import java.util.Set;

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
	private Set<UiDecoratorType> decorators = new HashSet<>();
	private Set<UiAccessoryType> accessories = new HashSet<>();
	private Set<UiFish> fishes = new HashSet<>();
}
