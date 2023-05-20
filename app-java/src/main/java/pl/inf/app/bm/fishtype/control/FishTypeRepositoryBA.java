package pl.inf.app.bm.fishtype.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.fishtype.entity.FishTypeBE;

@Repository
public interface FishTypeRepositoryBA extends JpaRepository<FishTypeBE, Integer> {}
