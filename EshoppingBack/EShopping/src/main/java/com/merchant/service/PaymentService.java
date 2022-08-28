package com.merchant.service;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.merchant.model.Payment;
import com.stripe.Stripe;
import com.stripe.exception.APIConnectionException;
import com.stripe.exception.APIException;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.model.Charge;

@Service
public class PaymentService {

	private String secretKey = "sk_test_51KG2I3KFD1WKZPjYrb9sOfKDI4Bjyf17qZQhLMn0UpEvJXfeqPxpnUWqYYvM6W4osMxtyvtDSCEOK6IhjPqiv6Zd00hctzUj5Y";

	@PostConstruct
	public void init() {
		Stripe.apiKey = secretKey;
	}

	public Charge charge(Payment chargeRequest) throws AuthenticationException, InvalidRequestException,
			APIConnectionException, CardException, APIException {
		Stripe.apiKey = secretKey;
		Map<String, Object> chargeParams = new HashMap<>();
		chargeParams.put("amount", chargeRequest.getAmount() * 100);
		chargeParams.put("currency", chargeRequest.getCurrency());
		chargeParams.put("description", chargeRequest.getDescription());
		chargeParams.put("source", chargeRequest.getStripeToken());
		System.out.println(chargeParams);
		return Charge.create(chargeParams);
	}
}
