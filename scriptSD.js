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
  parameterKeys.term = 'term=' + searchTermInput.val();
  let limitKey = '&limit=' + parameterKeys.limit;
  let queryURL = '';

  getMovieTVShow(isMovie, isTVShow);
  queryURL = iTunesBaseQueryURL + parameterKeys.term + mediaKey + limitKey;
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    console.log(response);
  });

  function getMovieTVShow(isMovie, isTVShow) {
    let notValid = $('.not-valid');
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
    } else if (isTVShow) {
      let mediaValue = '&media=' + mediaValueTVShow;
      mediaKey = mediaValue; 
    } else {
      notValid.css('color', 'red');
      notValid.attr('class', 'not-valid');
      mediaKey = '';
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
};

function resetParameterKeys() {
  parameterKeys.term = '';
  parameterKeys.country = 'au';
  parameterKeys.limit = 25;
  parameterKeys.lang = 'en_au';
  parameterKeys.version = 2;
};


/* Sample iTunes response
var iTunesResponse = {
  "resultCount":2,
  "results": [
    {
      "wrapperType":"track", 
      "kind":"feature-movie", 
      "collectionId":1404489349, 
      "trackId":1078111961, 
      "artistName":"Tim Miller", 
      "collectionName":"Deadpool 2-Movie Collection", 
      "trackName":"Deadpool", 
      "collectionCensoredName":"Deadpool 2-Movie Collection", 
      "trackCensoredName":"Deadpool", 
      "collectionArtistId":345346894, 
      "collectionArtistViewUrl":"https://itunes.apple.com/us/artist/20th-century-fox-film/345346894?uo=4", 
      "collectionViewUrl":"https://itunes.apple.com/us/movie/deadpool/id1078111961?uo=4", 
      "trackViewUrl":"https://itunes.apple.com/us/movie/deadpool/id1078111961?uo=4", 
      "previewUrl":"https://video-ssl.itunes.apple.com/itunes-assets/Video118/v4/ee/77/0b/ee770b8b-dc3b-423a-c695-fab7f47d5b0c/mzvf_6207691253036919622.640x354.h264lc.U.p.m4v", 
      "artworkUrl30":"https://is3-ssl.mzstatic.com/image/thumb/Video4/v4/69/97/72/69977202-baa8-227d-26eb-18eddcc6c3f2/source/30x30bb.jpg", 
      "artworkUrl60":"https://is3-ssl.mzstatic.com/image/thumb/Video4/v4/69/97/72/69977202-baa8-227d-26eb-18eddcc6c3f2/source/60x60bb.jpg", 
      "artworkUrl100":"https://is3-ssl.mzstatic.com/image/thumb/Video4/v4/69/97/72/69977202-baa8-227d-26eb-18eddcc6c3f2/source/100x100bb.jpg", 
      "collectionPrice":29.99, 
      "trackPrice":14.99, 
      "trackRentalPrice":3.99000, 
      "collectionHdPrice":29.99000, 
      "trackHdPrice":14.99000, 
      "trackHdRentalPrice":3.99000, "releaseDate":"2016-02-12T08:00:00Z", 
      "collectionExplicitness":"notExplicit", 
      "trackExplicitness":"notExplicit", 
      "discCount":1, 
      "discNumber":1, 
      "trackCount":2, 
      "trackNumber":1, 
      "trackTimeMillis":6521638, 
      "country":"USA", 
      "currency":"USD", 
      "primaryGenreName":"Action & Adventure", "contentAdvisoryRating":"R", 
      "shortDescription":"Based upon Marvel Comics’ most unconventional anti-hero, DEADPOOL tells the origin story of former", 
      "longDescription":"Hold onto your chimichangas, folks. From the studio that brought you all 3 Taken films comes the block-busting, fourth-wall-breaking masterpiece about Marvel Comics’ sexiest anti-hero! Starring God’s perfect idiot Ryan Reynolds and a bunch of other \"actors,\" DEADPOOL is a giddy slice of awesomeness packed with more twists than Deadpool’s enemies’ intestines and more action than prom night. Amazeballs!", 
      "hasITunesExtras":true
    }, 
    {
      "wrapperType":"track", 
      "kind":"song", 
      "artistId":348127220, 
      "collectionId":1098297339, 
      "trackId":1098298400, 
      "artistName":"Teamheadkick", 
      "collectionName":"Deadpool (Original Motion Picture Soundtrack)", 
      "trackName":"Deadpool Rap (Film Mix)", "collectionCensoredName":"Deadpool (Original Motion Picture Soundtrack)", 
      "trackCensoredName":"Deadpool Rap (Film Mix)", "collectionArtistId":4091312, 
      "collectionArtistName":"Junkie XL", 
      "collectionArtistViewUrl":"https://music.apple.com/us/artist/junkie-xl/4091312?uo=4", 
      "artistViewUrl":"https://music.apple.com/us/artist/teamheadkick/348127220?uo=4", 
      "collectionViewUrl":"https://music.apple.com/us/album/deadpool-rap-film-mix/1098297339?i=1098298400&uo=4", 
      "trackViewUrl":"https://music.apple.com/us/album/deadpool-rap-film-mix/1098297339?i=1098298400&uo=4", 
      "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview18/v4/92/60/5e/92605e35-544e-d941-7444-df01a8d6052d/mzaf_4860065902071291787.plus.aac.p.m4a", 
      "artworkUrl30":"https://is4-ssl.mzstatic.com/image/thumb/Music49/v4/21/a3/b7/21a3b7b5-fe1e-e7f4-0ba5-16c2f92bb948/source/30x30bb.jpg", 
      "artworkUrl60":"https://is4-ssl.mzstatic.com/image/thumb/Music49/v4/21/a3/b7/21a3b7b5-fe1e-e7f4-0ba5-16c2f92bb948/source/60x60bb.jpg", 
      "artworkUrl100":"https://is4-ssl.mzstatic.com/image/thumb/Music49/v4/21/a3/b7/21a3b7b5-fe1e-e7f4-0ba5-16c2f92bb948/source/100x100bb.jpg", 
      "collectionPrice":9.99, 
      "trackPrice":1.29, 
      "releaseDate":"2016-02-12T12:00:00Z", 
      "collectionExplicitness":"explicit", 
      "trackExplicitness":"explicit", 
      "discCount":1, 
      "discNumber":1, 
      "trackCount":23, 
      "trackNumber":12, 
      "trackTimeMillis":205577, 
      "country":"USA", 
      "currency":"USD", 
      "primaryGenreName":"Soundtrack", 
      "contentAdvisoryRating":"Explicit", 
      "isStreamable":true
    }
  ]
};
*/