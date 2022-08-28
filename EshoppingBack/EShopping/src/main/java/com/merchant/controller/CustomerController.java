package com.merchant.controller;
/*

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.merchant.model.Customer;
import com.merchant.repository.CustomerRepository;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@SecurityRequirement(name = "merchantapi")
@RestController
@RequestMapping("/customer")
public class CustomerController {

    private CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping("/all")
    public List<Customer> index() {
    	System.out.println("TTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEESSSSSSSSSSSSSSSTTTTTTTTT");
        return customerRepository.findAll();
    }

}*/