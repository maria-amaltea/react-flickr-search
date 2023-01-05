//Flickr API
const imageSearch  = (query, page) => {
    
    const options = [
      "method=flickr.photos.search",
      "api_key=1fd00dc5130478b5badd34f81e182bb0",
      "nojsoncallback=1",
      "format=json",
      "extras=url_m",
      "per_page=12",
      `tags=${query}`,
      `page=${page}`,
    ];

   
    return (
      fetch(`https://api.flickr.com/services/rest/?${options.join("&")}`)
        .then(res => res.json())
        .then(data =>
            new Promise(resolve => {
                resolve(data);
            })
        )
        .then(data => data.photos
        )

    );
  };
export default imageSearch;