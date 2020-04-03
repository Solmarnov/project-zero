
var apiKey = "39c89d285fcb0941c08ccdc2220bde62bff4e8c3"

var searchURL = `https://www.giantbomb.com/api/search/`

//the request to the giantbomb api, searchTerm and callback is inside watchSubmit()
function queryGB(searchTerm, callback){
	var settings = {
		url: searchURL,
		data: {
			api_key: apiKey,
			query: `"${searchTerm}"`,
			format: "jsonp",
			resources: "game", 
			limit: 20
		},
		/* prevents CORS error */ 
		type: "GET",
		dataType: "jsonp",
		crossDomain: true,
		jsonp: "json_callback",
		success: callback	
	};
	$.ajax(settings)
	console.log(settings);
    console.log(callback)
}

// Was going to use lodash to create a count function to display number of results returned. 
//Not finished
/*
function noCount(data){
   
    if(data.result.name.length > 0){
        console.log("yes")
    } 
}  $(noCount); */ 
//Template literals and expressions. 
function htmlAdd(result){
	return `
	<li class="media">
    	<img src="${result.image.medium_url}" class="mr-3" alt="game cover" style="height: 200px;">
    	<div class="media-body">
			  <a href="${result.site_detail_url}"class="mt-0 mb-1 searchTitle">${result.name}</a>
			  <p>${result.deck}</p>
		</div>
	  </li>
	  <br>
    `
}



//uses .map to populate template above. 
//data.results accesses giant bomb object. 
function displayGame(data){
	var searchResults = data.results.map(htmlAdd);
	 if(searchResults.length>0){
	$(`.results`).html(searchResults);
}
};

//Select form element. 
//.submit event is sent when user clicks 'find game' as button type = submit
function watchSubmit() {
  $('form').submit(function(e) {
      //fixed loading issue with prevent default
	e.preventDefault();
	$(".results-heading").attr('hidden', false);
    var queryTarget = $(e.currentTarget).find('#searchBar');
    var query = queryTarget.val();
    queryTarget.val("");
	queryGB(query, displayGame);
	console.log(query);
  });
}
$(watchSubmit);

//--------------------------------------------------//

$(".clear").on("click", function(){
	$('#searchBar').val("");
	$(".results").empty();
	$(".results-heading").attr('hidden', true);
  });

//scroll up button 
//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


