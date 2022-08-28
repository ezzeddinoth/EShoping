package com.merchant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.merchant.model.ErrorMessage;
import com.merchant.service.OrderServiceUseDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;


/* NOT IN USE */
@CrossOrigin(origins = "*", maxAge = 3600)
@SecurityRequirement(name = "merchantapi")
@RestController
@RequestMapping(path = "/orderDTO")
public class OrderDTOController {

	@Autowired
	OrderServiceUseDTO orderDTOService;
	
	@Autowired
	ErrorMessage errorMessage;

	@GetMapping(path = "/all", produces = "application/json")
	public ResponseEntity<Object> allUsers() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(orderDTOService.findAll());
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}

}