import React, { Component } from 'react';
import Content from './Content';
import './App.css';
import Pagination from './Pagination';
import imageSearch from "./imageSearch";

class App extends Component {
  constructor(props) {
    super(props)
    const store = props.store
    
    // grab the initial state
    this.state = store.getState()

    // subscribe to the redux store to listen for changes
    store.subscribe(() => {
      // set the result to component state
      this.setState(store.getState())
    })

    this.updateSearchQuery = this.updateSearchQuery.bind(this)
    this.updatePaginationIncrease = this.updatePaginationIncrease.bind(this)
    this.updatePaginationDecrease = this.updatePaginationDecrease.bind(this)
  }

  
  //this function retrieves the keyword/s that the user entered and sends them to Flicker API to retrieve results
  updateSearchQuery(query, page) {
    
    const store = this.props.store
    
    //user pressed search button so we dispatch the action and retrieve the query as payload
    store.dispatch({ type: 'IMAGE_SEARCH_STARTED', payload: query })
    

    // dispatch the action once the results have been retrieved and include them in the payload
    imageSearch(query, page).then(results => {
      store.dispatch({ type: 'IMAGE_SEARCH_FINISHED', payload: results, })
    })
  }

  //the following functions update the numbers sets in pagination when user presses next or prev
  updatePaginationIncrease(paginationCounter) {
    
    const store = this.props.store
    store.dispatch({ type: 'PAGINATION_INCREASE_SET', payload: paginationCounter + 10 })
  }

  updatePaginationDecrease(paginationCounter) {
    const store = this.props.store
    store.dispatch({ type: 'PAGINATION_INCREASE_SET', payload: paginationCounter - 10 })
  }


  render() {
    console.log(this.props.store.getState())
    return(
      <div className="container">
        <div className="logo-container">
        <svg viewBox="0 0 960 300">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="80%">Find</text>
          </symbol>

          <g class = "g-ants">
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
          </g>
        </svg>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          const query = e.target[0].value;
          e.target[0].value = "";
          this.updateSearchQuery(query, this.state.page);
        }}
      >
       
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>
      <Content state={ this.props.store.getState()} updateSearchQuery={this.updateSearchQuery}  />
      {this.state.results.length ? 
      <Pagination page={this.state.page} 
      query={this.state.query} 
      pageCounter={this.state.pageCounter} 
      updateSearchQuery={this.updateSearchQuery} 
      updatePaginationIncrease={this.updatePaginationIncrease}
      updatePaginationDecrease = {this.updatePaginationDecrease} />:null}
     
    </div>

    
  );
  }
}

export default App;
