package pl.inf.app.bm.user.control;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.inf.app.api.user.entity.UiUser;
import pl.inf.app.bm.user.entity.UserBE;
import pl.inf.app.utils.Filler;
import pl.inf.app.utils.Mapper;

@RequiredArgsConstructor
@Component
public class UiUserToEntityMapper implements Mapper<Filler<UiUser, UserBE>, UserBE> {

	private final PasswordEncoder passwordEncoder;

	@Override
	public UserBE map(final Filler<UiUser, UserBE> filler) {
		if (filler == null) return null;

		final UserBE target = filler.getTarget();
		final UiUser source = filler.getSource();

		target.setEmail(source.getEmail());
		if (StringUtils.isNotBlank(source.getPassword())) {
			target.setPassword(passwordEncoder.encode(source.getPassword()));
		}
		target.setFirstName(source.getFirst_name());
		target.setLastName(source.getLast_name());
		target.setAge(source.getAge());

		return target;
	}
}
