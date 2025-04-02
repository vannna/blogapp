package com.example.backend.service;

import com.example.backend.dto.LikeDto;
import com.example.backend.entity.BlogPost;
import com.example.backend.entity.Like;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.BlogPostRepository;
import com.example.backend.repository.LikeRepository;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeService {
    private final LikeRepository likeRepository;
    private final BlogPostRepository blogPostRepository;
    private final UserRepository userRepository;

    public LikeDto createLike(Long blogPostId) {
        User currentUser = getCurrentUser();
        BlogPost blogPost = blogPostRepository.findById(blogPostId)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found"));
        Like like = Like.builder()
                .author(currentUser)
                .blogPost(blogPost)
                .build();
        return convertToDto(likeRepository.save(like));
    }

    public List<LikeDto> getLikesByBlogPostId(Long blogPostId) {
        if (!blogPostRepository.existsById(blogPostId)) {
            throw new ResourceNotFoundException("Blog post not found with id: " + blogPostId);
        }
        return likeRepository.findByBlogPostId(blogPostId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private LikeDto convertToDto(Like like) {
        return LikeDto.builder()
                .id(like.getId())
                .authorUsername(like.getAuthor().getUsername())
                .createdAt(like.getCreatedAt())
                .build();
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public void deleteLike(Long postId, Long likeId) {
        User currentUser = getCurrentUser();
        Like like = likeRepository.findByIdAndAuthorId(likeId, currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Like not found"));
        if (!like.getBlogPost().getId().equals(postId)) {
            throw new ResourceNotFoundException("Like does not belong to this post");
        }
        likeRepository.delete(like);
    }

    public boolean hasUserLikedPost(Long blogPostId) {
        User currentUser = getCurrentUser();
        return likeRepository.existsByAuthorIdAndBlogPostId(currentUser.getId(), blogPostId);
    }
}