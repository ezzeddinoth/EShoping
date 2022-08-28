package com.merchant.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.merchant.model.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

	/*
	 * @Query(value = "select * from order_ o where o.person= ?1;", nativeQuery =
	 * true) Optional<Order> findOrderByPersonId(long personId);
	 */

	@Query(value = "select * from order_ o where o.person= ?1 And o.product= ?2 And o.status='basket' LIMIT 1;", nativeQuery = true)
	Optional<Order> findSameOrder(long personId, long productID);

	@Query(value = "select * from order_ o where o.person= ?1 And o.status='basket' ;", nativeQuery = true)
	Set<Order> findBasketByPerson(long personId);

	@Query(value = "select * from order_ o where o.person= ?1 And o.status='paid' ;", nativeQuery = true)
	Set<Order> findPaidOrderByPerson(long personId);

	@Transactional
	@Modifying
	@Query(value = "update order_ o  set o.status='paid' where o.person= ?1 And o.status='basket';", nativeQuery = true)
	Integer buyBasketByPerson(long personId);

}
