package com.merchant.service;


import java.util.HashSet;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.merchant.model.Order;
import com.merchant.model.Person;
//import com.merchant.model.Person;
//import com.merchant.model.Product;
import com.merchant.repository.OrderRepository;

import DTO.OrderDTO;

@Service
public class OrderServiceUseDTO {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ModelMapper mapper;

	public Set<OrderDTO> findAll() {
		Iterable<Order> iterable = orderRepository.findAll();
		Set<OrderDTO> orderSet = new HashSet<OrderDTO>();
		iterable.forEach(e -> orderSet.add(ConvertOrderOrderDTO(e)));
		return orderSet;
	}

	private OrderDTO ConvertOrderOrderDTO(Order order) {
		OrderDTO orderDTO = mapper.map(order,OrderDTO.class);
		
		orderDTO = new OrderDTO();
		Person person = order.getPerson();
		orderDTO.setFirstName(person.getFirstName());
		orderDTO.setLastName(person.getLastName());

		return orderDTO;
	}
}
