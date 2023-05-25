package pl.inf.app.api.user.control;

import org.springframework.stereotype.Component;
import pl.inf.app.api.user.entity.UiUser;
import pl.inf.app.bm.user.entity.UserBE;
import pl.inf.app.utils.Mapper;

@Component
public class UserToUiMapper implements Mapper<UserBE, UiUser> {
	@Override
	public UiUser map(final UserBE source) {
		final UiUser uiUser = new UiUser();
		uiUser.setId(source.getId());
		uiUser.setFirst_name(source.getFirstName());
		uiUser.setLast_name(source.getLastName());
		uiUser.setEmail(source.getEmail());
		uiUser.setAge(source.getAge());
		return uiUser;
	}
}
