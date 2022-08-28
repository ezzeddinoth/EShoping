package com.merchant.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.merchant.model.Person;
import com.merchant.repository.PersonRepository;

@Service
public class PersonService {

	@Autowired
	private PersonRepository personRepository;

	public Set<Person> findAll() {
		Iterable<Person> iterable = personRepository.findAll();
		Set<Person> personSet = new HashSet<Person>();
		iterable.forEach(e -> personSet.add(e));
		return personSet;
	}

	public void deleteById(Long id) {
		// TODO check exists, check no orders for this person
		personRepository.deleteById(id);
	}

	public boolean updatePerson(Person person) {
		// TODO adjust return //Exception
		if (personRepository.existsById(person.getPersonId())) {
			personRepository.save(person);
			return true;
		}
		return false;
	}

	public boolean savePerson(Person person) {
		// TODO adjust return //Exception
		if (!personRepository.existsById(person.getPersonId())) {
			personRepository.save(person);
			return true;
		}
		return false;
	}

	public Optional<Person> findPersonByEmail(String email) {
		return personRepository.findPersonByEmail(email);
	}

}