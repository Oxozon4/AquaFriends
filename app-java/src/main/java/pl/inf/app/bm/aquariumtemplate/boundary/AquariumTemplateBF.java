package pl.inf.app.bm.aquariumtemplate.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.inf.app.bm.aquariumtemplate.control.AquariumTemplateRepositoryBA;
import pl.inf.app.bm.aquariumtemplate.entity.AquariumTemplateBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;

@Service
@RequiredArgsConstructor
public class AquariumTemplateBF {
	private final AquariumTemplateRepositoryBA aquariumTemplateRepositoryBA;

	public AquariumTemplateBE getById(final int id) {
		return aquariumTemplateRepositoryBA.findById(id).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}
}
