package com.example.demo.service;

import com.example.demo.dto.PostDto;
import com.example.demo.entity.Post;
import com.example.demo.entity.User;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;
    private UserRepository userRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<PostDto> getAllPosts() {
        return convertPostsToDto((List<Post>) postRepository.findAll());
    }

    @Override
    public List<PostDto> getAuthorPosts(Long authorId) {
        return convertPostsToDto(postRepository.findPostsByUserId(authorId));
    }

    @Override
    public PostDto getPostById(Long id) {
        Optional<Post> post = postRepository.findById(id);
        checkIfEntityIsPresent(post);
        return new PostDto(post.get());
    }

    @Transactional
    @Override
    public PostDto addPost(PostDto postDto) {
        Optional<User> user = userRepository.findById(postDto.getUserId());
        checkIfEntityIsPresent(user);
        User author = user.get();
        Post post = new Post(postDto);
        author.addPost(post);
        postRepository.save(post);
        return new PostDto(post);
    }

    @Transactional
    @Override
    public PostDto deletePost(Long id) {
        Optional<Post> post = postRepository.findById(id);
        checkIfEntityIsPresent(post);
        Post postFound = post.get();
        User user = postFound.getUser();
        PostDto postDto = new PostDto(postFound);
        user.removePost(postFound);
        postRepository.delete(postFound);
        return postDto;
    }

    private List<PostDto> convertPostsToDto(List<Post> posts) {
        List<PostDto> postDtos = new ArrayList<>();
        for (Post post : posts) {
            postDtos.add(new PostDto(post));
        }
        Collections.shuffle(postDtos);
        return postDtos;
    }

    private void checkIfEntityIsPresent(Optional entity) {
        if (!entity.isPresent()) {
            throw new EntityNotFoundException("The requested entity is not found");
        }
    }
}
