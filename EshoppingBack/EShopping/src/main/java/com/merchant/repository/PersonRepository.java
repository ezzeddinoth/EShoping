package com.merchant.repository;

import java.util.Optional;

//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.merchant.model.Person;

@Repository
public interface PersonRepository extends CrudRepository<Person, Long> {
	
    Optional<Person> findPersonByEmail(String email);
    
    /*@Query(value = "select * from person p where p.email= ?1 ;", nativeQuery = true)
    Optional<Person> findPersonByEmail1(String email);*/
}
