package com.quotation.quotation_backend.service;

import com.quotation.quotation_backend.entity.QuotationItem;
import com.quotation.quotation_backend.repository.QuotationItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuotationItemService {

    private final QuotationItemRepository quotationItemRepository;

    public QuotationItemService(QuotationItemRepository quotationItemRepository) {
        this.quotationItemRepository = quotationItemRepository;
    }

    // Get all quotation items
    public List<QuotationItem> getAllQuotationItems() {
        return quotationItemRepository.findAll();
    }

    // Get quotation item by ID
    public Optional<QuotationItem> getQuotationItemById(Long id) {
        return quotationItemRepository.findById(id);
    }

    // Create quotation item
    public QuotationItem createQuotationItem(QuotationItem quotationItem) {
        return quotationItemRepository.save(quotationItem);
    }

    // Update quotation item
    public QuotationItem updateQuotationItem(
            Long id,
            QuotationItem quotationItemDetails) {

        QuotationItem quotationItem = quotationItemRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Quotation item not found with id: " + id
                        ));

        quotationItem.setDescription(
                quotationItemDetails.getDescription()
        );

        quotationItem.setQuantity(
                quotationItemDetails.getQuantity()
        );

        quotationItem.setPrice(
                quotationItemDetails.getPrice()
        );

        return quotationItemRepository.save(quotationItem);
    }

    // Delete quotation item
    public void deleteQuotationItem(Long id) {

        QuotationItem quotationItem = quotationItemRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Quotation item not found with id: " + id
                        ));

        quotationItemRepository.delete(quotationItem);
    }
}