package pl.inf.app.bm.aquariumtemplate.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.bm.accessorytype.entity.AccessoryTypeBE;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@Entity
@Table(name = "aquarium_template", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
public class AquariumTemplateBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private float length;
	private float width;
	private float height;
	@ManyToMany
	@JoinTable(name = "aquarium_template_accessory", joinColumns = @JoinColumn(name = "aquarium_template_id"),
			   inverseJoinColumns = @JoinColumn(name = "accessory_id"))
	private Set<AccessoryTypeBE> accessories = new HashSet<>();
}
