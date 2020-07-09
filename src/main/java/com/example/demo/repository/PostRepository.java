package com.example.demo.repository;

import com.example.demo.entity.Post;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostRepository extends CrudRepository<Post, Long> {
    List<Post> findPostsByUserId(Long userId);
}
