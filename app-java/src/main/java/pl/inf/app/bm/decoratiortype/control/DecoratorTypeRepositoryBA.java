package pl.inf.app.bm.decoratiortype.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.decoratiortype.entity.DecoratorTypeBE;

@Repository
public interface DecoratorTypeRepositoryBA extends JpaRepository<DecoratorTypeBE, Integer> {}
