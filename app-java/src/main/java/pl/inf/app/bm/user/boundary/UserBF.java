package pl.inf.app.bm.user.boundary;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.inf.app.api.user.entity.UiUser;
import pl.inf.app.bm.user.control.UiUserToEntityMapper;
import pl.inf.app.bm.user.control.UserRepositoryBA;
import pl.inf.app.bm.user.entity.UserBE;
import pl.inf.app.error.ProcessException;
import pl.inf.app.utils.Filler;
import pl.inf.app.utils.Mapper;

import java.util.Optional;

import static pl.inf.app.bm.user.entity.UserBE.Role.ROLE_USER;
import static pl.inf.app.error.ErrorType.REGISTER_ERROR;

@Service
@RequiredArgsConstructor
public class UserBF {
	private final UserRepositoryBA userRepositoryBA;
	private final UiUserToEntityMapper uiUserToEntityMapper;

	public <T> T create(final UiUser uiUser, final Mapper<UserBE, T> uiMapper) {
		final UserBE userBE = uiUserToEntityMapper.map(new Filler<>(uiUser, new UserBE()));
		userBE.setRole(ROLE_USER);
		return Optional.of(userRepositoryBA.save(userBE))
				.map(uiMapper::map)
				.orElseThrow(() -> new ProcessException(REGISTER_ERROR, userBE));
	}
}
