package com.example.demo.service;

import com.example.demo.JwtRequest;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AuthService {

    ResponseEntity<?> authenticate(JwtRequest jwtRequest, HttpServletRequest httpServletRequest,
                                   HttpServletResponse httpServletResponse);

    ResponseEntity<?> logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);
}
