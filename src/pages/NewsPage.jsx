import React from 'react';

export function NewsPage() {
    return (
        <div>
            <h1>News Page</h1>
            <p>News content: {props.newsContent}</p>
        </div>
    );
}