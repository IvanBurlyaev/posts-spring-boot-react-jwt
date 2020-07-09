package com.example.demo.dto;

import com.example.demo.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String username;
    private String email;
    private AddressDto address;
    private String phone;
    private String website;
    private CompanyDto company;

    public UserDto(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.address = new AddressDto(user.getAddress());
        this.phone = user.getPhone();
        this.website = user.getWebsite();
        this.company = new CompanyDto(user.getCompany());
    }
}
