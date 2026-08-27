package com.quotation.quotation_backend.controller;

import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.quotation.quotation_backend.entity.Quotation;
import com.quotation.quotation_backend.service.QuotationService;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/quotations")


public class QuotationController {
	 private final QuotationService quotationService;

	    public QuotationController(QuotationService quotationService) {
	        this.quotationService = quotationService;
	    }

	    @PostMapping
	    public Quotation createQuotation(@RequestBody Quotation quotation) {
	        return quotationService.saveQuotation(quotation);
	    }

	    @GetMapping
	    public List<Quotation> getAllQuotations() {
	        return quotationService.getAllQuotations();
	    }

	    @GetMapping("/{id}")
	    public Quotation getQuotationById(@PathVariable Long id) {
	        return quotationService.getQuotationById(id);
	    }

	    @DeleteMapping("/{id}")
	    public String deleteQuotation(@PathVariable Long id) {

	        quotationService.deleteQuotation(id);

	        return "Quotation deleted successfully";
	    }
}
