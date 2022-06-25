/* NEW YORK TIMES API */
const nytKey = "1DFFlOS1YqOkGoacxulnUIGzf0tSzFKO";
const nytUrl = "https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction";

/* GOOGLE BOOK API */
const gBookKey = "AIzaSyBWyNXUbSIuk3gjAmK8zGVgrVpfU4feVy4";
const gBookUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:"

fetch(`${nytUrl}&api-key=${nytKey}`, {
    method: 'GET',
})
    .then(res => { return res.json(); })
    .then(data => {
        bestSeller(data);        
        console.log(data);        
    })
    .catch(err => {
        console.log(err);
    });

function bestSeller(nytBest){
    let bookList = document.getElementById("books");
    let book = nytBest.results;

    for(let i=0; i<6; i++){
        bookList.innerHTML += `<div class="item col-sm-3" id="card">
        <div class="thumbnail">
            <img id="cover-${i}" src="assets/img/book_cover.jpg">
            <p class="title">${book[i].book_details[0].title}</p>
            <p class="subtitle">${book[i].book_details[0].author}</p>
        </div>
        </div>`;

        /* book cover */
        bookCover(i, book[i].book_details[0].primary_isbn13)
    }
}

/* fetch book cover using Google Books API */
function bookCover(id, isbn){
    fetch(`${gBookUrl}${isbn}&key=${gBookKey}`, {
        method: 'GET'
    })
    .then( res => { return res.json(); })
    .then( data => {
        var img = data.items[0].volumeInfo.imageLinks.thumbnail;
        $('#cover-' + id).attr('src', img);
    })
    .catch( err => {
        console.log(err);
    });
};