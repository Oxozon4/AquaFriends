package pl.inf.app.bm.parametershistory.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.parametershistory.entity.ParametersHistoryBE;

@Repository
public interface ParametersHistoryRepositoryBA extends JpaRepository<ParametersHistoryBE, Integer> {}
