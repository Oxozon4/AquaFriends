package pl.inf.app.bm.fishtype.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@Entity
@Table(name = "fish_type", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
public class FishTypeBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private float maxNo2;
	private float minNo2;
	private float maxNo3;
	private float minNo3;
	private float maxGh;
	private float minGh;
	private float maxKh;
	private float minKh;
	private float maxPh;
	private float minPh;
	@OneToMany
	@JoinTable(name = "fish_hostile", joinColumns = @JoinColumn(name = "fish_type_id"),
			   inverseJoinColumns = @JoinColumn(name = "hostile_fish_id"))
	private Set<FishTypeBE> enemies = new HashSet<>();
}
