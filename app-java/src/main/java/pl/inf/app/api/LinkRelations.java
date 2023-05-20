package pl.inf.app.api;

import lombok.Getter;

@Getter
public enum LinkRelations {
	GET_MAIN_LINKS("Get main endpoint links"),

	LOGIN("Login"),
	LOGOUT("Logout"),

	REGISTER_USER("Add new user");

	private final String description;

	LinkRelations(final String description) {
		this.description = description;
	}
}
