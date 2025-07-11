package io.github.edsonzuchi.gfig.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/user/me").permitAll()
                        .requestMatchers(HttpMethod.POST, "/user/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/user/admin").permitAll()
                        .requestMatchers(HttpMethod.POST, "/user/auth/register").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/user/valid").hasRole("REQUESTER")
                        .requestMatchers(HttpMethod.GET, "/user/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/warehouse/**").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/warehouse/**").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.GET, "/warehouse/**").hasRole("REQUESTER")
                        .requestMatchers(HttpMethod.POST, "/product/**").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.GET, "/stock/**").hasRole("REQUESTER")
                        .requestMatchers(HttpMethod.GET, "/product/**").hasRole("REQUESTER")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder  passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}