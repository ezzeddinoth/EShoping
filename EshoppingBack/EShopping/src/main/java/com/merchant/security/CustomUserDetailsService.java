package com.merchant.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.merchant.model.Person;
import com.merchant.repository.PersonRepository;

//import com.merchant.model.User;
//import com.merchant.repository.UserRepository;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private PersonRepository userRepository;

    public CustomUserDetailsService(PersonRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person user = userRepository.findPersonByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Dieser Benutzer konnte nicht gefunden werden."));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList()
        );
    }
}