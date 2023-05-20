package pl.inf.app.api.accessorytype.boundary;

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
import pl.inf.app.api.accessorytype.control.AccessoryTypeToUiMapper;
import pl.inf.app.api.accessorytype.entity.UiAccessoryType;
import pl.inf.app.bm.accessorytype.boundary.AccessoryTypeBF;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Api(tags = {"Accessory type"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/accessory-type", produces = "application/hal+json")
public class AccessoryTypeController {
	private final AccessoryTypeBF accessoryTypeBF;
	private final AccessoryTypeToUiMapper accessoryTypeToUiMapper;

	@GetMapping
	public ResponseEntity<CollectionModel<UiAccessoryType>> findAll() {
		final List<UiAccessoryType> uiAccessoryTypeArrayList = accessoryTypeBF.getAll(accessoryTypeToUiMapper);
		return ResponseEntity.ok(CollectionModel.of(uiAccessoryTypeArrayList)
				.add(linkTo(methodOn(AccessoryTypeController.class).findAll()).withSelfRel()));
	}

	@PostMapping
	public ResponseEntity<EntityModel<UiAccessoryType>> add(@RequestBody final UiAccessoryType accessoryType) {
		final UiAccessoryType uiAccessoryType = accessoryTypeBF.save(accessoryType, accessoryTypeToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiAccessoryType).add(linkTo(methodOn(AccessoryTypeController.class).add(null)).withSelfRel()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<EntityModel<UiAccessoryType>> findById(@PathVariable Integer id) {
		final UiAccessoryType uiAccessoryType = accessoryTypeBF.getById(id, accessoryTypeToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiAccessoryType).add(linkTo(methodOn(AccessoryTypeController.class).findById(id)).withSelfRel()));
	}

	@PutMapping("/{id}")
	public ResponseEntity<EntityModel<UiAccessoryType>> update(@PathVariable Integer id,
															   @RequestBody final UiAccessoryType accessoryType) {
		final UiAccessoryType uiAccessoryType = accessoryTypeBF.update(id, accessoryType, accessoryTypeToUiMapper);
		return ResponseEntity.ok(EntityModel.of(uiAccessoryType)
				.add(linkTo(methodOn(AccessoryTypeController.class).update(id, null)).withSelfRel()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> remove(@PathVariable Integer id) {
		accessoryTypeBF.delete(id);
		return ResponseEntity.ok().build();
	}

}
