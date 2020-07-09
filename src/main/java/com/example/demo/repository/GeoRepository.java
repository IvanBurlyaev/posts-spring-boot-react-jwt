package com.example.demo.repository;

import com.example.demo.entity.Geo;
import org.springframework.data.repository.CrudRepository;

public interface GeoRepository extends CrudRepository<Geo, Long> {
}
