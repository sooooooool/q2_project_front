import React, { useState } from 'react';

const CommentForm = () => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 여기에 댓글을 제출하는 로직을 작성하세요
        console.log('댓글 제출:', comment);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={comment} onChange={handleCommentChange} />
            <button type="submit">댓글 작성</button>
        </form>
    );
};

export default CommentForm;