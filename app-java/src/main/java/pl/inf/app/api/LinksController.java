package pl.inf.app.api;

import io.swagger.annotations.Api;
import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.inf.app.api.accessorytype.boundary.AccessoryTypeController;
import pl.inf.app.api.aquarium.boundary.AquariumController;
import pl.inf.app.api.aquariumtemplate.boundary.AquariumTemplateController;
import pl.inf.app.api.decoratortype.boundary.DecoratorTypeController;
import pl.inf.app.api.fish.boundary.FishController;
import pl.inf.app.api.fishtype.boundary.FishTypeController;
import pl.inf.app.api.knowledge.boundary.KnowledgeController;
import pl.inf.app.api.parametershistory.boundary.ParametersHistoryController;
import pl.inf.app.api.user.boundary.UserController;

import java.util.Arrays;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static pl.inf.app.api.LinkRelations.DELETE_ACCESSORY_TYPE;
import static pl.inf.app.api.LinkRelations.DELETE_AQUARIUM;
import static pl.inf.app.api.LinkRelations.DELETE_AQUARIUM_TEMPLATE;
import static pl.inf.app.api.LinkRelations.DELETE_DECORATOR_TYPE;
import static pl.inf.app.api.LinkRelations.DELETE_FISH;
import static pl.inf.app.api.LinkRelations.DELETE_FISH_TYPE;
import static pl.inf.app.api.LinkRelations.DELETE_KNOWLEDGE;
import static pl.inf.app.api.LinkRelations.DELETE_PARAMETERS_HISTORY;
import static pl.inf.app.api.LinkRelations.GET_ACCESSORY_TYPE;
import static pl.inf.app.api.LinkRelations.GET_ADMIN_LINKS;
import static pl.inf.app.api.LinkRelations.GET_ALL_ACCESSORY_TYPE;
import static pl.inf.app.api.LinkRelations.GET_ALL_AQUARIUM;
import static pl.inf.app.api.LinkRelations.GET_ALL_AQUARIUM_TEMPLATE;
import static pl.inf.app.api.LinkRelations.GET_ALL_DECORATOR_TYPE;
import static pl.inf.app.api.LinkRelations.GET_ALL_FISH;
import static pl.inf.app.api.LinkRelations.GET_ALL_FISH_TYPE;
import static pl.inf.app.api.LinkRelations.GET_ALL_KNOWLEDGE;
import static pl.inf.app.api.LinkRelations.GET_ALL_PARAMETERS_HISTORY;
import static pl.inf.app.api.LinkRelations.GET_AQUARIUM;
import static pl.inf.app.api.LinkRelations.GET_AQUARIUM_TEMPLATE;
import static pl.inf.app.api.LinkRelations.GET_AUTH_LINKS;
import static pl.inf.app.api.LinkRelations.GET_DECORATOR_TYPE;
import static pl.inf.app.api.LinkRelations.GET_FISH;
import static pl.inf.app.api.LinkRelations.GET_FISH_TYPE;
import static pl.inf.app.api.LinkRelations.GET_KNOWLEDGE;
import static pl.inf.app.api.LinkRelations.GET_PARAMETERS_HISTORY;
import static pl.inf.app.api.LinkRelations.GET_USER;
import static pl.inf.app.api.LinkRelations.GET_USER_AQUARIUM;
import static pl.inf.app.api.LinkRelations.GET_USER_LINKS;
import static pl.inf.app.api.LinkRelations.LOGIN;
import static pl.inf.app.api.LinkRelations.LOGOUT;
import static pl.inf.app.api.LinkRelations.REGISTER_USER;
import static pl.inf.app.api.LinkRelations.SAVE_ACCESSORY_TYPE;
import static pl.inf.app.api.LinkRelations.SAVE_AQUARIUM;
import static pl.inf.app.api.LinkRelations.SAVE_AQUARIUM_TEMPLATE;
import static pl.inf.app.api.LinkRelations.SAVE_DECORATOR_TYPE;
import static pl.inf.app.api.LinkRelations.SAVE_FISH;
import static pl.inf.app.api.LinkRelations.SAVE_FISH_TYPE;
import static pl.inf.app.api.LinkRelations.SAVE_KNOWLEDGE;
import static pl.inf.app.api.LinkRelations.SAVE_PARAMETERS_HISTORY;
import static pl.inf.app.api.LinkRelations.UPDATE_ACCESSORY_TYPE;
import static pl.inf.app.api.LinkRelations.UPDATE_AQUARIUM;
import static pl.inf.app.api.LinkRelations.UPDATE_AQUARIUM_TEMPLATE;
import static pl.inf.app.api.LinkRelations.UPDATE_DECORATOR_TYPE;
import static pl.inf.app.api.LinkRelations.UPDATE_FISH;
import static pl.inf.app.api.LinkRelations.UPDATE_FISH_TYPE;
import static pl.inf.app.api.LinkRelations.UPDATE_KNOWLEDGE;
import static pl.inf.app.api.LinkRelations.UPDATE_PARAMETERS_HISTORY;

