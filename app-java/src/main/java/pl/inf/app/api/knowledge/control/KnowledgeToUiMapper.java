package pl.inf.app.api.knowledge.control;

import org.springframework.stereotype.Component;
import pl.inf.app.api.knowledge.entity.UiKnowledge;
import pl.inf.app.bm.knowledge.entity.KnowledgeBE;
import pl.inf.app.utils.Mapper;

@Component
public class KnowledgeToUiMapper implements Mapper<KnowledgeBE, UiKnowledge> {
	@Override
	public UiKnowledge map(final KnowledgeBE source) {
		final UiKnowledge uiKnowledge = new UiKnowledge();
		uiKnowledge.setId(source.getId());
		uiKnowledge.setProblemType(source.getProblemType());
		uiKnowledge.setInfo(source.getInfo());
		return uiKnowledge;
	}
}
