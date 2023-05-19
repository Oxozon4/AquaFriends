package pl.inf.app.bm.aquarium.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.inf.app.bm.aquarium.control.AquariumRepositoryBA;
import pl.inf.app.bm.aquarium.entity.AquariumBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;

@Service
@RequiredArgsConstructor
public class AquariumBF {
	private final AquariumRepositoryBA aquariumRepositoryBA;

	public AquariumBE getById(final int id) {
		return aquariumRepositoryBA.findById(id).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}
}
