package com.example.demo.service;

import com.example.demo.JwtRequest;
import com.example.demo.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class AuthServiceImpl implements AuthService {

    private Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    private AuthenticationManager authenticationManager;
    private JwtTokenUtil jwtTokenUtil;
    private UserDetailsService userDetailsService;

    @Value("${jwt.secret}")
    private String secret;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil,
                           @Qualifier("jwtUserDetailsService") UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public ResponseEntity<?> authenticate(JwtRequest jwtRequest, HttpServletRequest httpServletRequest,
                                          HttpServletResponse httpServletResponse) {
        String token = null;

        if (jwtRequest != null) {
            token = authenticateByCredentials(jwtRequest);
        } else {
            token = authenticateByCookies(httpServletRequest);
        }
        addAuthCookieToResponse(httpServletResponse, token);
        return ResponseEntity.ok().body(token);
    }

    @Override
    public ResponseEntity<?> logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        Cookie authCookie = jwtTokenUtil.getAuthCookie(httpServletRequest);
        authCookie.setMaxAge(0);
        httpServletResponse.addCookie(authCookie);
        return ResponseEntity.ok().body(null);
    }

    private String authenticateByCredentials(JwtRequest jwtRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
        final UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        return jwtTokenUtil.generateToken(userDetails);
    }

    private String authenticateByCookies(HttpServletRequest httpServletRequest) {
        Cookie authCookie = jwtTokenUtil.getAuthCookie(httpServletRequest);
        final String authToken = authCookie != null ? authCookie.getValue() : null;

        String username = null;

        if (authToken != null) {
            try {
                username = jwtTokenUtil.getUsernameFromToken(authToken);
            } catch (Exception ex) {
                logger.error(ex.getMessage());
                throw ex;
            }
        }
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        if (jwtTokenUtil.isValidToken(authToken, userDetails)) {
            return authToken;
        }
        return authToken;
    }

    private void addAuthCookieToResponse(HttpServletResponse httpServletResponse, String token) {
        Cookie cookie = new Cookie(JwtTokenUtil.AUTH_TOKEN_COOKIE_NAME, token);
        cookie.setHttpOnly(true);
        httpServletResponse.addCookie(cookie);
    }
}
