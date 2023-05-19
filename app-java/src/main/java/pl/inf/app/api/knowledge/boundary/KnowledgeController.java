package pl.inf.app.api.knowledge.boundary;

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
import pl.inf.app.api.knowledge.control.KnowledgeToUiMapper;
import pl.inf.app.api.knowledge.entity.UiKnowledge;
import pl.inf.app.bm.knowledge.boundary.KnowledgeBF;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Api(tags = {"Users"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/knowledge", produces = "application/hal+json")
public class KnowledgeController {
	private final KnowledgeBF knowledgeBF;
	private final KnowledgeToUiMapper knowledgeToUiMapper;

	@GetMapping
	public ResponseEntity<CollectionModel<UiKnowledge>> findAll() {
		final List<UiKnowledge> uiKnowledgeArrayList = knowledgeBF.getAll(knowledgeToUiMapper);
		return ResponseEntity.ok(CollectionModel.of(uiKnowledgeArrayList)
				.add(linkTo(methodOn(KnowledgeController.class).findAll()).withSelfRel()));
	}

	@PostMapping
	public ResponseEntity<EntityModel<UiKnowledge>> add(@RequestBody final UiKnowledge knowledge) {
		final UiKnowledge uiKnowledge = knowledgeBF.save(knowledge, knowledgeToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiKnowledge).add(linkTo(methodOn(KnowledgeController.class).add(null)).withSelfRel()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<EntityModel<UiKnowledge>> findById(@PathVariable Integer id) {
		final UiKnowledge uiKnowledge = knowledgeBF.getById(id, knowledgeToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiKnowledge).add(linkTo(methodOn(KnowledgeController.class).findById(id)).withSelfRel()));
	}

	@PutMapping("/{id}")
	public ResponseEntity<EntityModel<UiKnowledge>> update(@PathVariable Integer id, @RequestBody final UiKnowledge knowledge) {
		final UiKnowledge uiKnowledge = knowledgeBF.update(id, knowledge, knowledgeToUiMapper);
		return ResponseEntity.ok(
				EntityModel.of(uiKnowledge).add(linkTo(methodOn(KnowledgeController.class).update(id, null)).withSelfRel()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> remove(@PathVariable Integer id) {
		knowledgeBF.delete(id);
		return ResponseEntity.ok().build();
	}

}
