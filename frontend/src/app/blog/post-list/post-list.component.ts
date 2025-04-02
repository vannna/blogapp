import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  standalone: true,
  imports: [ CommonModule, RouterModule]
})
export class PostListComponent implements OnInit {
  posts: BlogPost[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getAllPosts().subscribe(posts => this.posts = posts);
  }
}
