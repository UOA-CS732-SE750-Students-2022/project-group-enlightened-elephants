import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import './SearchBar.css';
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ setResults, setLoading }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useLocalStorage('history', []);

  const param = input.replace(/\s+/g, "/");
  const wiki_api = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=
              ${param.trim()}
              &gsrlimit=20&prop=pageimages|extracts&exchars=200&exintro&explaintext&exlimit=max&format=json&origin=*`;

  function search(e) {
    e.preventDefault();
    const results = [];

    if (input.length < 1) {
      return;
    }

    const value = input.trim();
    if (!history || !(history instanceof Array)) setHistory([]);
    history.forEach((item, index) => {
      if (item === value) history.splice(index, 1);
    })
    if (history.length >= 10) history.splice(0, 1);
    setHistory([...history, value])

    setLoading(true);

    // Grab results from wiki API
    fetch(wiki_api, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        if (data.hasOwnProperty("query")) {
          // eslint-disable-next-line
          for (const [key, value] of Object.entries(data.query.pages)) {
            if (value.hasOwnProperty("thumbnail")) {
              results.push(value);
            }
          }
        }

        setResults(results);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }

  return (
    <form className="searchbar-container">
      <input
        type="text"
        className="searchbar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="search" onClick={(e) => search(e)} type="submit">
        <SearchIcon color="primary" fontSize="large" />
      </button>
    </form>
  );
}
