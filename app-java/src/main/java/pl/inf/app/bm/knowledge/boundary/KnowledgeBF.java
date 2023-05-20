package pl.inf.app.bm.knowledge.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.inf.app.api.knowledge.entity.UiKnowledge;
import pl.inf.app.bm.knowledge.control.KnowledgeRepositoryBA;
import pl.inf.app.bm.knowledge.entity.KnowledgeBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;
import pl.inf.app.utils.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KnowledgeBF {
	private final KnowledgeRepositoryBA knowledgeRepositoryBA;

	public <T> T getById(final int id, final Mapper<KnowledgeBE, T> uiMapper) {
		return knowledgeRepositoryBA.findById(id)
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public <T> List<T> getAll(final Mapper<KnowledgeBE, T> uiMapper) {
		return knowledgeRepositoryBA.findAll().stream().map(uiMapper::map).collect(Collectors.toList());
	}

	public <T> T save(UiKnowledge knowledge, final Mapper<KnowledgeBE, T> uiMapper) {
		final KnowledgeBE knowledgeBE =
				KnowledgeBE.builder().info(knowledge.getInfo()).problemType(knowledge.getProblemType()).build();
		return uiMapper.map(knowledgeRepositoryBA.save(knowledgeBE));
	}

	@Transactional
	public <T> T update(Integer id, UiKnowledge knowledge, Mapper<KnowledgeBE, T> uiMapper) {
		return knowledgeRepositoryBA.findById(id).map(knowledgeBE -> {
			knowledgeBE.setInfo(knowledge.getInfo());
			knowledgeBE.setProblemType(knowledge.getProblemType());
			return knowledgeBE;
		}).map(uiMapper::map).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public void delete(Integer id) {
		knowledgeRepositoryBA.deleteById(id);
	}
}
