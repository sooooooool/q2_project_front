import React from 'react';

interface Comment {
    id: number;
    text: string;
}

interface CommentListProps {
    comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
            ))}
        </div>
    );
};

export default CommentList;