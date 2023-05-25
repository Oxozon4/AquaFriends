package pl.inf.app.bm.aquarium.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.aquarium.entity.AquariumBE;

@Repository
public interface AquariumRepositoryBA extends JpaRepository<AquariumBE, Integer> {}
