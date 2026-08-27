package com.quotation.quotation_backend.controller;

import com.quotation.quotation_backend.entity.QuotationItem;
import com.quotation.quotation_backend.service.QuotationItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotation-items")
@CrossOrigin(origins = "http://localhost:5173")
public class QuotationItemController {

    private final QuotationItemService quotationItemService;

    public QuotationItemController(
            QuotationItemService quotationItemService) {

        this.quotationItemService = quotationItemService;
    }

    // GET all quotation items
    @GetMapping
    public List<QuotationItem> getAllQuotationItems() {
        return quotationItemService.getAllQuotationItems();
    }

    // GET quotation item by ID
    @GetMapping("/{id}")
    public ResponseEntity<QuotationItem> getQuotationItemById(
            @PathVariable Long id) {

        return quotationItemService.getQuotationItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST create quotation item
    @PostMapping
    public QuotationItem createQuotationItem(
            @RequestBody QuotationItem quotationItem) {

        return quotationItemService.createQuotationItem(quotationItem);
    }

    // PUT update quotation item
    @PutMapping("/{id}")
    public ResponseEntity<QuotationItem> updateQuotationItem(
            @PathVariable Long id,
            @RequestBody QuotationItem quotationItem) {

        try {
            return ResponseEntity.ok(
                    quotationItemService.updateQuotationItem(
                            id,
                            quotationItem
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE quotation item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuotationItem(
            @PathVariable Long id) {

        try {
            quotationItemService.deleteQuotationItem(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}