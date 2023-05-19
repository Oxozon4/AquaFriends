package pl.inf.app.bm.user.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.inf.app.bm.user.entity.UserBE;

import java.util.Optional;

/**
 * Class to manage the user entity in the database
 */
@Repository
public interface UserRepositoryBA extends JpaRepository<UserBE, Integer> {
	Optional<UserBE> findByEmail(String email);
}
