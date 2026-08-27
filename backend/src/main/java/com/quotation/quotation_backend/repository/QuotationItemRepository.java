package com.quotation.quotation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quotation.quotation_backend.entity.QuotationItem;

public interface QuotationItemRepository extends JpaRepository<QuotationItem, Long> {

}
