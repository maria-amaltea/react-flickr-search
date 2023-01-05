const pagination  = (props) => {

  let numbers = (page, pageCounter) => {

    let content = [];
    for (let i = pageCounter - 10; i < pageCounter; i++) {
      content.push(<li key={i} 
        className={i == page? "selected": "number"}
        onClick={()=> props.updateSearchQuery(props.query, i)}>{i}</li>);
    }
    return content;

  }

   
    return (
      <div className="pagination-container">
        <ul className="pagination">
        {props.pageCounter > 11 ? <li onClick={()=> props.updatePaginationDecrease(props.pageCounter)}>Prev</li>: null}
        {numbers(props.page, props.pageCounter)}
          <li onClick={()=> props.updatePaginationIncrease(props.pageCounter)}>Next</li>
        </ul>
      </div>
    )
  };
export default pagination;