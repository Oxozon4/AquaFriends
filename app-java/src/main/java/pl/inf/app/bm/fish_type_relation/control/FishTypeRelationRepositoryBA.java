package pl.inf.app.bm.fish_type_relation.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.fish_type_relation.entity.FishTypeRelationBE;

@Repository
public interface FishTypeRelationRepositoryBA extends JpaRepository<FishTypeRelationBE, Integer> {}
