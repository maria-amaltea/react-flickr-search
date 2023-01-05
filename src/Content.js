
const Content = ({ state }) => {
    if (!state.query && !state.fetching) {
      return null
    }
    if (state.fetching) {
      return <div><p>Searching for images of {state.query}...</p></div>
    }
    if (state.results.length) {
      return (
        <div><p>We've found a total of {state.totalResults} results for keyword/s {state.query}</p>
        <ul className="results">
          {state.results.map(result => (
            <li key={result.id}>
             <a href={result.url}> <img alt={result.title} src={result.url} /></a>
            </li>
          ))}
        </ul>
        </div>

      )
    }
  }

  export default Content;