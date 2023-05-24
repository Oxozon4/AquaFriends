package pl.inf.app.api.parametershistory.boundary;

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
import pl.inf.app.api.parametershistory.control.ParametersHistoryToUiMapper;
import pl.inf.app.api.parametershistory.entity.UiParametersHistory;
import pl.inf.app.bm.parametershistory.boundary.ParametersHistoryBF;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Api(tags = {"Parameters history"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/{aquariumId}/parameters-history", produces = "application/hal+json")
public class ParametersHistoryController {
	private final ParametersHistoryBF parametersHistoryBF;
	private final ParametersHistoryToUiMapper parametersHistoryToUiMapper;

	@GetMapping
	public ResponseEntity<CollectionModel<UiParametersHistory>> findAll(@PathVariable Integer aquariumId) {
		final List<UiParametersHistory> uiParametersHistoryArrayList =
				parametersHistoryBF.getAll(parametersHistoryToUiMapper, aquariumId);
		return ResponseEntity.ok(CollectionModel.of(uiParametersHistoryArrayList)
				.add(linkTo(methodOn(ParametersHistoryController.class).findAll(aquariumId)).withSelfRel()));
	}

	@PostMapping
	public ResponseEntity<EntityModel<UiParametersHistory>> add(@RequestBody final UiParametersHistory parametersHistory,
																@PathVariable Integer aquariumId) {
		final UiParametersHistory uiParametersHistory =
				parametersHistoryBF.save(parametersHistory, parametersHistoryToUiMapper, aquariumId);
		return ResponseEntity.ok(EntityModel.of(uiParametersHistory)
				.add(linkTo(methodOn(ParametersHistoryController.class).add(null, aquariumId)).withSelfRel()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<EntityModel<UiParametersHistory>> findById(@PathVariable Integer id, @PathVariable Integer aquariumId) {
		final UiParametersHistory uiParametersHistory = parametersHistoryBF.getById(id, parametersHistoryToUiMapper, aquariumId);
		return ResponseEntity.ok(EntityModel.of(uiParametersHistory)
				.add(linkTo(methodOn(ParametersHistoryController.class).findById(id, aquariumId)).withSelfRel()));
	}

	@PutMapping("/{id}")
	public ResponseEntity<EntityModel<UiParametersHistory>> update(@PathVariable Integer id,
																   @RequestBody final UiParametersHistory parametersHistory,
																   @PathVariable Integer aquariumId) {
		final UiParametersHistory uiParametersHistory =
				parametersHistoryBF.update(id, parametersHistory, parametersHistoryToUiMapper, aquariumId);
		return ResponseEntity.ok(EntityModel.of(uiParametersHistory)
				.add(linkTo(methodOn(ParametersHistoryController.class).update(id, null, aquariumId)).withSelfRel()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> remove(@PathVariable Integer id, @PathVariable Integer aquariumId) {
		parametersHistoryBF.delete(id, aquariumId);
		return ResponseEntity.ok().build();
	}
}
