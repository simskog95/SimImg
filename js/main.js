//writen by Simon Skoglund
//on window resize operations
$(window).resize(function() {
	if(window.width < 168)
	{
		$(".imgBoxImg").height($(".imgBoxImg").width());
	} else {
		$(".imgBoxImg").height(450);
	}
});

//add one image to the view element. takes object with image link or cover link
function addImg(obj) {
	var imageLink;
	if(typeof obj.cover === "undefined")//could be simplyfied, but this reduces api calls
	{
		var url = "http://i.imgur.com/" + obj.id;
		out = "<a href='" + url + "'><div class='imgBox'><div style='height: 50px; overflow: hidden; text-overflow: ellipsis;'><h3>" + obj.title + "</h3></div><div class='imgBoxImg' style='background-image: url(" + obj.link + ");'></div>Views: " + obj.views + "<br>Points: " + obj.points + "<br>Comments: " + obj.comment_count + "</div></a>";
		document.getElementById("view").innerHTML += out;
	} else {
		var apiUrl = "https://api.imgur.com/3/image/" + obj.cover;
		$.ajax({
		url: apiUrl,
		type: "GET",
		dataType: "json",
		headers: {"Authorization": "Client-ID your_id"},
		success: function(x) {
				imageLink = x.data.link;
				out = "<a href='" + obj.link + "'><div class='imgBox'><div style='height: 50px; overflow: hidden; text-overflow: ellipsis;'><h3>" + obj.title + "</h3></div><div class='imgBoxImg' style='background-image: url(" + imageLink + ");'></div>Views: " + obj.views + "<br>Points: " + obj.points + "<br>Comments: " + obj.comment_count + "</div></a>";
				document.getElementById("view").innerHTML += out;
			},
		error: function(x) {
			console.log(x);
			alert("ERROR, see console log.");
			}
		});
	}
}

//clears main div from content
function clearView() {
	document.getElementById("view").innerHTML = "";
}

function loadNew() {
	
	clearView();
	var obj = $.ajax({
      url: "https://api.imgur.com/3/gallery/user/time/0.json",
      type: "GET",
      dataType: "json",
	  headers: {"Authorization": "Client-ID your_id"},
      success: function(x) {
		  for( i = 0; i < x.data.length ; i++){
			  addImg(x.data[i]);
		  }
	  },
      error: function(x) {
		  console.log(x)
		  document.getElementById("view").innerHTML = "<h1>ERROR, see console log</h1>";
		}
    });
	
}

//runs when sites laod.
function initiateSite() {
	
	clearView();
	var obj = $.ajax({
      url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
      type: "GET",
      dataType: "json",
	  headers: {"Authorization": "Client-ID your_id"},
      success: function(x) {
		  for( i = 0; i < x.data.length ; i++){
			  addImg(x.data[i]);
		  }
	  },
      error: function(x) {
		  console.log(x)
		  document.getElementById("view").innerHTML = "<h1>ERROR, see console log</h1>";
		}
    });
	
}

function loadSearch() {
	alert(document.getElementById("searchInput").value);
	
}