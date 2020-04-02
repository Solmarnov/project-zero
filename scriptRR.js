
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

//Template literals and expressions. 
function htmlAdd(result){
	return `
	<div class="box"> 
		<div> <img src= "${result.image.medium_url}"> <div>
		<div> <p class="gameTitle"> ${result.name} </p> </div>
		<div> <p>${result.deck}<p> </div>
		<div class="siteLink"> <a href="${result.site_detail_url}"target="_blank">Continue to Giant Bomb Page</a> </div>
  	</div>
	`
}


//uses .map to populate template above. 
//data.results accesses giant bomb object. 
function displayGame(data){
	var searchResults = data.results.map(htmlAdd);
	 if(searchResults.length>0){
	$(`.modal-bg`).html(searchResults);

}
};

//Select form element. 
//.submit event is sent when user clicks 'find game' as button type = submit
function watchSubmit() {
  $('form').submit(function(e) {
    var queryTarget = $(e.currentTarget).find('#searchText');
    var query = queryTarget.val();
    queryTarget.val("");
	queryGB(query, displayGame);
	console.log(query);
  });
}
$(watchSubmit);


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




//============================================================
//Search Parameters 

/*
var gType = "";
var genType = ""; 
var studio = ""; 
*/ 
//URL Base 
/*
var queryURLBase = "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json&query=";
*/ 
//Varible to Track Number of Games
/*
var gameCounter = 0; 
*/ 

//Functions
//============================
/* 
function runQuery(queryURL){
*/ 
        //AJAX Function

        /*
        $.ajax({url: queryURL, 
            type: "GET", 
            dataType: "jsonp", 
            contentType: "application/json",
            crossDomain: true,    
        })
        .done(function(GBData){
            //Logging to console
            console.log(queryURL);
            console.log(GBData);
        })

};

*/ 
//MAIN PROCESSES
//======================================
/*
$("#search").click(function() {

    var gType = $("#type")
        .val()
        .trim();
    
    var genType = $("#genre")
        .val()
        .trim();

    var studio = $("#studio")
        .val()
        .trim();


        console.log(gType);
        console.log(genType);
        console.log(studio);

    //Search terms for query
    var newURL = queryURLBase + encodeURIComponent(gType  + "&" + genType + "&" + studio) + "&resources=game";
    console.log(newURL);

    /*Send the AJAX Call the new URL from this onClick function
    runQuery(10, newURL);
    
});


function updatePage(GBData) {

    console.log(GBData);




        

   }



*/ 
/*
var queryURL =  "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json&query="

/*
var apikey = "39c89d285fcb0941c08ccdc2220bde62bff4e8c3";
var baseUrl = "http://www.giantbomb.com/api";

var firstPersonShooter = "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json&query=%22first%20person%20shooter%22&resource_type=games";
console.log(firstPersonShooter);

/*
var massiveMultiplayerOnline = "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json&query=%22massively%20multiplayer%20online%22&resource_type=games";
var rolePlayingGame = "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json&query=%22role%20playing%20game%22&resource_type=game";
*/ 
/*
function buildQueryURL(){
    /* queryURL is the URL to query API */ 
    /*
    var queryURL =  "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json "
    
    /* set the API Key, format (JSON), query and resource 
    var queryParams = {"query": gType, genType, studio}
    console.log(queryParams)
    
    /*
    
    var queryParams ={"api_key" : "39c89d285fcb0941c08ccdc2220bde62bff4e8c3",
                      "format" : "json",
                      "query": " ",}

                    
    queryParams.query = $("#type","#genre","#studio")
        .val()
        .trim();

    console.log(queryURL + $.param(queryParams));
    
}

/* Event listener for search
    collects inputs from fields on search event. 
    Contains query paramaters variable. 
*/ 

/*
$("#search").click(function() {

  
    var gType = $("#type")
        .val()
        .trim();
    
    var genType = $("#genre")
        .val()
        .trim();

    var studio = $("#studio")
        .val()
        .trim();
    */ 
/*
    console.log(gType);
    console.log(genType);
    console.log(studio);

});  
     /*
    Keep till finished 
    var queryParams = {"query": gType, genType, studio}
    */ 
    /*
    var searchResults = JSON.stringify(gType + genType  + studio );
    console.log(searchResults);
    var actualSearch = queryURL + encodeURIComponent(searchResults);  
    console.log(actualSearch);   
}); 
/* this is the clear input onclick function. Will clear inputs onClick */ 
/*
$("#clear").click(function(){
    console.log('clear');
    $("#type").val(' ');
    $("#genre").val('');
    $("#studio").val('');  
}); 
/*
$.ajax({
    url: "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json&query=%22first%20person%20shooter%22&resource_type=games",
    method: "GET"
  }).then(function(response) {
    console.log(url);
  });
/*
$.ajax({
    url: queryURL,
    method: "GET"
  }); 
/* 
*/ 
    /*
  var search1 = document.getElementById( "type").nodeValue; 
  console.log(search1).val.trim;
  $("#type").val;
  console.log(search);   
});
$("#clear").click(function() {
    console.log("clear");
  });
  document.getElementById('btnSearch').onclick = function() {
    var search = document.getElementById('search').value;
    var searchEncoded = encodeURIComponent(search);
    window.location.url = "http://www.website.com/search/" + searchEncoded;
}
*/