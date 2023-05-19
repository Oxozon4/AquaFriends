package pl.inf.app.bm.decoratiortype.entity;

import lombok.Getter;
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
@Entity
@Table(name = "decorator_type", schema = "public")
public class DecoratorTypeBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	@Enumerated(EnumType.STRING)
	private Type type;
	@ManyToMany(mappedBy = "decorators")
	private Set<AquariumBE> aquariums = new HashSet<>();

	enum Type {
		SUBSTRATE,
		PLANT,
		DECORATION
	}
}
