package com.merchant.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.merchant.model.Order;
import com.merchant.model.Person;
import com.merchant.model.Product;
import com.merchant.repository.OrderRepository;
import com.merchant.repository.ProductRepository;

import DTO.BasketItem;

@Service
public class BasketService {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ModelMapper mapper;

	public void basketNewItem(Product product, Person person, int count) {
		Order order = getSameOrder(person.getPersonId(), product.getProductId());
		if (order != null) {
			order.setNumberOfItems(order.getNumberOfItems() + count);
			orderRepository.save(order);
		} else {
			order = new Order();
			order.setPerson(person);
			order.setProduct(product);
			order.setStatus("basket");
			order.setNumberOfItems(count);
			orderRepository.save(order);
		}
	}

	public Order getSameOrder(long personId, long productId) {
		Optional<Order> OPorder = orderRepository.findSameOrder(personId, productId);
		Order order = new Order();
		order = OPorder.orElse(order = null);
		return order;
	}

	public Set<BasketItem> findBasketByPerson(long personId) {
		Set<Order> orderSet = orderRepository.findBasketByPerson(personId);
		Set<BasketItem> basket = new HashSet<BasketItem>();
		orderSet.forEach(order -> basket.add(ConvertOrderBasket(order)));
		return basket;
	}

	public Set<BasketItem> findPaidOrderByPerson(long personId) {
		Set<Order> orderSet = orderRepository.findPaidOrderByPerson(personId);
		Set<BasketItem> basket = new HashSet<BasketItem>();
		orderSet.forEach(order -> basket.add(ConvertOrderBasket(order)));
		return basket;
	}

	public String buyBasketByPerson(long personId) {
		Set<Order> orderSet = orderRepository.findBasketByPerson(personId);
		String goodsInStock = checkGoodsInStock(orderSet);
		if (goodsInStock == "Goods are available") {
			saveOrder(orderSet, personId);
			return goodsInStock;
		} else {
			return goodsInStock;
		}
	}

	public String checkGoodsInStock(Set<Order> orderSet) {
		for (Order order : orderSet) {
			if (order.getProduct().getNumberOfItems() < order.getNumberOfItems()) {
				return createResponseNoItems(order.getProduct());
			}
		}
		return "Goods are available";
	}

	public String createResponseNoItems(Product product) {
		String response;
		switch (product.getNumberOfItems()) {
		case 0:
			response = "Unfortunately," + product.getName() + " is currently not available";
			break;
		case 1:
			response = "Only one Item of " + product.getName() + " is currently available";
			break;
		default:
			response = "Only " + product.getNumberOfItems() + " Items of " + product.getName()
					+ " are currently available";
			break;
		}

		return response;
	}

	public boolean saveOrder(Set<Order> orderSet, long personId) {
		for (Order order : orderSet) {
			Product product = order.getProduct();
			product.setNumberOfItems(product.getNumberOfItems() - order.getNumberOfItems());
			productRepository.save(product);
		}
		orderRepository.buyBasketByPerson(personId);
		return true;
	}

	private BasketItem ConvertOrderBasket(Order order) {
		BasketItem basket = mapper.map(order, BasketItem.class);
		basket.setProductName(order.getProduct().getName());
		basket.setProductType(order.getProduct().getProductType());
		basket.setPrice(order.getProduct().getPrice());
		return basket;
	}

}
