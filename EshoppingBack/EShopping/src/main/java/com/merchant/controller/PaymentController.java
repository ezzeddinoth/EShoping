package com.merchant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import org.springframework.ui.Model;
import com.merchant.model.Payment;
import com.merchant.model.Payment.Currency;
import com.merchant.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@CrossOrigin(origins = "*", maxAge = 3600)
@SecurityRequirement(name = "merchantapi")
@RestController
@RequestMapping(path = "/payment")
public class PaymentController {

	@Autowired
	private PaymentService paymentsService;

	@PostMapping("/charge")
	public String charge(@RequestBody Payment chargeRequest/* , Model model */) throws StripeException {
		chargeRequest.setDescription("Example charge");
		chargeRequest.setCurrency(Currency.EUR);
		System.out.println(chargeRequest.getAmount());
		Charge charge = paymentsService.charge(chargeRequest);
		
		/*
		 * model.addAttribute("id", charge.getId()); model.addAttribute("status",
		 * charge.getStatus()); model.addAttribute("chargeId", charge.getId());
		 * model.addAttribute("balance_transaction", charge.getBalanceTransaction());
		 */
		return charge.getId();
	}

	@ExceptionHandler(StripeException.class)
	public String handleError(/* Model model, */StripeException ex) {
		/* model.addAttribute("error", ex.getMessage()); */
		return ex.getMessage();
	}
}