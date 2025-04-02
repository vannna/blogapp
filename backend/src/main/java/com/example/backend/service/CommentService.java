package com.example.backend.service;

import com.example.backend.dto.CommentDto;
import com.example.backend.entity.BlogPost;
import com.example.backend.entity.Comment;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.BlogPostRepository;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final BlogPostRepository blogPostRepository;
    private final UserRepository userRepository;

    public CommentDto createComment(Long blogPostId, CommentDto commentDto) {
        User currentUser = getCurrentUser();
        BlogPost blogPost = blogPostRepository.findById(blogPostId)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + blogPostId));

        Comment comment = Comment.builder()
                .content(commentDto.getContent())
                .author(currentUser)
                .blogPost(blogPost)
                .createdAt(LocalDateTime.now())
                .build();

        return convertToDto(commentRepository.save(comment));
    }

    public List<CommentDto> getCommentsByBlogPostId(Long blogPostId) {
        if (!blogPostRepository.existsById(blogPostId)) {
            throw new ResourceNotFoundException("Blog post not found with id: " + blogPostId);
        }
        return commentRepository.findByBlogPostId(blogPostId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CommentDto convertToDto(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .authorUsername(comment.getAuthor().getUsername())
                .createdAt(comment.getCreatedAt())
                .build();
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}