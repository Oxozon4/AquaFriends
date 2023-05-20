package pl.inf.app.api.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UiUser {
	private int id;
	private String email;
	private String password;
	private String first_name;
	private String last_name;
	private int age;
}
