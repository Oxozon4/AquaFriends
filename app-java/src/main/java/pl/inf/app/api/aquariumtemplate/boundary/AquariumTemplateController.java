package pl.inf.app.api.aquariumtemplate.boundary;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.inf.app.api.aquariumtemplate.control.AquariumTemplateToUiMapper;
import pl.inf.app.api.aquariumtemplate.entity.UiAquariumTemplate;
import pl.inf.app.bm.aquariumtemplate.boundary.AquariumTemplateBF;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Api(tags = {"Aquarium template"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/aquarium-template", produces = "application/hal+json")
public class AquariumTemplateController {
	private final AquariumTemplateBF aquariumTemplateBF;
	private final AquariumTemplateToUiMapper aquariumTemplateToUiMapper;

	@GetMapping
	public ResponseEntity<CollectionModel<UiAquariumTemplate>> findAll() {
		final List<UiAquariumTemplate> uiAquariumTemplateArrayList = aquariumTemplateBF.getAll(aquariumTemplateToUiMapper);
		return ResponseEntity.ok(CollectionModel.of(uiAquariumTemplateArrayList)
				.add(linkTo(methodOn(AquariumTemplateController.class).findAll()).withSelfRel()));
	}

	@PostMapping
	public ResponseEntity<EntityModel<UiAquariumTemplate>> add(@RequestBody final UiAquariumTemplate aquariumTemplate) {
		final UiAquariumTemplate uiAquariumTemplate = aquariumTemplateBF.save(aquariumTemplate, aquariumTemplateToUiMapper);
		return ResponseEntity.ok(EntityModel.of(uiAquariumTemplate)
				.add(linkTo(methodOn(AquariumTemplateController.class).add(null)).withSelfRel()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<EntityModel<UiAquariumTemplate>> findById(@PathVariable Integer id) {
		final UiAquariumTemplate uiAquariumTemplate = aquariumTemplateBF.getById(id, aquariumTemplateToUiMapper);
		return ResponseEntity.ok(EntityModel.of(uiAquariumTemplate)
				.add(linkTo(methodOn(AquariumTemplateController.class).findById(id)).withSelfRel()));
	}

	@PutMapping("/{id}")
	public ResponseEntity<EntityModel<UiAquariumTemplate>> update(@PathVariable Integer id,
																  @RequestBody final UiAquariumTemplate aquariumTemplate) {
		final UiAquariumTemplate uiAquariumTemplate = aquariumTemplateBF.update(id, aquariumTemplate, aquariumTemplateToUiMapper);
		return ResponseEntity.ok(EntityModel.of(uiAquariumTemplate)
				.add(linkTo(methodOn(AquariumTemplateController.class).update(id, null)).withSelfRel()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> remove(@PathVariable Integer id) {
		aquariumTemplateBF.delete(id);
		return ResponseEntity.ok().build();
	}

}
