package com.example.backend.controller;

import com.example.backend.dto.LikeDto;
import com.example.backend.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts/{postId}/likes")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping
    public ResponseEntity<LikeDto> createLike(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.createLike(postId));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteLike(@PathVariable Long postId) {
        likeService.deleteLike(postId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<LikeDto>> getLikesByBlogPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.getLikesByBlogPostId(postId));
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> hasUserLikedPost(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.hasUserLikedPost(postId));
    }
}