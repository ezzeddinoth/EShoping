package com.merchant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.NonTransientDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.merchant.model.ErrorMessage;
import com.merchant.model.Product;
import com.merchant.service.ProductService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/product")
public class ProductController {

	@Autowired
	ProductService productService;
	
	@Autowired
	ErrorMessage errorMessage;
	
	@GetMapping(path = "/all", produces = "application/json")
	public ResponseEntity<Object> allProducts() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(productService.findAll());
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}

	@DeleteMapping(path = "/delete", produces = "application/json")
	public ResponseEntity<Object> deleteById(@RequestParam Long id) {
		try {
			productService.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(id);
		} catch (NonTransientDataAccessException e) {
			errorMessage.setTitle("Product could not be Deleted");
			errorMessage.setMessage("There is one or more orders for this Product");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(errorMessage);
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Product could not be deleted, Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}

	}

	@PutMapping(path = "/update", produces = "application/json")
	public ResponseEntity<Object> updateProduct(@RequestBody Product product) {
		try {
			productService.updateProduct(product);
			return ResponseEntity.status(HttpStatus.OK).body(product);
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Product could not be updated, Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}

	@PostMapping("/save")
	public ResponseEntity<Object> saveProduct(@RequestBody Product product) {
		product.setProductId(null);
		try {
			productService.saveProduct(product);
			return ResponseEntity.status(HttpStatus.OK).body(product);
		} catch (Exception e) {
			errorMessage.setTitle("Server Error");
			errorMessage.setMessage("Product could not be saved, Server Error");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}

}