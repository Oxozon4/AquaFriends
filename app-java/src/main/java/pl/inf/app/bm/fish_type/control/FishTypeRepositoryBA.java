package pl.inf.app.bm.fish_type.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.fish_type.entity.FishTypeBE;

@Repository
public interface FishTypeRepositoryBA extends JpaRepository<FishTypeBE, Integer> {}
