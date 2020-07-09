package com.example.demo.controller;

import com.example.demo.JwtRequest;
import com.example.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity authenticate(@RequestBody(required = false) JwtRequest jwtRequest, HttpServletRequest httpServletRequest,
                                          HttpServletResponse httpServletResponse) {

        return authService.authenticate(jwtRequest, httpServletRequest, httpServletResponse);
    }

    @PostMapping("/expireAuth")
    public ResponseEntity logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        return authService.logout(httpServletRequest, httpServletResponse);
    }
}
