package com.example.demo.entity;

import com.example.demo.dto.CompanyDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
public class Company implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String catchPhrase;
    private String bs;

    public Company(CompanyDto companyDto) {
        this.name = companyDto.getName();
        this.catchPhrase = companyDto.getCatchPhrase();
        this.bs = companyDto.getBs();
    }
}
