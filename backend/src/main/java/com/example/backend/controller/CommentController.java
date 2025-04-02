package com.example.backend.controller;

import com.example.backend.dto.CommentDto;
import com.example.backend.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentDto> createComment(
            @PathVariable Long postId,
            @Valid @RequestBody CommentDto commentDto) {
        return ResponseEntity.ok(commentService.createComment(postId, commentDto));
    }

    @GetMapping
    public ResponseEntity<List<CommentDto>> getCommentsByBlogPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByBlogPostId(postId));
    }
}