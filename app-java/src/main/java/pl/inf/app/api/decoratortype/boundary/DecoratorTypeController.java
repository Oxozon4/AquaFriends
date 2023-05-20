package pl.inf.app.api.decoratortype.boundary;

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
import pl.inf.app.api.decoratortype.control.DecoratorTypeToUiMapper;
import pl.inf.app.api.decoratortype.entity.UiDecoratorType;
import pl.inf.app.bm.decoratortype.boundary.DecoratorTypeBF;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Api(tags = {"Decorator type"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/decorator-type", produces = "application/hal+json")
public class DecoratorTypeController {
	private final DecoratorTypeBF decoratorTypeBF;
	private final DecoratorTypeToUiMapper decoratorTypeToUiMapper;

	@GetMapping
	public ResponseEntity<CollectionModel<UiDecoratorType>> findAll() {
		final List<UiDecoratorType> uiDecoratorTypeArrayList = decoratorTypeBF.getAll(decoratorTypeToUiMapper);
		return ResponseEntity.ok(CollectionModel.of(uiDecoratorTypeArrayList)
				.add(linkTo(methodOn(DecoratorTypeController.class).findAll()).withSelfRel()));
	}

	@PostMapping
	public ResponseEntity<EntityModel<UiDecoratorType>> add(@RequestBody final UiDecoratorType decoratorType) {
		final UiDecoratorType uiDecoratorType = decoratorTypeBF.save(decoratorType, decoratorTypeToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiDecoratorType).add(linkTo(methodOn(DecoratorTypeController.class).add(null)).withSelfRel()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<EntityModel<UiDecoratorType>> findById(@PathVariable Integer id) {
		final UiDecoratorType uiDecoratorType = decoratorTypeBF.getById(id, decoratorTypeToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiDecoratorType).add(linkTo(methodOn(DecoratorTypeController.class).findById(id)).withSelfRel()));
	}

	@PutMapping("/{id}")
	public ResponseEntity<EntityModel<UiDecoratorType>> update(@PathVariable Integer id,
															   @RequestBody final UiDecoratorType decoratorType) {
		final UiDecoratorType uiDecoratorType = decoratorTypeBF.update(id, decoratorType, decoratorTypeToUiMapper);
		return ResponseEntity.ok(EntityModel.of(uiDecoratorType)
				.add(linkTo(methodOn(DecoratorTypeController.class).update(id, null)).withSelfRel()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> remove(@PathVariable Integer id) {
		decoratorTypeBF.delete(id);
		return ResponseEntity.ok().build();
	}

}
