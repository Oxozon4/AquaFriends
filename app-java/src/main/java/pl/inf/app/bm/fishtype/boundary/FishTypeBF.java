package pl.inf.app.bm.fishtype.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.inf.app.bm.fishtype.control.FishTypeRepositoryBA;
import pl.inf.app.bm.fishtype.entity.FishTypeBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;

@Service
@RequiredArgsConstructor
public class FishTypeBF {
	private final FishTypeRepositoryBA fishTypeRepositoryBA;

	public FishTypeBE getById(final int id) {
		return fishTypeRepositoryBA.findById(id).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}
}
