package com.merchant.service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.dao.NonTransientDataAccessException;
import org.springframework.dao.RecoverableDataAccessException;
import org.springframework.dao.TransientDataAccessException;
import org.springframework.jdbc.datasource.init.ScriptException;

import org.springframework.stereotype.Service;

import com.merchant.model.Product;
import com.merchant.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public Set<Product> findAll() {
		Iterable<Product> iterable = productRepository.findAll();
		Set<Product> productSet = new HashSet<Product>();
		iterable.forEach(e -> productSet.add(e));
		return productSet;
	}

	public void deleteById(Long id) throws TransientDataAccessException, NonTransientDataAccessException,
			ScriptException, RecoverableDataAccessException {
		productRepository.deleteById(id);
	}

	public boolean updateProduct(Product product) {
		// TODO adjust return //Exception
		if (productRepository.existsById(product.getProductId())) {
			productRepository.save(product);
			return true;
		}
		return false;
	}

	public boolean saveProduct(Product product) throws SQLIntegrityConstraintViolationException {
		productRepository.save(product);
		return false;
	}
}
