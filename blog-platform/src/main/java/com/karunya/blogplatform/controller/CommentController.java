package com.karunya.blogplatform.controller;

import com.karunya.blogplatform.dto.CommentRequest;
import com.karunya.blogplatform.entity.Comment;
import com.karunya.blogplatform.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // GET all comments for a post
    @GetMapping("/posts/{postId}/comments")
    public List<Map<String, Object>> getComments(
            @PathVariable Long postId) {

        return commentService.getCommentsByPost(postId)
                .stream()
                .map(this::commentResponse)
                .collect(Collectors.toList());
    }

    // GET one comment
    @GetMapping("/posts/{postId}/comments/{commentId}")
    public Map<String, Object> getComment(
            @PathVariable Long postId,
            @PathVariable Long commentId) {

        Comment comment =
                commentService.getCommentById(postId, commentId);

        return commentResponse(comment);
    }

    // CREATE comment
    @PostMapping("/posts/{postId}/comments/{userId}")
    public Map<String, Object> createComment(
            @PathVariable Long postId,
            @PathVariable Long userId,
            @RequestBody CommentRequest request) {

        Comment comment = commentService.createComment(
                postId,
                userId,
                request.getContent()
        );

        return commentResponse(comment);
    }
    // UPDATE comment
@PutMapping("/posts/{postId}/comments/{commentId}")
public Map<String, Object> updateComment(
        @PathVariable Long postId,
        @PathVariable Long commentId,
        @RequestBody CommentRequest request) {

    Comment comment = commentService.updateComment(
            postId,
            commentId,
            request.getContent()
    );

    return commentResponse(comment);
}

    // DELETE comment
    @DeleteMapping("/comments/{commentId}")
    public String deleteComment(@PathVariable Long commentId) {

        boolean deleted = commentService.deleteComment(commentId);

        if (!deleted) {
            return "Comment not found";
        }

        return "Comment deleted successfully";
    }

    // Convert Comment entity to simple JSON
    private Map<String, Object> commentResponse(Comment comment) {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("id", comment.getId());
        response.put("content", comment.getContent());

        if (comment.getPost() != null) {
            response.put("postId", comment.getPost().getId());
        }

        if (comment.getUser() != null) {
            response.put("userId", comment.getUser().getId());
        }

        return response;
    }
}