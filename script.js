var xmlhttp = new XMLHttpRequest();
var url = "https://api.spotify.com/v1/search";
var albums;
var coverSize = '150';
var n , keyWord, amount, pre;
var all = [];

function listAlbums(i, end){

    for(var t = i; t < i+end; t++){
        var imgSrc = all[t].images[1].url;
        var artist = all[t].artists[0].name;
        var album = all[t].name;
        album = album.replace(/ /g, "&nbsp;");
        document.getElementById("covers").innerHTML += "<div class='albumCover' onclick='showHRPic("+t+")' title='Title: "+album+"\nArtist: "+artist.replace(/ /g, "&nbsp;")+ "'><img src="+imgSrc+" width="+coverSize +"height="+coverSize+"><p class='albumInfo'>Title: "+album+"<br>Artist: " +artist+"</p></div>";
    }       
}

function addToList(a){
    all.push(a);
}

function changePage(index){
    document.getElementById("covers").innerHTML = "";
    document.getElementsByClassName("current")[0].className = "notCurrent";
    document.getElementById("pagi").childNodes[index].className = "current";
    var end;
    if(index+1 >= all.length/20){
        end = all.length%20;
    } else {
        end = 20;
    }
    listAlbums(index*20, end);
}

function addPagination(){
    var pagi = document.getElementById("pagi");
    pagi.innerHTML = "";
    for (var i = 0; i < amount/20; i++){
        var newPage = "<a href='#' onclick='changePage("+(i)+")' class='notCurrent'>" + (i+1) + "</a>";
        pagi.innerHTML += newPage;
    }
}

xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var tmp = JSON.parse(this.responseText);
        albums = tmp.albums.items;
        //n = 0;
        pre = tmp.albums;
        amount = tmp.albums.total;
        if(amount > 5000){
            window.alert("Please use a more specific keyword");
            document.getElementById("covers").innerHTML = "";
            document.getElementById("pagi").innerHTML = "";
            document.getElementById("resultsHeader").innerHTML = "";
        } else {
            if (amount > 0){
                albums.forEach(addToList);
        
                if (all.length < amount){
                    searchAlbums();
            } else {
                addPagination();
                document.getElementById("pagi").childNodes[0].className = "current";
                document.getElementById("covers").innerHTML = "";
                
                if(1 >= all.length/20){
                    listAlbums(0,all.length%20);
                } else {
                    listAlbums(0, 20);
                }
        
                document.getElementById("resultsHeader").innerHTML = "Found "+amount+ " albums for:  &quot;" + keyWord +"&quot;";
            }   
            } else {
                document.getElementById("covers").innerHTML = "";
                document.getElementById("pagi").innerHTML = "";
                document.getElementById("resultsHeader").innerHTML = "Found "+amount+ " albums for:  &quot;" + keyWord +"&quot;";
            }
        }
    }
    
};

function searchAlbums(){
    if (keyWord != document.getElementById('key').value){
        all = [];
        keyWord = document.getElementById('key').value;
        url = "https://api.spotify.com/v1/search?q="+ keyWord +"&type=album";
        
    } else {
        url = pre.next;
    }
        
    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}

function showHRPic(x){
    document.getElementById("modalBox").style.display = "block";
    document.getElementById("HRPic").src = all[x].images[0].url;
}

function closeBox(){
    document.getElementById("modalBox").style.display = "none";
    document.getElementById("HRPic").src = "";
}

