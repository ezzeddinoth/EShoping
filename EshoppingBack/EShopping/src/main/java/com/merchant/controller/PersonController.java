package com.merchant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.merchant.model.ErrorMessage;
import com.merchant.model.Person;
import com.merchant.service.PersonService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@CrossOrigin(origins = "*", maxAge = 3600)
@SecurityRequirement(name = "merchantapi")
@RestController
@RequestMapping(path = "/person")
public class PersonController {

	@Autowired
	PersonService personService;
	
	@Autowired
	ErrorMessage errorMessage;

	@GetMapping(path = "/all", produces = "application/json")
	public ResponseEntity<Object> allUsers() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(personService.findAll());
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}

	/*
	 * @DeleteMapping(path = "/person", produces = "application/json") public void
	 * deleteById(@RequestParam Long id) { personService.deleteById(id); }
	 */

	// TODO: TEST
	@PutMapping(path = "/update", produces = "application/json")
	public void updatePerson(@RequestBody Person person) {
		personService.updatePerson(person);
	}

	/*
	 * @PostMapping(path = "/person", produces = "application/json") public void
	 * savePerson(@RequestBody Person person) { personService.savePerson(person); }
	 */

}