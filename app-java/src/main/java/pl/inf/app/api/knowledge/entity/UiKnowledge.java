package pl.inf.app.api.knowledge.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.inf.app.bm.knowledge.entity.KnowledgeBE;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@NoArgsConstructor
public class UiKnowledge {
	private int id;
	private KnowledgeBE.ProblemType problemType;
	private String info;
}
