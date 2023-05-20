package pl.inf.app.bm.decoratortype.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.bm.aquarium.entity.AquariumBE;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@Entity
@Table(name = "decorator_type", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
public class DecoratorTypeBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	@Enumerated(EnumType.STRING)
	private Type type;
	@ManyToMany(mappedBy = "decorators")
	private Set<AquariumBE> aquariums = new HashSet<>();

	public enum Type {
		SUBSTRATE,
		PLANT,
		DECORATION
	}
}
