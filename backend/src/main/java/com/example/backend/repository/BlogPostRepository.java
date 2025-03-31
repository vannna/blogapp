package com.example.backend.repository;

import com.example.backend.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByAuthorId(Long authorId);
    List<BlogPost> findAllByOrderByCreatedAtDesc();
}