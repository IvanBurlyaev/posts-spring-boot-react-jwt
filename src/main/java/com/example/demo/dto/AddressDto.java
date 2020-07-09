package com.example.demo.dto;

import com.example.demo.entity.Address;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressDto {
    private String street;
    private String suite;
    private String city;
    private String zipcode;
    private GeoDto geo;

    public AddressDto(Address address) {
        this.street = address.getStreet();
        this.suite = address.getSuite();
        this.city = address.getCity();
        this.zipcode = address.getZipcode();
        this.geo = new GeoDto(address.getGeo());
    }
}
