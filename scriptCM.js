/* Refer to iTunes Search API 
https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
*/

// The following object defines the parameter keys and values you can specify to search for content within the iTunes Store or Apple Books Store
parameterKeys = {
    term: '', // Required
    country: 'au', // Required
    media: ['movie', 'podcast', 'music', 'musicVideo', 'audiobook', 'shortFilm', 'tvShow', 'software', 'ebook', 'all'],
    entity: { // The following entities are available for each media type:
      movie: ['movieArtist', 'movie'],
      podcast: ['podcastAuthor', 'podcast'],
      music: ['musicArtist', 'musicTrack', 'album', 'musicVideo', 'mix', 'song'], // Please note that “musicTrack” can include both songs and music videos in the results
      musicVideo: ['musicArtist', 'musicVideo'],
      audiobook: ['audiobookAuthor', 'audiobook'],
      shortFilm: ['shortFilmArtist', 'shortFilm'],
      tvShow: ['tvEpisode', 'tvSeason'],
      software: ['software', 'iPadSoftware', 'macSoftware'],
      ebook: 'ebook',
      all: ['movie', 'album', 'allArtist', 'podcast', 'musicVideo', 'mix', 'audiobook', 'tvSeason', 'allTrack'],
    },
    attribute: { // The following attributes are available for each media type:
      movie: ['actorTerm', 'genreIndex', 'artistTerm', 'shortFilmTerm', 'producerTerm', 'ratingTerm', 'directorTerm', 'releaseYearTerm', 'featureFilmTerm', 'movieArtistTerm', 'movieTerm', 'ratingIndex', 'descriptionTerm'],
      podcast: ['titleTerm', 'languageTerm', 'authorTerm', 'genreIndex', 'artistTerm', 'ratingIndex', 'keywordsTerm', 'descriptionTerm'],
      music: ['mixTerm', 'genreIndex', 'artistTerm', 'composerTerm', 'albumTerm', 'ratingIndex', 'songTerm'],
      musicVideo: ['genreIndex', 'artistTerm', 'albumTerm', 'ratingIndex', 'songTerm'],
      audiobook: ['titleTerm', 'authorTerm', 'genreIndex', 'ratingIndex'],
      shortFilm: ['genreIndex', 'artistTerm', 'shortFilmTerm', 'ratingIndex', 'descriptionTerm'],
      software: ['softwareDeveloper'],
      tvShow: ['genreIndex', 'tvEpisodeTerm', 'showTerm', 'tvSeasonTerm', 'ratingIndex', 'descriptionTerm'],
      all: ['actorTerm', 'languageTerm', 'allArtistTerm', 'tvEpisodeTerm', 'shortFilmTerm', 'directorTerm', 'releaseYearTerm', 'titleTerm', 'featureFilmTerm', 'ratingIndex', 'keywordsTerm', 'descriptionTerm', 'authorTerm', 'genreIndex', 'mixTerm', 'allTrackTerm', 'artistTerm', 'composerTerm', 'tvSeasonTerm', 'producerTerm', 'ratingTerm', 'songTerm', 'movieArtistTerm', 'showTerm', 'movieTerm', 'albumTerm']
    },
    callback: 'wsSearchCB', // Required for cross-site searches. The name of the Javascript callback function you want to use when returning search results to your website. For example: wsSearchCB.
    limit: 25, // The number of search results you want the iTunes Store to return. For example: 25.The default is 50.
    lang: 'en_au',
    version: 2, // The search result key version you want to receive back from your search.The default is 2.
    explicit: ['Yes', 'No'] // A flag indicating whether or not you want to include explicit content in your search results.The default is Yes.
  };
  
  var baseQueryURL = 'https://itunes.apple.com/search?';
  var termKey = 'term=';
  var countryKey = '&country=' + parameterKeys.country;
  var genreKey = '&genre=';
  var authorKey = '&artistName=' + author;
  var limit = parameterKeys.limit
  var limitKey = '&limit=' + limit;
  var mediaKey = "&media=ebook";


$('.search').on('submit', (event) => {
    event.preventDefault();
  
    $(".results").empty();

    var genre = $('#genre').val();
  
    var author = $('#author').val(); 

    if ($("#author").val() === ""){
      $.ajax({
        url: baseQueryURL + termKey + genre + countryKey + genreKey + genre + mediaKey + limitKey,
        method: "GET"
      }).then(function(responseString) {
        console.log(responseString)
        var response = JSON.parse(responseString);
        
        console.log(response)
  
        for (i=0;i<limit;i++){
          var li = $('<li>');
          li.attr("class", "media");
  
          var img = $("<img>");
          img.attr("class", "mr-3");
          img.attr("scr", response.results[i].artworkUrl60);
          img.attr("alt", "book cover")
  
          var div = $("<div>")
          div.attr("class", "media-body")
  
          var title = $("<h5>" + response.results[i].trackName + "</h5>")
          var artist = $("<p>" + "Author: " + response.results[i].artistName + "</p>")
          var blurb = $("<p>" + response.results[i].description + "</p>")
  
          div.append(title + artist + "<br>" + blurb)
          li.append(img + div)
          $(".results").append(li)
  
        }
      });
    }

    else {
      $.ajax({
        url: baseQueryURL + termKey + genre + countryKey + genreKey + genre + authorKey + author + mediaKey + limitKey,
        method: "GET"
      }).then(function(responseString) {
        console.log(responseString)
        var response = JSON.parse(responseString);
        
        console.log(response)
  
        for (i=0;i<limit;i++){
            var li = $('<li>');
            li.attr("class", "media");
  
            var img = $("<img>");
            img.attr("class", "mr-3");
            img.attr("scr", response.results[i].artworkUrl60);
            img.attr("alt", "book cover")
  
            var div = $("<div>")
            div.attr("class", "media-body")
  
            var title = $("<h5>" + response.results[i].trackName + "</h5>")
            var artist = $("<p>" + "Author: " + response.results[i].artistName + "</p>")
            var blurb = $("<p>" + response.results[i].description + "</p>")
  
            div.append(title + artist + "<br>" + blurb)
            li.append(img + div)
            $(".results").append(li)
  
          }
      });
    }
    
  });
