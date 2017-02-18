var xmlhttp = new XMLHttpRequest();
var url = "https://api.spotify.com/v1/search";
var albums;
var coverSize = '150';

function listAlbums(){
    document.getElementById("covers").innerHTML = "";
    for (i of albums){
        console.log(i.name);
        var imgSrc = i.images[1].url;
        var artist = i.artists[0].name;
        var album = i.name;
        album = album.replace(/ /g, "&nbsp;");
        document.getElementById("covers").innerHTML += "<div class='albumCover' title='Title: "+album+"\nArtist: "+artist.replace(/ /g, "&nbsp;")+ "'><img src="+imgSrc+" width="+coverSize +"height="+coverSize+"><p class='albumInfo'>Title: "+i.name+"<br>Artist: " +artist+"</p></div>";
    }
}

xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var tmp = JSON.parse(this.responseText);
        albums = tmp.albums.items;
        listAlbums();
    }
};

function searchAlbums(){
    url = "https://api.spotify.com/v1/search?q="+ document.getElementById('key').value+"&type=album";
    document.getElementById('key').value = "";
    xmlhttp.open("GET", url);
    xmlhttp.send();
}

