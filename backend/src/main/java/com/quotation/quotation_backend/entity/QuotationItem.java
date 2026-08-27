package com.quotation.quotation_backend.entity;
import jakarta.persistence.*;

import lombok.Data;


@Entity
@Data
public class QuotationItem {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String description;

	    private int quantity;

	    private double price;

	    private double amount;

	    @ManyToOne
	    @JoinColumn(name = "quotation_id")
	    private Quotation quotation;

}
