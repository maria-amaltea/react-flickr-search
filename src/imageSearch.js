//Flickr API
const imageSearch  = (query, page) => {
    
    const options = [
      "method=flickr.photos.search",
      "api_key=d94a61c8c366c06a9dd8ac877f382f68",
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