package pl.inf.app.bm.fishtyperelation.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.inf.app.bm.fishtyperelation.control.FishTypeRelationRepositoryBA;
import pl.inf.app.bm.fishtyperelation.entity.FishTypeRelationBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;

@Service
@RequiredArgsConstructor
public class FishTypeRelationBF {
	private final FishTypeRelationRepositoryBA fishTypeRelationRepositoryBA;

	public FishTypeRelationBE getById(final int id) {
		return fishTypeRelationRepositoryBA.findById(id).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}
}
