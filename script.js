var xmlhttp = new XMLHttpRequest();
var url = "https://api.spotify.com/v1/search";
var albums;

function listAlbums(){
    for (i of albums){
        console.log(i.name);
        var imgSrc = i.images[2].url;
        var artist = i.artists[0].name;
        document.getElementById("covers").innerHTML += "<div style='albumCover'><img src="+imgSrc+"><p style='albumInfo'>title:"+i.name+"<br>artist: " +artist+"</p></div>";
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

