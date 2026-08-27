package com.quotation.quotation_backend.entity;
import jakarta.persistence.*;

import lombok.Data;


import java.time.LocalDate;

@Entity
@Data
public class Quotation {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String quotationNumber;

	    private LocalDate date;

	    private double tax;

	    private double subtotal;

	    private double taxAmount;

	    private double grandTotal;

	    private String status;

	    @ManyToOne
	    @JoinColumn(name = "customer_id")
	    private Customer customer;
}
