package com.merchant.model;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ORDER_")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderId;
	
	@ManyToOne // (cascade = CascadeType.ALL)
	@JoinColumn(name = "person", referencedColumnName = "person_id")
	private Person person;
	/*
	 * @ManyToMany(mappedBy = "orders") // (cascade = CascadeType.ALL) private
	 * Set<Product> products;
	 */

	@ManyToOne
	@JoinColumn(name = "product")
	private Product product;

	private  int numberOfItems;

	private String status;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof Order))
			return false;
		return orderId != null && orderId.equals(((Order) o).getOrderId());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getOrderId());
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getNumberOfItems() {
		return numberOfItems;
	}

	public void setNumberOfItems(int numberOfItems) {
		this.numberOfItems = numberOfItems;
	}

}
