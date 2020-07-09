package com.example.demo;

import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class AuthorsSpringBootReactSimpleAppApplication implements CommandLineRunner {


    private UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(AuthorsSpringBootReactSimpleAppApplication.class, args);
    }

    @Override
    public void run(String... args) throws IOException, ClassNotFoundException {
        userService.saveAllUsers(UserUtils.fetchUsersAndPostsFromJsonPlaceholder());
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
