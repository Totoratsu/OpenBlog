import React from 'react'

import { Post } from '../types';

const PostCard = ({ item }: { item: Post }) => {
    return (
        <div>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.author.username}</p>
        </div>
    )
}

export default PostCard;
