import React from 'react';
import { Link } from 'react-router-dom';

import './SearchResult.css';

export default function SearchResult({ result }) {
    return (
        <article className="result">
            <img alt="SearchResult thumbnail" src={result.thumbnail.source} />
            <div>
                <Link
                    underline="none"
                    to={{ pathname: '/result', search: `id=${result.pageid}&title=${result.title}` }}
                    className="result-title"
                >
                    {result.title}
                </Link>
                <p className="result-description">{result.extract}</p>
            </div>
        </article>
    );
}
