package com.merchant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.merchant.model.ErrorMessage;
import com.merchant.model.Person;
import com.merchant.repository.PersonRepository;
import com.merchant.request.AuthRequest;
import com.merchant.security.JwtTokenProvider;

import java.util.Optional;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	ErrorMessage errorMessage;
	
	private PersonRepository userRepository;

	private PasswordEncoder passwordEncoder;

	private AuthenticationManager authenticationManager;

	private JwtTokenProvider jwtTokenProvider;

	public AuthController(PersonRepository userRepository, PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	// TODO: TEST
	@PostMapping(value = "/register")
	public ResponseEntity<Person> register(@RequestBody AuthRequest authRequest) {
		Optional<Person> userOptional = userRepository.findPersonByEmail(authRequest.getEmail());
		if (userOptional.isPresent()) {
			return ResponseEntity.badRequest().build();
		}
		Person user = new Person();
		user.setEmail(authRequest.getEmail());
		user.setPassword(passwordEncoder.encode(authRequest.getPassword()));

		Person created = userRepository.save(user);

		return ResponseEntity.ok(created);
	}
	
	// TODO: TEST
	@PostMapping(value = "/login")
	public ResponseEntity<String> login(@RequestBody AuthRequest authRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

		return ResponseEntity.ok(jwtTokenProvider.generateToken(authentication));
	}
}