package pl.inf.app.api;

import io.swagger.annotations.Api;
import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.inf.app.api.user.boundary.UserController;

import java.util.Arrays;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static pl.inf.app.api.LinkRelations.GET_MAIN_LINKS;
import static pl.inf.app.api.LinkRelations.LOGIN;
import static pl.inf.app.api.LinkRelations.LOGOUT;
import static pl.inf.app.api.LinkRelations.REGISTER_USER;

@Api(tags = {"Main Panel"})
@RestController
@RequestMapping(value = "/api", produces = "application/hal+json")
public class LinksController {
	@GetMapping
	public ResponseEntity<List<Link>> getLinks() {
		// @formatter:off
        return ResponseEntity.ok(
                Arrays.asList(
                        linkTo(methodOn(UserController.class).registerUser(null)).withRel(REGISTER_USER.toString()),
                        linkTo(LinksController.class).slash("perform_login").withRel(LOGIN.toString()),
                        linkTo(LinksController.class).slash("perform_logout").withRel(LOGOUT.toString()),
                        linkTo(methodOn(LinksController.class).getLinks()).withRel(GET_MAIN_LINKS.toString())));
        // @formatter:on
	}
}