@Api(tags = {"Main Panel"})
@RestController
@RequestMapping(value = "/api", produces = "application/hal+json")
public class LinksController {

	@GetMapping("/auth-links")
	public ResponseEntity<List<Link>> getAuthLinks() {
		return ResponseEntity.ok(
				Arrays.asList(linkTo(methodOn(UserController.class).registerUser(null)).withRel(REGISTER_USER.toString()),
						linkTo(LinksController.class).slash("perform_login").withRel(LOGIN.toString()),
						linkTo(LinksController.class).slash("perform_logout").withRel(LOGOUT.toString()),
						linkTo(methodOn(LinksController.class).getAuthLinks()).withRel(GET_AUTH_LINKS.toString()),
						linkTo(methodOn(LinksController.class).getUserLinks()).withRel(GET_USER_LINKS.toString()),
						linkTo(methodOn(LinksController.class).getAdminLinks()).withRel(GET_ADMIN_LINKS.toString())));
	}

	@GetMapping("/user-links")
	public ResponseEntity<List<Link>> getUserLinks() {
		return ResponseEntity.ok(Arrays.asList(linkTo(LinksController.class).slash("perform_logout").withRel(LOGOUT.toString()),
				linkTo(methodOn(AccessoryTypeController.class).findAll()).withRel(GET_ALL_ACCESSORY_TYPE.toString()),
				linkTo(methodOn(AccessoryTypeController.class).findById(null)).withRel(GET_ACCESSORY_TYPE.toString()),
				linkTo(methodOn(AquariumController.class).findAll()).withRel(GET_ALL_AQUARIUM.toString()),
				linkTo(methodOn(AquariumController.class).findById(null)).withRel(GET_AQUARIUM.toString()),
				linkTo(methodOn(AquariumController.class).findByUserId()).withRel(GET_USER_AQUARIUM.toString()),
				linkTo(methodOn(AquariumController.class).add(null)).withRel(SAVE_AQUARIUM.toString()),
				linkTo(methodOn(AquariumController.class).update(null, null)).withRel(UPDATE_AQUARIUM.toString()),
				linkTo(methodOn(AquariumController.class).remove(null)).withRel(DELETE_AQUARIUM.toString()),
				linkTo(methodOn(AquariumTemplateController.class).findAll()).withRel(GET_ALL_AQUARIUM_TEMPLATE.toString()),
				linkTo(methodOn(AquariumTemplateController.class).findById(null)).withRel(GET_AQUARIUM_TEMPLATE.toString()),
				linkTo(methodOn(DecoratorTypeController.class).findAll()).withRel(GET_ALL_DECORATOR_TYPE.toString()),
				linkTo(methodOn(DecoratorTypeController.class).findById(null)).withRel(GET_DECORATOR_TYPE.toString()),
				linkTo(methodOn(FishController.class).findAll()).withRel(GET_ALL_FISH.toString()),
				linkTo(methodOn(FishController.class).findById(null)).withRel(GET_FISH.toString()),
				linkTo(methodOn(FishController.class).add(null)).withRel(SAVE_FISH.toString()),
				linkTo(methodOn(FishController.class).update(null, null)).withRel(UPDATE_FISH.toString()),
				linkTo(methodOn(FishController.class).remove(null)).withRel(DELETE_FISH.toString()),
				linkTo(methodOn(FishTypeController.class).findAll()).withRel(GET_ALL_FISH_TYPE.toString()),
				linkTo(methodOn(FishTypeController.class).findById(null)).withRel(GET_FISH_TYPE.toString()),
				linkTo(methodOn(KnowledgeController.class).findAll()).withRel(GET_ALL_KNOWLEDGE.toString()),
				linkTo(methodOn(KnowledgeController.class).findById(null)).withRel(GET_KNOWLEDGE.toString()),
				linkTo(methodOn(ParametersHistoryController.class).findAll(null)).withRel(GET_ALL_PARAMETERS_HISTORY.toString()),
				linkTo(methodOn(ParametersHistoryController.class).findById(null, null)).withRel(
						GET_PARAMETERS_HISTORY.toString()),
				linkTo(methodOn(ParametersHistoryController.class).add(null, null)).withRel(SAVE_PARAMETERS_HISTORY.toString()),
				linkTo(methodOn(ParametersHistoryController.class).update(null, null, null)).withRel(
						UPDATE_PARAMETERS_HISTORY.toString()),
				linkTo(methodOn(ParametersHistoryController.class).remove(null, null)).withRel(
						DELETE_PARAMETERS_HISTORY.toString()),
				linkTo(methodOn(UserController.class).findUser(null)).withRel(GET_USER.toString()),
				linkTo(methodOn(LinksController.class).getUserLinks()).withRel(GET_USER_LINKS.toString())));
	}

