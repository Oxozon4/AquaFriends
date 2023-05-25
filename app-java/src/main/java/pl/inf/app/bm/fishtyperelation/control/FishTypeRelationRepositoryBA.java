package pl.inf.app.bm.fishtyperelation.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.fishtyperelation.entity.FishTypeRelationBE;

@Repository
public interface FishTypeRelationRepositoryBA extends JpaRepository<FishTypeRelationBE, Integer> {}
