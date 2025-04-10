package com.example.backend.repository;

import com.example.backend.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    boolean existsByAuthorIdAndBlogPostId(Long authorId, Long blogPostId);
    Optional<Like> findByIdAndAuthorId(Long likeId, Long authorId);
    long countByBlogPostId(Long blogPostId);
    void deleteByAuthorIdAndBlogPostId(Long authorId, Long blogPostId);
}