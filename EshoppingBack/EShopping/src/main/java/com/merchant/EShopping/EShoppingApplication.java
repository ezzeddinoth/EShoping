package com.merchant.EShopping;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@ComponentScan({ "com.merchant.configuration" })
@ComponentScan({ "com.merchant.security" })
@ComponentScan({ "com.merchant.request" })
@ComponentScan({ "com.merchant.repository" })
@ComponentScan({ "com.merchant.model" })
@ComponentScan({ "com.merchant.service" })
@ComponentScan({ "com.merchant.controller" })
@ComponentScan({ "com.merchant..DTO" })
@EntityScan("com.merchant.model")
@EnableJpaRepositories(basePackages = "com.merchant.repository")

@SpringBootApplication()
@OpenAPIDefinition(info = @Info(title = "Merchant API", version = "2.0", description = "Merchant API Information"))
@SecurityScheme(name = "merchantapi", scheme = "bearer", type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER)
public class EShoppingApplication {

	public static void main(String[] args) {
		SpringApplication.run(EShoppingApplication.class, args);
	}

	/*@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private PersonRepository userRepository;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	public void run(String... args) throws Exception {
		try {
			Person user = new Person();
			user.setEmail("ezzeddinothman@gmail.com");
			user.setPassword(passwordEncoder.encode("1234"));

			Person saved = userRepository.save(user);

			System.out.println(jwtTokenProvider.generateToken(saved.getEmail()));
		} catch (Exception e) {
			//
		}
	}*/

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
