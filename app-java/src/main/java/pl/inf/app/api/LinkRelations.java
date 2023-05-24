package pl.inf.app.api;

import lombok.Getter;

@Getter
public enum LinkRelations {
	GET_AUTH_LINKS("Get auth endpoint links"),
	GET_USER_LINKS("Get user endpoint links"),
	GET_ADMIN_LINKS("Get admin endpoint links"),

	LOGIN("Login"),
	LOGOUT("Logout"),

	REGISTER_USER("Add new user");

	private final String description;

	LinkRelations(final String description) {
		this.description = description;
	}
}
