package com.example.backend.controller;

import com.example.backend.dto.CommentDto;
import com.example.backend.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts/{postId}/comments") // Base path
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping // Corrected path
    public ResponseEntity<CommentDto> createComment(
            @PathVariable Long postId,
            @Valid @RequestBody CommentDto commentDto) {
        return ResponseEntity.ok(commentService.createComment(postId, commentDto));
    }

    @GetMapping
    public ResponseEntity<List<CommentDto>> getCommentsByBlogPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByBlogPostId(postId));
    }

    @DeleteMapping("/{commentId}") // Corrected path
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId) { // postId is already captured from class-level path
        Long postId = (Long) request.getAttribute("postId"); // Extract postId from class-level path
        commentService.deleteComment(postId, commentId); // Pass both
        return ResponseEntity.noContent().build();
    }
}