package pl.inf.app.api.user.boundary;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.inf.app.api.user.control.UserToUiMapper;
import pl.inf.app.api.user.entity.UiUser;
import pl.inf.app.bm.user.boundary.UserBF;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Api(tags = {"Users"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/user", produces = "application/hal+json")
public class UserController {
	private final UserBF userBF;
	private final UserToUiMapper userToUiMapper;

	@PostMapping
	public ResponseEntity<EntityModel<UiUser>> registerUser(@RequestBody final UiUser uiUser) {
		final UiUser user = userBF.create(uiUser, userToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(user).add(linkTo(methodOn(UserController.class).registerUser(null)).withSelfRel()));
	}

}
