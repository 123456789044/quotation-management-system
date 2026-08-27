package com.quotation.quotation_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.quotation.quotation_backend.entity.Customer;
import com.quotation.quotation_backend.entity.Quotation;
import com.quotation.quotation_backend.repository.CustomerRepository;
import com.quotation.quotation_backend.repository.QuotationRepository;

@Service
public class QuotationService {

    private final QuotationRepository quotationRepository;
    private final CustomerRepository customerRepository;

    public QuotationService(
            QuotationRepository quotationRepository,
            CustomerRepository customerRepository) {

        this.quotationRepository = quotationRepository;
        this.customerRepository = customerRepository;
    }

    // Create quotation
    public Quotation saveQuotation(Quotation quotation) {

        if (quotation.getCustomer() != null
                && quotation.getCustomer().getId() != null) {

            Long customerId =
                    quotation.getCustomer().getId();

            Customer customer =
                    customerRepository.findById(customerId)
                    .orElseThrow(() ->
                        new RuntimeException(
                            "Customer not found with id: "
                            + customerId
                        )
                    );

            quotation.setCustomer(customer);
        }

        return quotationRepository.save(quotation);
    }

    // Get all quotations
    public List<Quotation> getAllQuotations() {
        return quotationRepository.findAll();
    }

    // Get quotation by ID
    public Quotation getQuotationById(Long id) {

        return quotationRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Quotation not found"
                    )
                );
    }

    // Delete quotation
    public void deleteQuotation(Long id) {
        quotationRepository.deleteById(id);
    }
}