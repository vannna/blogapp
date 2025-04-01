package com.example.backend.repository;

import com.example.backend.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByBlogPostId(Long blogPostId);
    boolean existsByAuthorIdAndBlogPostId(Long authorId, Long blogPostId);
    Optional<Like> findByAuthorIdAndBlogPostId(Long authorId, Long blogPostId);
    void deleteByAuthorIdAndBlogPostId(Long authorId, Long blogPostId);
    long countByBlogPostId(Long blogPostId);
}