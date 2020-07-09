package com.example.demo.entity;

import com.example.demo.dto.PostDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
public class Post implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    @ToString.Exclude
    @ManyToOne
    private User user;
    private String title;
    private String body;

    public Post(PostDto postDto) {
        this.title = postDto.getTitle();
        this.body = postDto.getBody();
    }
}
