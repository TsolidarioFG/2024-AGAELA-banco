package es.udc.tfgproject.backend.rest.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private JwtGenerator jwtGenerator;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.cors().and().csrf().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.addFilter(new JwtFilter(authenticationManager(), jwtGenerator))
				.authorizeRequests()
				.antMatchers(HttpMethod.POST, "/users/signUp").permitAll()
				.antMatchers(HttpMethod.POST, "/users/login").permitAll()
				.antMatchers(HttpMethod.POST, "/users/loginFromServiceToken").permitAll()
				.antMatchers(HttpMethod.PUT, "/users/*").permitAll()
				.antMatchers(HttpMethod.POST, "/users/*/changePassword").permitAll()
				.antMatchers(HttpMethod.GET, "/users").permitAll()
				.antMatchers(HttpMethod.DELETE, "/users/*").permitAll()

				.antMatchers(HttpMethod.GET, "/members/*").permitAll()
				.antMatchers(HttpMethod.GET, "/members").permitAll()
				.antMatchers(HttpMethod.GET, "/members/product/*").permitAll()
				.antMatchers(HttpMethod.POST, "/members").permitAll()//.hasRole("ADMIN")
				.antMatchers(HttpMethod.PUT, "/members/*").permitAll()//.hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/members/*").permitAll()//.hasRole("ADMIN")

				.antMatchers(HttpMethod.GET, "/entities").permitAll()
				.antMatchers(HttpMethod.GET, "/entities/*").permitAll()
				.antMatchers(HttpMethod.GET, "/entities/product/*").permitAll()
				.antMatchers(HttpMethod.POST, "/entities").permitAll()//.hasRole("ADMIN")
				.antMatchers(HttpMethod.PUT, "/entities/*").permitAll()//.hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/entities/*").permitAll()//.hasRole("ADMIN")

				.antMatchers(HttpMethod.GET, "/products").permitAll()
				.antMatchers(HttpMethod.GET, "/products/*").permitAll()
				.antMatchers(HttpMethod.POST, "/products").permitAll()//.hasRole("ADMIN")
				.antMatchers(HttpMethod.PUT, "/products/*").permitAll()//.hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/products/*").permitAll()//.hasRole("ADMIN")

				.antMatchers(HttpMethod.POST, "/loans/register/member/**").permitAll()
				.antMatchers(HttpMethod.POST, "/loans/register/entity/**").permitAll()
				.antMatchers(HttpMethod.POST, "/loans/devolution/*").permitAll()
				.antMatchers(HttpMethod.GET, "/loans").permitAll()
				.antMatchers(HttpMethod.GET, "/loans/**").permitAll()
				.antMatchers(HttpMethod.GET, "/loans/member/**").permitAll()
				.antMatchers(HttpMethod.GET, "/loans/member").permitAll()
				.antMatchers(HttpMethod.GET, "/loans/entity").permitAll()
				.antMatchers(HttpMethod.GET, "/loans/entity/**").permitAll()
				.antMatchers(HttpMethod.GET, "/loans/product/**").permitAll()
				.antMatchers(HttpMethod.PUT, "/loans/*").permitAll()//.hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/loans/*").permitAll()//.hasRole("ADMIN")
				.anyRequest().denyAll();

	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		
		CorsConfiguration config = new CorsConfiguration();
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		config.setAllowCredentials(true);
	    config.setAllowedOriginPatterns(Arrays.asList("*"));
	    config.addAllowedHeader("*");
	    config.addAllowedMethod("*");
	    
	    source.registerCorsConfiguration("/**", config);
	    
	    return source;
	    
	 }

}
