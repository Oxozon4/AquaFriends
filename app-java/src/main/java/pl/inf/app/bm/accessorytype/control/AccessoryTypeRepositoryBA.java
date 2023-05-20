package pl.inf.app.bm.accessorytype.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.accessorytype.entity.AccessoryTypeBE;

@Repository
public interface AccessoryTypeRepositoryBA extends JpaRepository<AccessoryTypeBE, Integer> {}
