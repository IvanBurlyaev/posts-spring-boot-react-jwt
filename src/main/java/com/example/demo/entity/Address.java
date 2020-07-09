package com.example.demo.entity;

import com.example.demo.dto.AddressDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
public class Address implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String street;
    private String suite;
    private String city;
    private String zipcode;
    @OneToOne(cascade = CascadeType.ALL)
    private Geo geo;

    public Address(AddressDto addressDto) {
        this.street = addressDto.getStreet();
        this.suite = addressDto.getSuite();
        this.city = addressDto.getCity();
        this.zipcode = addressDto.getZipcode();
    }
}
