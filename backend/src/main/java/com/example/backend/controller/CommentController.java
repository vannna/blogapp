package com.example.backend.controller;

import com.example.backend.dto.CommentDto;
import com.example.backend.exception.ApiError;
import com.example.backend.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Comments", description = "API for managing comments")
@RestController
@RequestMapping("/api/v1/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @Operation(
            summary = "Create a comment",
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Comment created",
                            content = @Content(schema = @Schema(implementation = CommentDto.class))
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Validation error",
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
    public ResponseEntity<CommentDto> createComment(
            @Parameter(hidden = true) @PathVariable Long postId, // Inferred from path
            @Parameter(description = "Comment details", required = true)
            @Valid @RequestBody CommentDto commentDto
    ) {
        return ResponseEntity.status(201).body(
                commentService.createComment(postId, commentDto)
        );
    }

    @Operation(
            summary = "Get all comments for a post",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Comments retrieved",
                            content = @Content(array = @ArraySchema(schema = @Schema(implementation = CommentDto.class)))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Post not found",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    )
            }
    )
    @GetMapping
    public ResponseEntity<List<CommentDto>> getCommentsByBlogPostId(
            @Parameter(description = "Post ID", example = "1", required = true)
            @PathVariable Long postId
    ) {
        return ResponseEntity.ok(commentService.getCommentsByBlogPostId(postId));
    }

    @Operation(
            summary = "Delete a comment",
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Comment deleted"
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Unauthorized",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Comment not found",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    )
            }
    )
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @Parameter(description = "Post ID", example = "1", required = true)
            @PathVariable Long postId,

            @Parameter(description = "Comment ID", example = "2", required = true)
            @PathVariable Long commentId
    ) {
        commentService.deleteComment(postId, commentId); // Ensure service uses both IDs
        return ResponseEntity.noContent().build();
    }
}