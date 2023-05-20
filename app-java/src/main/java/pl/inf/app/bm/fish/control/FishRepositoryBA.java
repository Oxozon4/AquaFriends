package pl.inf.app.bm.fish.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.fish.entity.FishBE;

@Repository
public interface FishRepositoryBA extends JpaRepository<FishBE, Integer> {}
