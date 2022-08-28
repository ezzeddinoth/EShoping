package com.merchant.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.merchant.model.ErrorMessage;
import com.merchant.model.Product;
import com.merchant.service.BasketService;
import com.merchant.service.OrderService;
import com.merchant.service.UserInHeaderAuth;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@SecurityRequirement(name = "merchantapi")
@RequestMapping(path = "/basket")
public class BasketController {

	@Autowired
	OrderService orderService;

	@Autowired
	BasketService basketService;

	@Autowired
	UserInHeaderAuth userInHeaderAuth;
	
	@Autowired
	ErrorMessage errorMessage;

	@GetMapping(path = "/myBasket", produces = "application/json")
	public ResponseEntity<Object> getMyBasket(HttpServletRequest request) {
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(basketService.findBasketByPerson(userInHeaderAuth.userInHeaderAuth(request).getPersonId()));
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}

	@GetMapping(path = "/myPaidOrder", produces = "application/json")
	public ResponseEntity<Object> myPaidOrder(HttpServletRequest request) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(
					basketService.findPaidOrderByPerson(userInHeaderAuth.userInHeaderAuth(request).getPersonId()));
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}

	@PostMapping(path = "/addTo")
	public ResponseEntity<Object> addToBasket(HttpServletRequest request, @RequestBody Product product,
			@RequestParam int count) {
		try {
			basketService.basketNewItem(product, userInHeaderAuth.userInHeaderAuth(request), count);
			return ResponseEntity.status(HttpStatus.OK).body("added to basket");
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}

	@PutMapping(path = "/buyBasket", produces = "application/json")
	public ResponseEntity<Object> buyBasketByPerson(HttpServletRequest request) {
		try {
			String transactionResponse = basketService
					.buyBasketByPerson(userInHeaderAuth.userInHeaderAuth(request).getPersonId());
			if (transactionResponse == "Goods are available") {
				return ResponseEntity.status(HttpStatus.OK).body("is paid");
			} else {
				errorMessage.setTitle("We don't have enough items");
				errorMessage.setMessage(transactionResponse);
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
			}
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}
}