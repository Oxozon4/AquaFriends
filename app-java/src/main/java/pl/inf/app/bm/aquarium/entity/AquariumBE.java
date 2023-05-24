package pl.inf.app.bm.aquarium.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.bm.accessorytype.entity.AccessoryTypeBE;
import pl.inf.app.bm.decoratortype.entity.DecoratorTypeBE;
import pl.inf.app.bm.user.entity.UserBE;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@Entity
@Table(name = "aquarium", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
public class AquariumBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private float length;
	private float width;
	private float height;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserBE user;
	@ManyToMany
	@JoinTable(name = "aquarium_decorator", joinColumns = @JoinColumn(name = "aquarium_id"),
			   inverseJoinColumns = @JoinColumn(name = "decorator_id"))
	private Set<DecoratorTypeBE> decorators = new HashSet<>();
	@ManyToMany
	@JoinTable(name = "aquarium_accessory", joinColumns = @JoinColumn(name = "aquarium_id"),
			   inverseJoinColumns = @JoinColumn(name = "accessory_id"))
	private Set<AccessoryTypeBE> accessories = new HashSet<>();

}
