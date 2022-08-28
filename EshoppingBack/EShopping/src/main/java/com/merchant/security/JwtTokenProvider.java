package com.merchant.security;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {

	@Value("${app.jwtSecret}")
	private String jwtSecret;

	public String generateToken(String userEmail) {
		Instant now = Instant.now();
		Instant expiration = now.plus(7, ChronoUnit.DAYS);

		return Jwts.builder().setSubject(userEmail).setIssuedAt(Date.from(now)).setExpiration(Date.from(expiration))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();

	}

	public String generateToken(Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		return generateToken(user.getUsername());
	}

	public String getUserMailFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		return claims.getSubject();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
			return true;
		} catch (SignatureException ex) {
			System.out.println("Invalid JWT signature");
		} catch (MalformedJwtException ex) {
			System.out.println("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			System.out.println("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			System.out.println("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			System.out.println("JWT claims string is empty.");
		}

		return false;
	}

}