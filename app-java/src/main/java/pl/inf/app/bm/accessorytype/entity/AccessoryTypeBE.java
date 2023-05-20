package pl.inf.app.bm.accessorytype.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.bm.aquarium.entity.AquariumBE;
import pl.inf.app.bm.aquariumtemplate.entity.AquariumTemplateBE;

import javax.persistence.Entity;
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
@Table(name = "accessory_type", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
public class AccessoryTypeBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	@ManyToMany(mappedBy = "accessories")
	private Set<AquariumBE> aquariums = new HashSet<>();
	@ManyToMany(mappedBy = "accessories")
	private Set<AquariumTemplateBE> aquariumTemplates;
}
