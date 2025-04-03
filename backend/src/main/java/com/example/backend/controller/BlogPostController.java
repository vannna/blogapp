package com.example.backend.controller;

import com.example.backend.dto.BlogPostDto;
import com.example.backend.exception.ApiError;
import com.example.backend.service.BlogPostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "Blog Posts", description = "API for managing blog posts")
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class BlogPostController {
    private final BlogPostService blogPostService;

    @Operation(
            summary = "Create a new blog post",
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Post created",
                            content = @Content(schema = @Schema(implementation = BlogPostDto.class))
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Unauthorized",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Forbidden",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    )
            }
    )
    @PreAuthorize("hasRole('ROLE_AUTHOR')")
    @PostMapping
    public ResponseEntity<BlogPostDto> createBlogPost(
            @Parameter(description = "Post details", required = true)
            @Valid @RequestBody BlogPostDto blogPostDto
    ) {
        return ResponseEntity.status(201).body(blogPostService.createBlogPost(blogPostDto));
    }

    @Operation(summary = "Get all posts", description = "Accessible to all users")
    @GetMapping
    public ResponseEntity<List<BlogPostDto>> getAllBlogPosts() {
        return ResponseEntity.ok(blogPostService.getAllBlogPosts());
    }

    @Operation(
            summary = "Get a blog post by ID",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Post found",
                            content = @Content(schema = @Schema(implementation = BlogPostDto.class))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Post not found",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    )
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<BlogPostDto> getBlogPostById(
            @Parameter(description = "Post ID", example = "1", required = true)
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(blogPostService.getBlogPostById(id));
    }

    @Operation(
            summary = "Update a blog post",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Post updated",
                            content = @Content(schema = @Schema(implementation = BlogPostDto.class))
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Forbidden",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Post not found",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    )
            }
    )
    @PreAuthorize("hasRole('ROLE_AUTHOR')")
    @PutMapping("/{id}")
    public ResponseEntity<BlogPostDto> updateBlogPost(
            @Parameter(description = "Post ID", example = "1", required = true)
            @PathVariable Long id,

            @Parameter(description = "Updated post details", required = true)
            @Valid @RequestBody BlogPostDto dto
    ) {
        return ResponseEntity.ok(blogPostService.updateBlogPost(id, dto));
    }

    @Operation(
            summary = "Delete a blog post",
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Post deleted"
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Forbidden",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Post not found",
                            content = @Content(schema = @Schema(implementation = ApiError.class))
                    )
            }
    )
    @PreAuthorize("hasRole('ROLE_AUTHOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(
            @Parameter(description = "Post ID", example = "1", required = true)
            @PathVariable Long id
    ) {
        blogPostService.deleteBlogPost(id);
        return ResponseEntity.noContent().build();
    }
}