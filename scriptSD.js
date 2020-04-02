/* Refer to iTunes Search API 
https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
*/

const CORSAnywhereURL = 'https://cors-anywhere.herokuapp.com/';
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
  limit: 10, // The number of search results you want the iTunes Store to return. For example: 25.The default is 50.
  lang: 'en_au',
  version: 2, // The search result key version you want to receive back from your search.The default is 2.
  explicit: ['Yes', 'No'] // A flag indicating whether or not you want to include explicit content in your search results.The default is Yes.
};

// ****** TO WATCH PAGE ****** // 
const checkboxMovie = $('#movie');
const checkboxTV = $('#tvShows');
const notValidMovieTv = $('#movie-tv-not-valid');
const searchTermInput = $('#search-term');
const notValidSearchInput = $('#search-term-not-valid');
const searchResultsH1 = $('.results-heading');
const resultsUlEl = $('.results-list');

// Search event
$('#search').on('click', (event) => {
  event.preventDefault();
  resetForm();

  let isMovie = checkboxMovie[0].checked;
  let isTVShow = checkboxTV[0].checked;
  let searchTermValue = searchTermInput.val();
  let formattedSearchTerm = searchTermValue.replace(/ /g, '+');
  let limitKey = '&limit=' + parameterKeys.limit;
  let countryKey = '&country=' + parameterKeys.country;
  let queryURL = '';
  
  parameterKeys.term = 'term=' + formattedSearchTerm;

  // Form validation
  if (isMovie == false && isTVShow == false && parameterKeys.term == 'term=') {
    notValidMovieTv
      .css('color', 'red')
      .attr('class', 'not-valid');
    notValidSearchInput
      .css('color', 'red')
      .attr('class', 'not-valid');
    mediaKey = '';
  } 
  else if (isMovie == false && isTVShow == false) {
    notValidMovieTv
      .css('color', 'red')
      .attr('class', 'not-valid');
    mediaKey = '';
  } 
  else if (parameterKeys.term == 'term=') {
    notValidSearchInput
      .css('color', 'red')
      .attr('class', 'not-valid');
    mediaKey = '';
  } 
  else {
    getMovieTVShow(isMovie, isTVShow);
    buildQueryURL(isMovie, isTVShow);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(responseString) {
      searchResultsH1.attr('hidden', false);
  
      let response = JSON.parse(responseString);
      let resultsArray = response.results;
      let resultCount = response.resultCount;

      // Result count validation before entering for loop
      if (resultCount == 0) {
        let noResultsDiv = $('<div class="no-results-returned">');
        noResultsDiv.text('No matches found. Please try again.');
        $('.results').append(noResultsDiv);
      } 
      else {
        $('no-results-returned').empty();
        for (let i = 0; i < resultCount; i++) {
          // API response data (general)
          let thumbnail = resultsArray[i].artworkUrl100;
          let advisoryRating = resultsArray[i].contentAdvisoryRating;
          let releaseDate = resultsArray[i].releaseDate;
          let releaseYear = releaseDate.slice(0, 4);
          let longDescription = resultsArray[i].longDescription;
          // API response data (for movies)
          let mediaType = resultsArray[i].kind;
          let title = resultsArray[i].trackName;
          let trackViewURL = resultsArray[i].trackViewUrl;
          let trackPrice = resultsArray[i].trackPrice;
          let trackRentalPrice = resultsArray[i].trackRentalPrice;
          let shortDescription = resultsArray[i].shortDescription;
          let previewURL = resultsArray[i].previewUrl;
          // API response data (for shows)
          let collectionType = resultsArray[i].collectionType; 
          let collectionName = resultsArray[i].collectionName;
          let collectionViewURL = resultsArray[i].collectionViewUrl;
          let collectionPrice = resultsArray[i].collectionPrice;

          // HTML elements to render results
          let resultsLiEl = $('<li class="media mb-4">');
          let imageEl = $('<img class="mr-3">');
          let mediaBodyDiv = $('<div class="media-body">');
          let h5El = $('<h5 class="mt-0 mb-1">');
          let aEl = $('<a>');
          let pElXS = $('<p class="d-md-none">');
          let pElMD = $('<p class="d-none d-md-block">');
          let trackInfoDiv = $('<div class="track-info font-weight-bold">');
          let ratingSpan = $('<span class="advisory-rating mr-3">');
          let priceSpan = $('<span class="to-buy-price mr-3">');
          let rentSpan = $('<span class="to-rent-price mr-3">');
          let releaseYearSpan = $('<span class="release-year">');
          let previewDiv = $('<div class="preview d-none d-md-block my-2">');
          let videoEl = $('<video>');
  
          // Build list items
          if (mediaType == 'feature-movie') {
            videoEl
              .attr('src', previewURL)
              .attr('controls', true);
            previewDiv.append(videoEl);
            aEl
              .attr('href', trackViewURL)
              .attr('target', '_blank')
              .text(title);
            h5El.append(aEl);
            ratingSpan.text('Rating: ' + advisoryRating);
            priceSpan.text('Buy: $' + trackPrice);
            rentSpan.text('Rent: $' + trackRentalPrice);
            releaseYearSpan.text('Released: ' + releaseYear);
            trackInfoDiv
              .append(ratingSpan)
              .append(priceSpan)
              .append(rentSpan)
              .append(releaseYearSpan);
            pElXS.text(shortDescription);
            pElMD.text(longDescription);
            mediaBodyDiv
              .append(h5El)
              .append(trackInfoDiv)
              .append(pElXS)
              .append(pElMD)
              .append(previewDiv);
            imageEl.attr('src', thumbnail);
            resultsLiEl
              .append(imageEl)
              .append(mediaBodyDiv);
            resultsUlEl.append(resultsLiEl);
          }
          else if (collectionType == 'TV Season') {
            aEl
              .attr('href', collectionViewURL)
              .attr('target', '_blank')
              .text(collectionName);
            h5El.append(aEl);
            ratingSpan.text('Rating: ' + advisoryRating);
            priceSpan.text('Buy: $' + collectionPrice);
            releaseYearSpan.text('Released: ' + releaseYear);
            trackInfoDiv
              .append(ratingSpan)
              .append(priceSpan)
              .append(releaseYearSpan);
            pElMD.text(longDescription);
            mediaBodyDiv
              .append(h5El)
              .append(trackInfoDiv)
              .append(pElMD);
            imageEl.attr('src', thumbnail);
            resultsLiEl
              .append(imageEl)
              .append(mediaBodyDiv);
            resultsUlEl.append(resultsLiEl);;
          };
        };
      };
    });
  };


  function getMovieTVShow(isMovie, isTVShow) {
    let mediaValueMovie = parameterKeys.media[0];
    let mediaValueTVShow = parameterKeys.media[6];
    let entityValueTVShow = parameterKeys.entity.tvShow[1];

    if (isMovie) {
      let mediaValue = '&media=' + mediaValueMovie;
      mediaKey = mediaValue;
      notValidMovieTv.attr('class', 'd-none not-valid');
    } 
    else if (isTVShow) {
      let mediaValue = '&media=' + mediaValueTVShow;
      let entityValue = '&entity=' + entityValueTVShow;
      mediaKey = mediaValue;
      entityKey = entityValue;
    };
  };

  function buildQueryURL(isMovie, isTVShow) {
    if (isMovie) {
      queryURL = CORSAnywhereURL + iTunesBaseQueryURL + parameterKeys.term + countryKey + mediaKey + limitKey;
    } 
    else if (isTVShow) {
      queryURL = CORSAnywhereURL + iTunesBaseQueryURL + parameterKeys.term + countryKey + mediaKey + entityKey + limitKey;
    };
  };
});


// Clear event
$('#clear-results').on('click', () => {
  clearFormInputs();
  resetForm();
  resetParameterKeys();
});

function clearFormInputs() {
  checkboxMovie[0].checked = false;
  checkboxTV[0].checked = false;
  searchTermInput.val('');
};

function resetForm() {
  notValidMovieTv.attr('class', 'd-none not-valid');
  notValidSearchInput.attr('class', 'd-none not-valid');
  searchResultsH1.attr('hidden', true);
  resultsUlEl.empty();
  $('.no-results-returned').empty();
};

function resetParameterKeys() {
  parameterKeys.term = '';
  parameterKeys.country = 'au';
  parameterKeys.limit = 10;
  parameterKeys.lang = 'en_au';
  parameterKeys.version = 2;
};

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  };
};

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
