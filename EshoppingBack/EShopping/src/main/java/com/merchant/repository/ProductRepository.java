package com.merchant.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.merchant.model.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
	
}
