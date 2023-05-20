package pl.inf.app.api.decoratortype.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.bm.decoratortype.entity.DecoratorTypeBE;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UiDecoratorType {
	private int id;
	private String name;
	private DecoratorTypeBE.Type type;
}
