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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Likes", description = "API for managing likes")
@RestController
@RequestMapping("/api/v1/posts/{postId}/likes")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @Operation(
            summary = "Toggle a like for a post",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Like toggled",
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
    public ResponseEntity<LikeDto> createLike(
            @Parameter(description = "Post ID", example = "1", required = true)
            @PathVariable Long postId
    ) {
        return ResponseEntity.ok(likeService.createLike(postId));
    }

    @Operation(
            summary = "Delete a like",
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
    public ResponseEntity<Void> deleteLike(
            @Parameter(description = "Post ID", example = "1", required = true)
            @PathVariable Long postId,

            @Parameter(description = "Like ID", example = "2", required = true)
            @PathVariable Long likeId
    ) {
        likeService.deleteLike(postId, likeId);
        return ResponseEntity.noContent().build();
    }
}