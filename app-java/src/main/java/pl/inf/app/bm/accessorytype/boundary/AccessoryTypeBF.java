package pl.inf.app.bm.accessorytype.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.inf.app.api.accessorytype.entity.UiAccessoryType;
import pl.inf.app.bm.accessorytype.control.AccessoryTypeRepositoryBA;
import pl.inf.app.bm.accessorytype.entity.AccessoryTypeBE;
import pl.inf.app.error.ErrorType;
import pl.inf.app.error.ProcessException;
import pl.inf.app.utils.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccessoryTypeBF {
	private final AccessoryTypeRepositoryBA accessoryTypeRepositoryBA;

	public <T> T getById(final int id, final Mapper<AccessoryTypeBE, T> uiMapper) {
		return accessoryTypeRepositoryBA.findById(id)
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public <T> List<T> getAll(final Mapper<AccessoryTypeBE, T> uiMapper) {
		return accessoryTypeRepositoryBA.findAll().stream().map(uiMapper::map).collect(Collectors.toList());
	}

	public <T> T save(UiAccessoryType accessoryType, final Mapper<AccessoryTypeBE, T> uiMapper) {
		final AccessoryTypeBE accessoryTypeBE =
				AccessoryTypeBE.builder().name(accessoryType.getName()).volume(accessoryType.getVolume()).build();
		return uiMapper.map(accessoryTypeRepositoryBA.save(accessoryTypeBE));
	}

	@Transactional
	public <T> T update(Integer id, UiAccessoryType accessoryType, Mapper<AccessoryTypeBE, T> uiMapper) {
		return accessoryTypeRepositoryBA.findById(id).map(accessoryTypeBE -> {
			accessoryTypeBE.setName(accessoryType.getName());
			accessoryTypeBE.setVolume(accessoryType.getVolume());
			return accessoryTypeBE;
		}).map(uiMapper::map).orElseThrow(() -> new ProcessException(ErrorType.NOT_FOUND_ERROR));
	}

	public void delete(Integer id) {
		accessoryTypeRepositoryBA.deleteById(id);
	}
}
