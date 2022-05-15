import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

import './SearchResult.css';

export default function SearchResult({ result }) {

    const {setCurrentId, setCurrentTitle} =  useContext(AuthContext)

    function saveResult(id,title){
        setCurrentId(id)
        setCurrentTitle(title)
    }
    return (
        <article className="result">
            <img alt="SearchResult thumbnail" src={result.thumbnail.source} />
            <div>
                <Link
                    underline="none"
                    to={{ pathname: '/result', search: `id=${result.pageid}&title=${result.title}` }}
                    className="result-title"
                    onClick={()=>saveResult(result.pageid,result.title)}
                >
                    {result.title}
                </Link>
                <p className="result-description">{result.extract}</p>
            </div>
        </article>
    );
}
