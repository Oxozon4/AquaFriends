package pl.inf.app.api.fishtype.boundary;

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
import pl.inf.app.api.fishtype.control.FishTypeToUiMapper;
import pl.inf.app.api.fishtype.entity.UiFishType;
import pl.inf.app.bm.fishtype.boundary.FishTypeBF;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Api(tags = {"Fish type"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/fish-type", produces = "application/hal+json")
public class FishTypeController {
	private final FishTypeBF fishTypeBF;
	private final FishTypeToUiMapper fishTypeToUiMapper;

	@GetMapping
	public ResponseEntity<CollectionModel<UiFishType>> findAll() {
		final List<UiFishType> uiFishTypeArrayList = fishTypeBF.getAll(fishTypeToUiMapper);
		return ResponseEntity.ok(
				CollectionModel.of(uiFishTypeArrayList).add(linkTo(methodOn(FishTypeController.class).findAll()).withSelfRel()));
	}

	@PostMapping
	public ResponseEntity<EntityModel<UiFishType>> add(@RequestBody final UiFishType fishType) {
		final UiFishType uiFishType = fishTypeBF.save(fishType, fishTypeToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiFishType).add(linkTo(methodOn(FishTypeController.class).add(null)).withSelfRel()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<EntityModel<UiFishType>> findById(@PathVariable Integer id) {
		final UiFishType uiFishType = fishTypeBF.getById(id, fishTypeToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiFishType).add(linkTo(methodOn(FishTypeController.class).findById(id)).withSelfRel()));
	}

	@PutMapping("/{id}")
	public ResponseEntity<EntityModel<UiFishType>> update(@PathVariable Integer id, @RequestBody final UiFishType fishType) {
		final UiFishType uiFishType = fishTypeBF.update(id, fishType, fishTypeToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiFishType).add(linkTo(methodOn(FishTypeController.class).update(id, null)).withSelfRel()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> remove(@PathVariable Integer id) {
		fishTypeBF.delete(id);
		return ResponseEntity.ok().build();
	}

}
