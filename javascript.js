let myLibrary = [];

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

const titleError = document.querySelector('#titleError');
const authorError = document.querySelector('#authorError');
const pagesError = document.querySelector('#pagesError');

const newBookButton = document.querySelector('#newBookButton');
const popupForm = document.querySelector('#popupForm');
const bookForm = document.querySelector('#bookForm');
const addBookButton = document.querySelector('#addBookButton');
const cancelButton = document.querySelector('#cancelButton');
const removeButtons = document.querySelectorAll('.remove-button');

// Hide error messages when called 
function clearErrorMessages() {
    titleError.style.display = 'none';
    authorError.style.display = 'none';
    pagesError.style.display = 'none';
}

// hide popup form initially
popupForm.style.display = 'none';


// stores books in local storage then calls displayBooks() to display them
function storeBooks() {
    if (localStorage.getItem('library')) {
        myLibrary = JSON.parse(localStorage.getItem('library'));
        displayBooks();
    }
}
clearErrorMessages();
//calls storeBooks function to store books and display
storeBooks();

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
    }
}

function addBook() {
    const inputs = document.querySelectorAll('input');
    let valid = true;

    if (!titleInput.value) {
        valid = false;
        titleError.style.display = 'block';
    } else {
        titleError.style.display = 'none';
    }
    if (!authorInput.value) {
        valid = false;
        authorError.style.display = 'block';
    } else {
        authorError.style.display = 'none';
    }
    if (!pagesInput.value || isNaN(pagesInput.value)) {
        valid = false;
        pagesError.style.display = 'block';
    } else {
        pagesError.style.display = 'none';
    }
    if (valid) {
        const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
        myLibrary.push(newBook);
        
        displayBooks();
        clearInputFields();
        clearErrorMessages();
        // turns book input into string for storage
        localStorage.setItem('library', JSON.stringify(myLibrary));
        popupForm.style.display = 'none'; // closes popup
    }
}

function displayBooks() {
    const bookListTableBody = document.querySelector('#bookList');
    bookListTableBody.textContent = '';

   // for(const book of myLibrary) {
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const bookRow = document.createElement('tr');
        bookRow.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td>${book.read ? 'Read' : 'Not Read'}</td>
                <td><button class="remove-button" data-index="${i}">Remove</button></td>
        `;
        bookListTableBody.appendChild(bookRow);
    }
}
// clears input fields when after add book button clicked
function clearInputFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
}

function removeBook(event) {
    console.log("Removing book...");
    const index = event.target.getAttribute('data-index');
    console.log(index);
    myLibrary.splice(index, 1);
    console.log("Updated library after splice:", myLibrary);
    localStorage.setItem('library', JSON.stringify(myLibrary));
    displayBooks();
}

removeButtons.forEach(button => {
    button.addEventListener('click', removeBook);
});

// Disable default browser validation messages
bookForm.setAttribute('novalidate', '');

// Set custom validation messages for each input field
titleInput.addEventListener('input', function() {
    titleInput.setCustomValidity('');
});
authorInput.addEventListener('input', function() {
    authorInput.setCustomValidity('');
});
pagesInput.addEventListener('input', function() {
    pagesInput.setCustomValidity('');
});

// opens popup on click to input book info
newBookButton.addEventListener('click', function() {
    popupForm.style.display = 'block';
    clearErrorMessages();
});

addBookButton.addEventListener('click', addBook);

bookForm.addEventListener('invalid', function(event) {
    event.preventDefault();
})

bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addBook(); //calls add book function instead
});

cancelButton.addEventListener('click', function(event) {
    event.preventDefault();
    popupForm.style.display = 'none';
    clearErrorMessages();
});



