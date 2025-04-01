package com.example.backend.controller;

import com.example.backend.dto.BlogPostDto;
import com.example.backend.service.BlogPostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class BlogPostController {
    private final BlogPostService blogPostService;

    @PostMapping
    public ResponseEntity<BlogPostDto> createBlogPost(@Valid @RequestBody BlogPostDto blogPostDto) {
        return ResponseEntity.ok(blogPostService.createBlogPost(blogPostDto));
    }

    @GetMapping
    public ResponseEntity<List<BlogPostDto>> getAllBlogPosts() {
        return ResponseEntity.ok(blogPostService.getAllBlogPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPostDto> getBlogPostById(@PathVariable Long id) {
        return ResponseEntity.ok(blogPostService.getBlogPostById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPostDto> updateBlogPost(
            @PathVariable Long id,
            @Valid @RequestBody BlogPostDto blogPostDto) {
        return ResponseEntity.ok(blogPostService.updateBlogPost(id, blogPostDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable Long id) {
        blogPostService.deleteBlogPost(id);
        return ResponseEntity.noContent().build();
    }
}