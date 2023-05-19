package pl.inf.app.bm.knowledge.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.knowledge.entity.KnowledgeBE;

@Repository
public interface KnowledgeRepositoryBA extends JpaRepository<KnowledgeBE, Integer> {}
