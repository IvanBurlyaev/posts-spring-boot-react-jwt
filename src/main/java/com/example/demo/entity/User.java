package com.example.demo.entity;

import com.example.demo.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "article_user")
public class User implements Serializable {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String username;
    private String password;
    private String email;
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
    private String phone;
    private String website;
    @OneToOne(cascade = CascadeType.ALL)
    private Company company;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();

    public User(UserDto userDto) {
        this.name = userDto.getName();
        this.username = userDto.getUsername();
        this.email = userDto.getEmail();
        this.phone = userDto.getPhone();
        this.website = userDto.getWebsite();
    }

    public void addPost(Post post) {
        posts.add(post);
        post.setUser(this);
    }

    public void removePost(Post post) {
        posts.remove(post);
        post.setUser(null);
    }
}