	@GetMapping("/admin-links")
	public ResponseEntity<List<Link>> getAdminLinks() {
		return ResponseEntity.ok(Arrays.asList(linkTo(LinksController.class).slash("perform_logout").withRel(LOGOUT.toString()),
				linkTo(methodOn(AccessoryTypeController.class).findAll()).withRel(GET_ALL_ACCESSORY_TYPE.toString()),
				linkTo(methodOn(AccessoryTypeController.class).findById(null)).withRel(GET_ACCESSORY_TYPE.toString()),
				linkTo(methodOn(AccessoryTypeController.class).add(null)).withRel(SAVE_ACCESSORY_TYPE.toString()),
				linkTo(methodOn(AccessoryTypeController.class).update(null, null)).withRel(UPDATE_ACCESSORY_TYPE.toString()),
				linkTo(methodOn(AccessoryTypeController.class).remove(null)).withRel(DELETE_ACCESSORY_TYPE.toString()),
				linkTo(methodOn(AquariumTemplateController.class).findAll()).withRel(GET_ALL_AQUARIUM_TEMPLATE.toString()),
				linkTo(methodOn(AquariumTemplateController.class).findById(null)).withRel(GET_AQUARIUM_TEMPLATE.toString()),
				linkTo(methodOn(AquariumTemplateController.class).add(null)).withRel(SAVE_AQUARIUM_TEMPLATE.toString()),
				linkTo(methodOn(AquariumTemplateController.class).update(null, null)).withRel(
						UPDATE_AQUARIUM_TEMPLATE.toString()),
				linkTo(methodOn(AquariumTemplateController.class).remove(null)).withRel(DELETE_AQUARIUM_TEMPLATE.toString()),
				linkTo(methodOn(DecoratorTypeController.class).findAll()).withRel(GET_ALL_DECORATOR_TYPE.toString()),
				linkTo(methodOn(DecoratorTypeController.class).findById(null)).withRel(GET_DECORATOR_TYPE.toString()),
				linkTo(methodOn(DecoratorTypeController.class).add(null)).withRel(SAVE_DECORATOR_TYPE.toString()),
				linkTo(methodOn(DecoratorTypeController.class).update(null, null)).withRel(UPDATE_DECORATOR_TYPE.toString()),
				linkTo(methodOn(DecoratorTypeController.class).remove(null)).withRel(DELETE_DECORATOR_TYPE.toString()),
				linkTo(methodOn(FishTypeController.class).findAll()).withRel(GET_ALL_FISH_TYPE.toString()),
				linkTo(methodOn(FishTypeController.class).findById(null)).withRel(GET_FISH_TYPE.toString()),
				linkTo(methodOn(FishTypeController.class).add(null)).withRel(SAVE_FISH_TYPE.toString()),
				linkTo(methodOn(FishTypeController.class).update(null, null)).withRel(UPDATE_FISH_TYPE.toString()),
				linkTo(methodOn(FishTypeController.class).remove(null)).withRel(DELETE_FISH_TYPE.toString()),
				linkTo(methodOn(KnowledgeController.class).findAll()).withRel(GET_ALL_KNOWLEDGE.toString()),
				linkTo(methodOn(KnowledgeController.class).findById(null)).withRel(GET_KNOWLEDGE.toString()),
				linkTo(methodOn(KnowledgeController.class).add(null)).withRel(SAVE_KNOWLEDGE.toString()),
				linkTo(methodOn(KnowledgeController.class).update(null, null)).withRel(UPDATE_KNOWLEDGE.toString()),
				linkTo(methodOn(KnowledgeController.class).remove(null)).withRel(DELETE_KNOWLEDGE.toString()),
				linkTo(methodOn(LinksController.class).getAdminLinks()).withRel(GET_ADMIN_LINKS.toString())));
	}
}
