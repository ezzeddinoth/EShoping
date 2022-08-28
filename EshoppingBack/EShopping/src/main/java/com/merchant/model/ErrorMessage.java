package com.merchant.model;


import javax.persistence.Id;

import org.springframework.stereotype.Component;

@Component
public class ErrorMessage {

	@Id
	private Long errorId;
	
	private String message;
	
	private String title;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
