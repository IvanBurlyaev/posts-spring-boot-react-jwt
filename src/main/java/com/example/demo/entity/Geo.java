package com.example.demo.entity;

import com.example.demo.dto.GeoDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
public class Geo implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private double lat;
    private double lng;

    public Geo(GeoDto geoDto) {
        this.lat = geoDto.getLat();
        this.lng = geoDto.getLng();
    }
}
