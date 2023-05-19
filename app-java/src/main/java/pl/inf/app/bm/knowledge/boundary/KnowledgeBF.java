package pl.inf.app.bm.knowledge.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.inf.app.bm.knowledge.control.KnowledgeRepositoryBA;
import pl.inf.app.bm.knowledge.entity.KnowledgeBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;

@Service
@RequiredArgsConstructor
public class KnowledgeBF {
	private final KnowledgeRepositoryBA knowledgeRepositoryBA;

	public KnowledgeBE getById(final int id) {
		return knowledgeRepositoryBA.findById(id).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}
}
