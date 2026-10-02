package com.karunya.blogplatform.service;

import com.karunya.blogplatform.entity.Comment;
import com.karunya.blogplatform.entity.Post;
import com.karunya.blogplatform.entity.User;
import com.karunya.blogplatform.repository.CommentRepository;
import com.karunya.blogplatform.repository.PostRepository;
import com.karunya.blogplatform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentService(
            CommentRepository commentRepository,
            PostRepository postRepository,
            UserRepository userRepository) {

        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // Get all comments for a post
    public List<Comment> getCommentsByPost(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public Comment createComment(Long postId, Long userId, String content) {

    Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found: " + postId));

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userId));

    Comment comment = new Comment();
    comment.setContent(content);
    comment.setPost(post);
    comment.setUser(user);

    return commentRepository.save(comment);
}
    public Comment getCommentById(Long postId, Long commentId) {

    Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found: " + commentId));

    if (comment.getPost() == null ||
            !comment.getPost().getId().equals(postId)) {
        throw new RuntimeException(
                "Comment " + commentId + " does not belong to post " + postId
        );
    }

    return comment;
}
// Update a comment
public Comment updateComment(Long postId, Long commentId, String content) {

    Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() ->
                    new RuntimeException("Comment not found: " + commentId));

    // Make sure the comment belongs to the requested post
    if (comment.getPost() == null ||
            !comment.getPost().getId().equals(postId)) {

        throw new RuntimeException(
                "Comment " + commentId +
                " does not belong to post " + postId
        );
    }

    comment.setContent(content);

    return commentRepository.save(comment);
}

    // Delete a comment
    public boolean deleteComment(Long commentId) {

        if (!commentRepository.existsById(commentId)) {
            return false;
        }

        commentRepository.deleteById(commentId);
        return true;
    }
}