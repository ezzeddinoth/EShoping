package com.merchant.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.merchant.model.Person;
import com.merchant.security.JwtTokenProvider;

@Service
public class UserInHeaderAuth {

	@Autowired
	JwtTokenProvider jwtTokenProvider;

	@Autowired
	PersonService personService;

	public String emailInHeaderAuth(HttpServletRequest request) {
		String jwt = getJwtFromRequest(request);
		String email = jwtTokenProvider.getUserMailFromToken(jwt);
		return email;
	}

	public Person userInHeaderAuth(HttpServletRequest request) {
		String jwt = getJwtFromRequest(request);
		String email = jwtTokenProvider.getUserMailFromToken(jwt);
		Person person = personService.findPersonByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Dieser Benutzer konnte nicht gefunden werden."));
		return person;
	}

	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}
}
