package pl.inf.app.bm.aquarium.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.aquarium.entity.AquariumBE;

import java.util.List;

@Repository
public interface AquariumRepositoryBA extends JpaRepository<AquariumBE, Integer> {
	List<AquariumBE> findByUser_Id(int id);
}
