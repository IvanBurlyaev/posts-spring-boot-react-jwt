package com.example.demo.dto;

import com.example.demo.entity.Company;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompanyDto {
    private String name;
    private String catchPhrase;
    private String bs;

    public CompanyDto(Company company) {
        this.name = company.getName();
        this.catchPhrase = company.getCatchPhrase();
        this.bs = company.getBs();
    }
}
