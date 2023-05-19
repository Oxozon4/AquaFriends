package pl.inf.app.api.fishtyperelation.boundary;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.inf.app.api.fishtyperelation.control.FishTypeRelationToUiMapper;
import pl.inf.app.api.fishtyperelation.entity.UiFishTypeRelation;
import pl.inf.app.bm.fishtyperelation.boundary.FishTypeRelationBF;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Api(tags = {"Fish type relation"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/fish-type-relation", produces = "application/hal+json")
public class FishTypeRelationController {
	private final FishTypeRelationBF fishTypeRelationBF;
	private final FishTypeRelationToUiMapper fishTypeRelationToUiMapper;

	@GetMapping
	public ResponseEntity<CollectionModel<UiFishTypeRelation>> findAll() {
		final List<UiFishTypeRelation> uiFishTypeRelationArrayList = fishTypeRelationBF.getAll(fishTypeRelationToUiMapper);
		return ResponseEntity.ok(CollectionModel.of(uiFishTypeRelationArrayList)
				.add(linkTo(methodOn(FishTypeRelationController.class).findAll()).withSelfRel()));
	}

	@PostMapping
	public ResponseEntity<EntityModel<UiFishTypeRelation>> add(@RequestBody final UiFishTypeRelation fishTypeRelation) {
		final UiFishTypeRelation uiFishTypeRelation = fishTypeRelationBF.save(fishTypeRelation, fishTypeRelationToUiMapper);
		return ResponseEntity.ok(EntityModel.of(uiFishTypeRelation)
				.add(linkTo(methodOn(FishTypeRelationController.class).add(null)).withSelfRel()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<EntityModel<UiFishTypeRelation>> findById(@PathVariable Integer id) {
		final UiFishTypeRelation uiFishTypeRelation = fishTypeRelationBF.getById(id, fishTypeRelationToUiMapper);
		return ResponseEntity.ok(EntityModel.of(uiFishTypeRelation)
				.add(linkTo(methodOn(FishTypeRelationController.class).findById(id)).withSelfRel()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> remove(@PathVariable Integer id) {
		fishTypeRelationBF.delete(id);
		return ResponseEntity.ok().build();
	}
}
