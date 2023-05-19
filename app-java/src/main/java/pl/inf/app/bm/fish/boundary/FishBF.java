package pl.inf.app.bm.fish.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.inf.app.bm.fish.control.FishRepositoryBA;
import pl.inf.app.bm.fish.entity.FishBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;

@Service
@RequiredArgsConstructor
public class FishBF {
	private final FishRepositoryBA fishRepositoryBA;

	public FishBE getById(final int id) {
		return fishRepositoryBA.findById(id).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}
}
