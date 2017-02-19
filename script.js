var xmlhttp = new XMLHttpRequest();
var url = "https://api.spotify.com/v1/search";
var albums;
var coverSize = '150';
var n ;

function listAlbums(i){
        n += 1;
        var imgSrc = i.images[1].url;
        var artist = i.artists[0].name;
        var album = i.name;
        album = album.replace(/ /g, "&nbsp;");
        document.getElementById("covers").innerHTML += "<div class='albumCover' onclick='showHRPic("+n+")' title='Title: "+album+"\nArtist: "+artist.replace(/ /g, "&nbsp;")+ "'><img src="+imgSrc+" width="+coverSize +"height="+coverSize+"><p class='albumInfo'>Title: "+i.name+"<br>Artist: " +artist+"</p></div>";
    
}

xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var tmp = JSON.parse(this.responseText);
        albums = tmp.albums.items;
        n = 0;
        document.getElementById("covers").innerHTML = "";
        albums.forEach(listAlbums);
        
        //document.getElementById("covers").innerHTML += "<img id='overLayPic' >"
    }
};

function searchAlbums(){
    var keyWord = document.getElementById('key').value;
    url = "https://api.spotify.com/v1/search?q="+ keyWord +"&type=album";
    document.getElementById("resultsHeader").innerHTML = "Found results with keyword &quot;" + keyWord +"&quot;";
    document.getElementById('key').value = "";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function showHRPic(x){
    //window.alert(i.images[0].url);
    //document.getElementById("overLayPic").innerHTML = "<img id='overLayPic' src="+albums[x-1].images[0].url+">";
    document.getElementById("modalBox").style.display = "block";
    //window.alert(albums[x-1].images[0].url);
    //document.getElementById("HRPic").innerHTML = "<img id='HRPic' src="+albums[x-1].images[0].url+">"
    document.getElementById("HRPic").src = albums[x-1].images[0].url;
}

function closeBox(){
    document.getElementById("modalBox").style.display = "none";
}

