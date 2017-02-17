var xmlhttp = new XMLHttpRequest();
var url = "https://api.spotify.com/v1/search";
var albums;

function listAlbums(){
window.alert("jee");
    for (i of albums){
        console.log(i.name);
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
    //window.alert("jihuu");
    url = "https://api.spotify.com/v1/search?q="+ document.getElementById('key').value+"&type=album";
    xmlhttp.open("GET", url);
    xmlhttp.send();
}

