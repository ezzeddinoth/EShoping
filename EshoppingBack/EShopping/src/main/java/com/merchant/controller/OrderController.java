package com.merchant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.merchant.model.ErrorMessage;
import com.merchant.service.OrderService;
import com.merchant.service.UserInHeaderAuth;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@SecurityRequirement(name = "merchantapi")
@RequestMapping(path = "/order")
public class OrderController {

	@Autowired
	OrderService orderService;

	@Autowired
	UserInHeaderAuth userInHeaderAuth;
	
	@Autowired
	ErrorMessage errorMessage;

	@GetMapping(path = "/all", produces = "application/json")
	public ResponseEntity<Object> allOrders() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(orderService.findAll());
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}

	/*
	 * @GetMapping(path = "/getOrderById", produces = "application/json") public
	 * ResponseEntity<Object> getOrderById(@RequestParam Long id) { Order order; try
	 * { order = orderService.findById(id); return
	 * ResponseEntity.status(HttpStatus.OK).body(order); } catch (Exception e) {
	 * return
	 * ResponseEntity.status(HttpStatus.NOT_FOUND).header("test").body("test"); } }
	 */

}