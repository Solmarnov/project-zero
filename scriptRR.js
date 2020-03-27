
/*
var apikey = "39c89d285fcb0941c08ccdc2220bde62bff4e8c3";
var baseUrl = "http://www.giantbomb.com/api";

var firstPersonShooter = "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json&query=%22first%20person%20shooter%22&resource_type=games";
var massiveMultiplayerOnline = "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json&query=%22massively%20multiplayer%20online%22&resource_type=games";
var rolePlayingGame = "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json&query=%22role%20playing%20game%22&resource_type=game";
*/ 

function buildQueryURL(){
    /* queryURL is the URL to query API */ 
    var queryURL =  "https://www.giantbomb.com/api/search/?api_key=39c89d285fcb0941c08ccdc2220bde62bff4e8c3&format=json "
    
    /* set the API Key, format (JSON), query and resource */ 
    var queryParams = {"query": gType, genType, studio}
    console.log(queryParams)
    
    /*
    
    var queryParams ={"api_key" : "39c89d285fcb0941c08ccdc2220bde62bff4e8c3",
                      "format" : "json",
                      "query": " ",}

    */                    
    queryParams.query = $("#type","#genre","#studio")
        .val()
        .trim();

    console.log(queryURL + $.param(queryParams));
    
}

/* Event listener for search
    collects inputs from fields on search event. 
    Contains query paramaters variable. 
*/ 

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

    var queryParams = {"query": gType, genType, studio}
    console.log(queryParams)
}); 

/* this is the clear input onclick function. Will clear inputs onClick */ 
$("#clear").click(function(){
    console.log('clear');
    $("#type").val(' ');
    $("#genre").val('');
    $("#studio").val(''); 
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