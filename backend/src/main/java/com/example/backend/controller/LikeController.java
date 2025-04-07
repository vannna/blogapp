package com.example.backend.controller;

import com.example.backend.dto.LikeDto;
import com.example.backend.exception.ApiError;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.service.LikeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@Tag(name = "Likes", description = "API for managing likes")
@RestController
@RequestMapping("/api/v1/posts/{postId}/likes")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @Operation(
            summary = "Create a like",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Like created",
                            content = @Content(schema = @Schema(implementation = LikeDto.class))
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Unauthorized",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Post not found",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    )
            }
    )
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<LikeDto> createLike(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.createLike(postId));
    }

    @Operation(
            summary = "Delete a like by ID",
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Like deleted"
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Unauthorized",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Like not found",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    )
            }
    )
    @DeleteMapping("/{likeId}")
    public ResponseEntity<Void> deleteLike(@PathVariable Long postId, @PathVariable Long likeId) {
        likeService.deleteLike(postId, likeId);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Toggle a like (create/delete)",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Like toggled"),
                    @ApiResponse(responseCode = "404", description = "Post not found")
            }
    )
    @PostMapping("/toggle")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> toggleLike(@PathVariable Long postId) {
        try {
            likeService.toggleLike(postId);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).build();
        }
    }

    @Operation(
            summary = "Get like count for a post",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Count retrieved"),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Post not found",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    )
            }
    )
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/count")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.getLikeCount(postId));
    }

    @GetMapping("/check")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Boolean> hasUserLikedPost(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.hasUserLikedPost(postId));
    }
}