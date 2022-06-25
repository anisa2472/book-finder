$(document).ready(function(){
    var searchText;
    const apiKey = "AIzaSyBWyNXUbSIuk3gjAmK8zGVgrVpfU4feVy4";
    const urlBook = "https://www.googleapis.com/books/v1/volumes?q=";

    $("#search").click(function(){
        searchText = $("#search-text").val();
        if(searchText === "" || searchText === null){            
        }
        else {
            fetch(`${urlBook}${searchText}&key=${apiKey}`, {
                method: 'GET',
            })
            .then( res => { return res.json() })
            .then( data => {
                bookData(data);
                console.log(data);
            })
            .catch( err => {
                console.log(err);
            });
        }        
    });
});

function bookData(data){
    let bookList = document.getElementById("books");
    let book = data.items;

    /* update title */
    document.getElementById("title").innerHTML = "<h3>RESULTS</h3>";

    bookList.innerHTML = "";

    for(let i=0; i<book.length; i++){
        console.log(book[i]);
        bookList.innerHTML += `<div class="item col-sm-3" id="card">
        <div class="thumbnail">
            <img id="cover-${i}" src="${book[i].volumeInfo.imageLinks.thumbnail}">
            <p class="title">${book[i].volumeInfo.title}</p>
            <p class="subtitle">${book[i].volumeInfo.authors}</p>
        </div>
        </div>`;
    }
}