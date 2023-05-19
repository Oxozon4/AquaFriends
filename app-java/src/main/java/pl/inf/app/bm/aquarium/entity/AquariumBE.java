package pl.inf.app.bm.aquarium.entity;

import lombok.Getter;
import lombok.Setter;
import pl.inf.app.bm.user.entity.UserBE;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "aquarium", schema = "public")
public class AquariumBE {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private float length;
	private float width;
	private float height;
	private float no2;
	private float no3;
	private float gh;
	private float kh;
	private float ph;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserBE user;
}
