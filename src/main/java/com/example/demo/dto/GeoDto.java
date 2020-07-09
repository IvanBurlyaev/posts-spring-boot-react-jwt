package com.example.demo.dto;

import com.example.demo.entity.Geo;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GeoDto {
    private double lat;
    private double lng;

    public GeoDto(Geo geo) {
        this.lat = geo.getLat();
        this.lng = geo.getLng();
    }
}
