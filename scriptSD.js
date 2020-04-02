/* Refer to iTunes Search API 
https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
*/

const iTunesBaseQueryURL = 'https://itunes.apple.com/search?';

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
  limit: 5, // The number of search results you want the iTunes Store to return. For example: 25.The default is 50.
  lang: 'en_au',
  version: 2, // The search result key version you want to receive back from your search.The default is 2.
  explicit: ['Yes', 'No'] // A flag indicating whether or not you want to include explicit content in your search results.The default is Yes.
};

// ****** TO WATCH PAGE ****** // 
const checkboxMovie = $('#movie');
const checkboxTV = $('#tvShows');
const searchTermInput = $('#search-term')
const searchResultsH1 = $('.results-heading');
const resultsUlEl = $('.results-list');
// const checkboxRatedG = $('#rated-g');
// const checkboxRatedPG = $('#rated-pg');
// const checkboxRatedM = $('#rated-m');
// const checkboxRatedMA15 = $('#rated-ma15');
// const checkboxRatedR18 = $('#rated-r18');
// const checkboxAllRatings = $('#all-ratings');
// const actorsInput = $('#actors');
// const directorsInput = $('#directors');


$('#search').on('click', (event) => {
  event.preventDefault();
  
  let isMovie = checkboxMovie[0].checked;
  let isTVShow = checkboxTV[0].checked;
  let notValid = $('.not-valid');
  parameterKeys.term = 'term=' + searchTermInput.val();
  let limitKey = '&limit=' + parameterKeys.limit;
  let countryKey = '&country=' + parameterKeys.country;
  let queryURL = '';

  // Form validation
  if (isMovie == false && isTVShow == false) {
    notValid.css('color', 'red');
    notValid.attr('class', 'not-valid');
    mediaKey = '';
  } else {
    getMovieTVShow(isMovie, isTVShow);
    queryURL = iTunesBaseQueryURL + parameterKeys.term +countryKey + mediaKey + limitKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(responseString) {
      searchResultsH1.attr('hidden', false);
  
      let response = JSON.parse(responseString);
      let resultCount = response.resultCount;
      let resultsArray = response.results;

      console.log(resultsArray.length); // Passed
      
      for (let i = 0; i < resultsArray.length; i++) {
        // API response data
        let title = resultsArray[i].trackName;
        let thumbnail = resultsArray[i].artworkUrl60;
        let releaseDate = resultsArray[i].releaseDate;
        let releaseYear = releaseDate.slice(0, 4);
        let shortDescription = resultsArray[i].shortDescription;
        let longDescription = resultsArray[i].longDescription;
        let previewURL = resultsArray[i].previewUrl;
        // HTML elements to render results
        let resultsLiEl = $('<li class="media mb-4">');
        let imageEl = $('<img class="mr-3">');
        let mediaBodyXSDiv = $('<div class="media-body d-md-none">');
        let mediaBodyMDDiv = $('<div class="media-body d-none d-md-block">');
        let h5ElXS = $('<h5 class="mt-0 mb-1">');
        let h5ElMD = $('<h5 class="mt-0 mb-1">');
        let previewDiv = $('<div class="preview d-none d-md-block my-2">');
        let videoEl = $('<video>');
        // Build list items
        videoEl
          .attr('src', previewURL)
          .attr('controls', true);
        previewDiv.append(videoEl);
        h5ElXS.text(title + ' (' + releaseYear + ')');
        h5ElMD.text(title + ' (' + releaseYear + ')');
        mediaBodyXSDiv
          .text(shortDescription)
          .prepend(h5ElXS);
        mediaBodyMDDiv
          .text(longDescription)
          .prepend(h5ElMD)
          .append(previewDiv);
        imageEl.attr('src', thumbnail);
        resultsLiEl
          .append(imageEl)
          .append(mediaBodyXSDiv)
          .append(mediaBodyMDDiv);
        resultsUlEl.append(resultsLiEl);
      };
      console.log(response);
    });
  };


  function getMovieTVShow(isMovie, isTVShow) {
    let mediaValueMovie = parameterKeys.media[0];
    let mediaValueTVShow = parameterKeys.media[6];

    if (isMovie && isTVShow) {
      let mediaValue = '&media=' + mediaValueMovie + '&media=' + mediaValueTVShow;
      mediaKey = mediaValue;
      notValid.attr('class', 'd-none not-valid');
    } else if (isMovie) {
      let mediaValue = '&media=' + mediaValueMovie;
      mediaKey = mediaValue;
      notValid.attr('class', 'd-none not-valid');
    } else {
      let mediaValue = '&media=' + mediaValueTVShow;
      mediaKey = mediaValue;
    };
  };
});


$('#clear-results').on('click', () => {
  clearForm();
  resetParameterKeys();
});

function clearForm() {
  checkboxMovie[0].checked = false;
  checkboxTV[0].checked = false;
  searchTermInput.val('');
  searchResultsH1.attr('hidden', true);
  resultsUlEl.empty();
};

function resetParameterKeys() {
  parameterKeys.term = '';
  parameterKeys.country = 'au';
  parameterKeys.limit = 25;
  parameterKeys.lang = 'en_au';
  parameterKeys.version = 2;
};
