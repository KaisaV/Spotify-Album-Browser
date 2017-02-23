var xmlhttp = new XMLHttpRequest();
var url = "https://api.spotify.com/v1/search";
var albums;
var coverSize = '150';
var n , keyWord, amount, pre;
var all = [];
var pages, curPage, maxPages = 5;



function listAlbums(i, end){

    for(var t = i; t < i+end; t++){
        var imgSrc = all[t].images[1].url;
        var artist = all[t].artists[0].name;
        var album = all[t].name;
        //album = album.replace(/ /g, "&nbsp;");
        
        var cover = document.createElement("div");
        cover.className = "albumCover";
        cover.setAttribute('onclick', "showHRPic("+t+")");
        cover.title = "Title: " + album + "\nArtist: " + artist;
        
        var image = document.createElement("img");
        image.src = imgSrc;
        image.width = coverSize;
        image.height = coverSize;
        
        var para = document.createElement("p");
        para.className = "albumInfo";
        para.innerHTML = "Title: "+album+"<br>Artist: " +artist;
        
        cover.appendChild(image);
        cover.appendChild(para);
        
        document.getElementById("covers").appendChild(cover);
        
        //document.getElementById("covers").innerHTML += "<div class='albumCover' onclick='showHRPic("+t+")' title='Title: "+album+"\nArtist: "+artist.replace(/ /g, "&nbsp;")+ "'>
        //<img src="+imgSrc+" width="+coverSize +"height="+coverSize+">
        //<p class='albumInfo'>Title: "+album+"<br>Artist: " +artist+"</p></div>";
    }       
}

function addToList(a){
    all.push(a);
}

function sortAlbums(sortBy){
    if(sortBy == "artist"){
        all.sort(function(a, b){return a.artists[0].name.localeCompare(b.artists[0].name);});
    } else {
        all.sort(function(a, b){return a.name.localeCompare(b.name); });
    }
    
    document.getElementById("covers").innerHTML = "";
    changePage(0);
    //listAlbums(0, 20);
}

function changePage(index){
    index = parseInt(index);
    document.getElementById("covers").innerHTML = "";
    document.getElementsByClassName("current")[0].className = "notCurrent";
    document.getElementsByClassName("notCurrent")[index].className = "current";
    var end;
    if(index+1 >= all.length/20){
        end = all.length%20;
    } else {
        end = 20;
    }
    listAlbums(index*20, end);
    
    document.getElementsByClassName("current")[0].style.display = "inline-block";
    if(index > 2 && index < pages-3 && pages > 5){
        document.getElementById("last").style.display = "inline-block";
        document.getElementById("dots2").style.display = "inline-block";
        document.getElementById("first").style.display = "inline-block";
        document.getElementById("dots1").style.display = "inline-block";
        
        var ind = 0;
        for(ind ; ind < index-1; ind++){
            document.getElementsByClassName("notCurrent")[ind].style.display = "none";
        }
        for(ind; ind < index+1; ind++){
            document.getElementsByClassName("notCurrent")[ind].style.display = "inline-block";
        }
        if(index >2){
            for(ind; ind < pages-1; ind++){
                document.getElementsByClassName("notCurrent")[ind].style.display = "none";
            }
        }
    } else if (index < 2 && pages > 5){
    
        for(var ind = 0; ind < 3; ind++){
            document.getElementsByClassName("notCurrent")[ind].style.display = "inline-block";
        }
        document.getElementById("first").style.display = "none";
        document.getElementById("dots1").style.display = "none";
        document.getElementById("last").style.display = "inline-block";
        document.getElementById("dots2").style.display = "inline-block";
        for(var ind = 3; ind < pages-1; ind++){
            document.getElementsByClassName("notCurrent")[ind].style.display = "none";
        }
    } else if (index > pages-3 && pages > 5){
        var ind = 0
        
        for(ind; ind < pages-4; ind++){
            document.getElementsByClassName("notCurrent")[ind].style.display = "none";
        }
        for(ind; ind < pages-1; ind++){
            document.getElementsByClassName("notCurrent")[ind].style.display = "inline-block";
        } 
        document.getElementById("first").style.display = "inline-block";
        document.getElementById("dots1").style.display = "inline-block";
        document.getElementById("last").style.display = "none";
        document.getElementById("dots2").style.display = "none";
    }
}

function addPagination(){
    var pagi = document.getElementById("pagi");
    pagi.innerHTML = "";
    var first = document.createElement("a");
    first.href = "#1";
    first.innerHTML = "1";
    first.id = "first";
    first.style.display = "none";
    first.setAttribute('onclick', 'changePage(0)');
    
    var dots1 = document.createElement("a");
    dots1.innerHTML = "...";
    dots1.style.display = "none";
    dots1.id = "dots1";
    
    pagi.appendChild(first);
    pagi.appendChild(dots1);
    
    var dropDown = document.createElement("select");
    dropDown.id = "dropDown";
    
    for (var i = 0; i < amount/20; i++){
        var newPage = "<a href='#' onclick='changePage("+(i)+")' class='notCurrent'>" + (i+1) + "</a>";
        pagi.innerHTML += newPage;
        var newSelect = document.createElement("option");
        newSelect.innerHTML = i+1;
        newSelect.value = i;
        dropDown.appendChild(newSelect);
    }
    
    if(pages > 5){
        for(var p = 4; p < pages; p++){
            document.getElementsByClassName("notCurrent")[p].style.display = "none";
        }
        var len = document.getElementsByClassName("notCurrent").length;        
        var dots2 = document.createElement("a");
        dots2.innerHTML = "...";
        dots2.id = "dots2";
        pagi.appendChild(dots2);
        pagi.innerHTML += "<a href='#"+len+"' id='last' onclick='changePage("+(len-1)+")'>"+Math.ceil(pages)+"</a>";
        pagi.innerHTML += "<br>";
        pagi.appendChild(dropDown);
        
        var button = document.createElement("button");
        button.setAttribute('onclick', "changePage(document.getElementById('dropDown').value)");
        button.innerHTML = "GO!";
        pagi.appendChild(button);
        
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
                pages = amount/20;
                albums.forEach(addToList);
        
                if (all.length < amount){
                    searchAlbums();
                } else {
                    addPagination();
                    document.getElementsByClassName("notCurrent")[0].className = "current";
                    document.getElementById("covers").innerHTML = "";
                
                    if(1 >= all.length/20){
                        listAlbums(0,all.length%20);
                    } else {
                        listAlbums(0, 20);
                    }
                    document.getElementsByClassName("sorting")[0].style.display = "block";
                    document.getElementById("sortByArtist").style.display = "inline";
                    document.getElementById("sortByTitle").style.display = "inline";
                    document.getElementById("sortTitle").style.display = "inline";
        
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

