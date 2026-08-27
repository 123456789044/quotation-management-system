package com.quotation.quotation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quotation.quotation_backend.entity.Quotation;

public interface QuotationRepository extends JpaRepository<Quotation, Long> {

}
