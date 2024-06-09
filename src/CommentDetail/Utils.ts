import { Comment, DownvoteComment, UpvoteComment, User } from "../InterfacesDatabase";

export interface CommentDetail extends Comment {
    Replies: CommentDetail[];
    Upvotes: UpvoteComment[];
    Downvotes: DownvoteComment[];
    User: User;
}

export function nestComments(comments: CommentDetail[]): CommentDetail[] {
    const commentMap: { [commentId: string]: CommentDetail } = {};

    // Create a map from commentId to comment object
    comments.forEach((comment) => {
        commentMap[comment.CommentId] = comment;
    });

    // Create the nested structure
    const nestedComments: CommentDetail[] = [];
    comments.forEach((comment) => {
        if (
            comment.ParentCommentId === null ||
            comment.ParentCommentId === ""
        ) {
            nestedComments.push(comment);
        } else {
            const parentComment = commentMap[comment.ParentCommentId];
            if (parentComment) {
                parentComment.Replies.push(comment);
            }
        }
    });

    return nestedComments;
}
