package com.example.demo.service;

import com.example.demo.dto.PostDto;

import java.util.List;

public interface PostService {

    List<PostDto> getAllPosts();

    PostDto getPostById(Long id);

    PostDto addPost(PostDto postDto);

    PostDto updatePost(PostDto postDto);

    PostDto deletePost(Long id);

    List<PostDto> getAuthorPosts(Long authorId);
}
