package pl.inf.app.bm.aquariumtemplate.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.aquariumtemplate.entity.AquariumTemplateBE;

@Repository
public interface AquariumTemplateRepositoryBA extends JpaRepository<AquariumTemplateBE, Integer> {}
