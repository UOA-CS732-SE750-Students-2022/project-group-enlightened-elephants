import * as React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResult from '../components/SearchResult/SearchResult';

export default function Home() {
    const [loading, setLoading] = React.useState(false);
    const [results, setResults] = React.useState(undefined);

    return (
        <div style={{ padding: '10em 0 0 0', textAlign: 'center' }}>
            <div style={{ marginBottom: '12px' }}>
                <span className="App-title" style={{ color: 'black', marginRight: '8px', fontSize: '30px' }}>
                    Enlightened Elephants
                </span>
                <span style={{ lineHeight: '34px', fontSize: '22px' }}>Wikipedia Forum</span>
            </div>

            <main className="page-layout">
                <div className="content-container">
                    <SearchBar setResults={setResults} setLoading={setLoading} />

                    {results && <p className="result-number">Displaying {results.length} results.</p>}

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="results">
                            {results &&
                            results.map((result, index) => {
                                return (
                                    <li key={index}>
                                        <SearchResult result={result} />
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <p className="footer">
                    &lt;&lt; Powered by{" "}
                    <a href="https://en.wikipedia.org/wiki/Main_Page" rel="noreferrer" target="_blank" className="wikipedia">
                        wikipedia
                    </a>{" "}
                    &gt;&gt;
                </p>
            </main>
        </div>
    )
}
