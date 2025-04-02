package com.example.backend.service;

import com.example.backend.dto.BlogPostDto;
import com.example.backend.entity.BlogPost;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.BlogPostRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BlogPostService {
    private final BlogPostRepository blogPostRepository;
    private final UserRepository userRepository;

    public BlogPostDto createBlogPost(BlogPostDto blogPostDto) {
        User currentUser = getCurrentUser();

        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(blogPostDto.getTitle());
        blogPost.setContent(blogPostDto.getContent());
        blogPost.setAuthor(currentUser);
        blogPost.setCreatedAt(LocalDateTime.now());
        blogPost.setUpdatedAt(LocalDateTime.now());

        return convertToDto(blogPostRepository.save(blogPost));
    }

    public List<BlogPostDto> getAllBlogPosts() {
        return blogPostRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public BlogPostDto getBlogPostById(Long id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));
        return convertToDto(blogPost);
    }

    public BlogPostDto updateBlogPost(Long id, BlogPostDto blogPostDto) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));

        User currentUser = getCurrentUser();
        if (!blogPost.getAuthor().equals(currentUser) && !currentUser.getRole().name().equals("ROLE_ADMIN")) {
            throw new AccessDeniedException("You can only update your own posts");
        }

        blogPost.setTitle(blogPostDto.getTitle());
        blogPost.setContent(blogPostDto.getContent());
        blogPost.setUpdatedAt(LocalDateTime.now());
        return convertToDto(blogPostRepository.save(blogPost));
    }

    public void deleteBlogPost(Long id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));

        User currentUser = getCurrentUser();
        if (!blogPost.getAuthor().equals(currentUser) && !currentUser.getRole().name().equals("ROLE_ADMIN")) {
            throw new AccessDeniedException("You can only delete your own posts");
        }

        blogPostRepository.delete(blogPost);
    }

    private BlogPostDto convertToDto(BlogPost blogPost) {
        return BlogPostDto.builder()
                .id(blogPost.getId())
                .title(blogPost.getTitle())
                .content(blogPost.getContent())
                .authorUsername(blogPost.getAuthor().getUsername())
                .createdAt(blogPost.getCreatedAt())
                .updatedAt(blogPost.getUpdatedAt())
                .build();
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}