package com.quotation.quotation_backend.repository;
import com.quotation.quotation_backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

 public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
