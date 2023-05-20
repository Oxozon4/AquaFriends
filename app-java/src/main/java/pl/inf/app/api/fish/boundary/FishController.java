package pl.inf.app.api.fish.boundary;

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
import pl.inf.app.api.fish.control.FishToUiMapper;
import pl.inf.app.api.fish.entity.UiFish;
import pl.inf.app.bm.fish.boundary.FishBF;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Api(tags = {"Fish"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/fish", produces = "application/hal+json")
public class FishController {
	private final FishBF fishBF;
	private final FishToUiMapper fishToUiMapper;

	@GetMapping
	public ResponseEntity<CollectionModel<UiFish>> findAll() {
		final List<UiFish> uiFishArrayList = fishBF.getAll(fishToUiMapper);
		return ResponseEntity.ok(
				CollectionModel.of(uiFishArrayList).add(linkTo(methodOn(FishController.class).findAll()).withSelfRel()));
	}

	@PostMapping
	public ResponseEntity<EntityModel<UiFish>> add(@RequestBody final UiFish fish) {
		final UiFish uiFish = fishBF.save(fish, fishToUiMapper);
		return ResponseEntity.ok(EntityModel.of(uiFish).add(linkTo(methodOn(FishController.class).add(null)).withSelfRel()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<EntityModel<UiFish>> findById(@PathVariable Integer id) {
		final UiFish uiFish = fishBF.getById(id, fishToUiMapper);
		return ResponseEntity.ok(EntityModel.of(uiFish).add(linkTo(methodOn(FishController.class).findById(id)).withSelfRel()));
	}

	@PutMapping("/{id}")
	public ResponseEntity<EntityModel<UiFish>> update(@PathVariable Integer id, @RequestBody final UiFish fish) {
		final UiFish uiFish = fishBF.update(id, fish, fishToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiFish).add(linkTo(methodOn(FishController.class).update(id, null)).withSelfRel()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> remove(@PathVariable Integer id) {
		fishBF.delete(id);
		return ResponseEntity.ok().build();
	}

}
