package pl.inf.app.api.aquarium.boundary;

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
import pl.inf.app.api.aquarium.control.AquariumToUiMapper;
import pl.inf.app.api.aquarium.entity.UiAquarium;
import pl.inf.app.bm.aquarium.boundary.AquariumBF;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Api(tags = {"Aquarium"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/aquarium", produces = "application/hal+json")
public class AquariumController {
	private final AquariumBF aquariumBF;
	private final AquariumToUiMapper aquariumToUiMapper;

	@GetMapping
	public ResponseEntity<CollectionModel<UiAquarium>> findAll() {
		final List<UiAquarium> uiAquariumArrayList = aquariumBF.getAll(aquariumToUiMapper);
		return ResponseEntity.ok(
				CollectionModel.of(uiAquariumArrayList).add(linkTo(methodOn(AquariumController.class).findAll()).withSelfRel()));
	}

	@PostMapping
	public ResponseEntity<EntityModel<UiAquarium>> add(@RequestBody final UiAquarium aquarium) {
		final UiAquarium uiAquarium = aquariumBF.save(aquarium, aquariumToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiAquarium).add(linkTo(methodOn(AquariumController.class).add(null)).withSelfRel()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<EntityModel<UiAquarium>> findById(@PathVariable Integer id) {
		final UiAquarium uiAquarium = aquariumBF.getById(id, aquariumToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiAquarium).add(linkTo(methodOn(AquariumController.class).findById(id)).withSelfRel()));
	}

	@PutMapping("/{id}")
	public ResponseEntity<EntityModel<UiAquarium>> update(@PathVariable Integer id, @RequestBody final UiAquarium aquarium) {
		final UiAquarium uiAquarium = aquariumBF.update(id, aquarium, aquariumToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiAquarium).add(linkTo(methodOn(AquariumController.class).update(id, null)).withSelfRel()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> remove(@PathVariable Integer id) {
		aquariumBF.delete(id);
		return ResponseEntity.ok().build();
	}

}
