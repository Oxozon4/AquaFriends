package pl.inf.app.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.inf.app.bm.user.control.UserRepositoryBA;

import static pl.inf.app.bm.user.entity.UserBE.Role.ROLE_ADMIN;
import static pl.inf.app.bm.user.entity.UserBE.Role.ROLE_USER;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private final UserRepositoryBA userRepositoryBA;

	@Override
	protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(email -> userRepositoryBA.findByEmail(email)
						.orElseThrow(() -> new UsernameNotFoundException(String.format("User with email %s not found", email))))
				.passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(final HttpSecurity http) throws Exception {
		http.csrf()
				.disable()
				.cors()
				.disable()
				.authorizeRequests()
				.antMatchers("/user", "/api/user-links", "/api/aquarium/**", "/api/fish/**", "/api/parameters-history/**")
				.hasAuthority(ROLE_USER.getAuthority())
				.antMatchers(HttpMethod.GET, "/api/user/**")
				.hasAuthority(ROLE_USER.getAuthority())
				.antMatchers("/admin", "/api/admin-links")
				.hasAuthority(ROLE_ADMIN.getAuthority())
				.antMatchers(HttpMethod.POST, "/api/accessory-type/**", "/api/aquarium-template/**", "/api/decorator-type/**",
						"/api/fish-type/**", "/api/knowledge/**")
				.hasAuthority(ROLE_ADMIN.getAuthority())
				.antMatchers(HttpMethod.PUT, "/api/accessory-type/**", "/api/aquarium-template/**", "/api/decorator-type/**",
						"/api/fish-type/**", "/api/knowledge/**")
				.hasAuthority(ROLE_ADMIN.getAuthority())
				.antMatchers(HttpMethod.DELETE, "/api/accessory-type/**", "/api/aquarium-template/**", "/api/decorator-type/**",
						"/api/fish-type/**", "/api/knowledge/**")
				.hasAuthority(ROLE_ADMIN.getAuthority())
				.antMatchers(HttpMethod.GET, "/api/accessory-type/**", "/api/aquarium-template/**", "/api/decorator-type/**",
						"/api/fish-type/**", "/api/knowledge/**")
				.hasAnyAuthority(ROLE_ADMIN.getAuthority(), ROLE_USER.getAuthority())
				.anyRequest()
				.permitAll()
				.and()
				.formLogin()
				.loginPage("/?login=true")
				.loginProcessingUrl("/api/perform_login")
				.successHandler((request, response, authentication) -> {
					if (authentication.getAuthorities().stream().anyMatch(ROLE_ADMIN::equals)) {
						response.sendRedirect("/admin");
					} else if (authentication.getAuthorities().stream().anyMatch(ROLE_USER::equals)) {
						response.sendRedirect("/user");
					} else {
						response.sendRedirect("/");
					}
				})
				.failureUrl("/?error=true")
				.and()
				.logout()
				.logoutUrl("/api/perform_logout")
				.logoutSuccessHandler((request, response, authentication) -> response.sendRedirect("/"));
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}

