package com.merchant.service;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.merchant.model.Order;
import com.merchant.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	public Iterable<Order> findAll() {
		return orderRepository.findAll();
	}

	/*
	 * public Order findById(long id) { Optional<Order> orderOptional =
	 * orderRepository.findById(id); Order order =
	 * orderOptional.orElseThrow(IllegalArgumentException::new); return order; }
	 */

	public boolean saveOrder(Order order) {
		// TODO adjust return //Exception
		orderRepository.save(order);
		return true;
	}

	public Set<Order> findBasketByPerson(long personId) {
		Set<Order> personSet = orderRepository.findBasketByPerson(personId);
		return personSet;
	}

}