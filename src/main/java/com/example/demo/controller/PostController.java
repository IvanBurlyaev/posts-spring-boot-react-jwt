package com.example.demo.controller;

import com.example.demo.dto.PostDto;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RequestMapping("/posts")
@RestController
public class PostController {

    @Autowired
    Environment environment;

    private PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostDto> allPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public PostDto getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @GetMapping("/authors/{id}")
    public List<PostDto> getAuthorsPosts(@PathVariable("id") Long authorId) {
        return postService.getAuthorPosts(authorId);
    }

    @PostMapping
    public PostDto addPost(@Valid @RequestBody PostDto postDto) {
        return postService.addPost(postDto);
    }

    @DeleteMapping("/{id}")
    public PostDto deletePost(@PathVariable Long id) {
        return postService.deletePost(id);
    }

//    @GetMapping("/port")
//    public String localServerPort() {
//        try {
//            String port = environment.getProperty("local.server.port");
//            String inetAddress = InetAddress.getLocalHost().getHostAddress();
//            System.out.println();
//            return inetAddress + ":" + port;
//        } catch (UnknownHostException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
}
