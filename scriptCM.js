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
  
  const baseQueryURL = 'https://itunes.apple.com/search?';
  let termKey = 'term='
  let countryKey = '&country=' + parameterKeys.country;
  let genreKey = '&genre=' + genre
  let authorKey = '&artistName=' + author
  let limitKey = '&limit=' + parameterKeys.limit
  let mediaKey = "&media=ebook";

  // ****** TO READ PAGE ****** // 

var genreVal = $('#genre').val()
var genre = ""
var authorVal = $('#author').val();
var author = ""

function validate() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  };
  validate()

$('#search').on('click', (event) => {
    event.preventDefault();
  
    getGenre();
  
    console.log(mediaKey);
  
    $.ajax({
      url: 'https://itunes.apple.com/search?term=dora+the+explorer&country=au&media=movie&media=tvShow&limit=2' + termKey + countryKey + mediakey + limitKey,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
  
    function getGenre() {
  
     if (genreVal === "") {
        genre = '';
      }
      else {    
        genre = genreVal
      } 
    };
    function getAuthor() {

    };
  
  });
  
  
  
  function resetParameterKeys() {
    parameterKeys.term = '';
    parameterKeys.country = 'au';
    parameterKeys.limit = 25;
    parameterKeys.lang = 'en_au';
    parameterKeys.version = 2;
  };