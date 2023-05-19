package pl.inf.app.bm.accessorytype.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.inf.app.bm.accessorytype.control.AccessoryTypeRepositoryBA;
import pl.inf.app.bm.accessorytype.entity.AccessoryTypeBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;

@Service
@RequiredArgsConstructor
public class AccessoryTypeBF {
	private final AccessoryTypeRepositoryBA accessoryTypeRepositoryBA;

	public AccessoryTypeBE getById(final int id) {
		return accessoryTypeRepositoryBA.findById(id).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}
}
