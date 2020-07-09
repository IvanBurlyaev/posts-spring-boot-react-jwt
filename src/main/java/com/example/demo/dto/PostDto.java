package com.example.demo.dto;

import com.example.demo.entity.Post;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Data
public class PostDto {
    @NotNull
    private Long userId;
    private Long id;
    @NotBlank(message = "Title must not be empty")
    private String title;
    @NotBlank(message = "Body must not be empty")
    private String body;
    private String author;

    public PostDto(Post post) {
        this.userId = post.getUser().getId();
        this.id = post.getId();
        this.title = post.getTitle();
        this.body = post.getBody();
        this.author = post.getUser().getName();
    }
}
