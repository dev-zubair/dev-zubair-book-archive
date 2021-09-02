const searchField = document.getElementById('search-field');
const booksContainer = document.getElementById('books-container');

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Search Book 
const searchBooks = () => {
    //Display spinner
    toggleSpinner('block');
    const searchText = searchField.value;
    // clear data 
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
}
const displayBooks = books => {
    // books filter 
    const booksArr = books.filter(one => one.cover_i !== undefined && one.author_name !== undefined && one.publisher !== undefined && one.publish_date !== undefined && one.publish_year !== undefined);
    const bookDetails = document.getElementById('book-details');
    if (booksArr.length === 0) {
        bookDetails.innerHTML = `<h3 class="text-light">No result Found</h3>`;
        booksContainer.innerHTML = '';
    }
    else {
        const bookNo = document.createElement('p');
        bookNo.innerHTML = `
        <h2 class="text-light">Book Details</h2>
        <h4 class="text-light">You got ${booksArr.length} books</h4>`;
        bookDetails.innerHTML = '';
        bookDetails.appendChild(bookNo);

        booksArr.forEach(book => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col');
            colDiv.innerHTML = `
        <div class="card h-100">
        <img class="card-img-top img-fluid p-3" style="width:100%; height:400px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"   alt="...">
                        <div class="card-body">
                        
                        <h5 class="card-title text-center">${book.title}</h5>
                        <p class="card-text"><span class="heading">Author</span> : ${book.author_name[0]}</p>
                        <p class="card-text"><span class="heading">Publisher : </span>${book.publisher[0]}</p>
                        <p class="card-text"><span class="heading">1st Publish : </span>${book.first_publish_year}</p>
                        <p class="card-text"><span class="heading">Publish Year : </span>${book.publish_year}</p>
                        </div>
                    </div>`;
            booksContainer.appendChild(colDiv);
        });
    };
    //Display spinner
    toggleSpinner('none');
}