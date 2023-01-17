const form = document.getElementById("form");
const noBooks = document.querySelector(".no-books");
let booksContainer = document.querySelector(".books-container");
let books = JSON.parse(localStorage.getItem("books")) || [];

function showBook(book){
  noBooks.style.display = "none";
  booksContainer.innerHTML += `<div class="single-book">
  <p class="book-title">${book.title}</p>
  <p class="book-author">${book.author}</p>
  <button type="button" class="remove-button">Remove</button>
  <hr>
</div>`

AddRemoveListerToButtons();

}

function getBooks(){

  if(books.length > 0){
    noBooks.style.display = "none";
    books.forEach((book) => {
      showBook(book);
    })
  }
}

function addBook(event){
  event.preventDefault();

  let newBook = {
    title: document.getElementById("booktitle").value, 
    author: document.getElementById("bookauthor").value
  };

  books.push(newBook);
  form.reset();
  showBook(newBook); 
  localStorage.setItem("books",JSON.stringify(books));

}

function AddRemoveListerToButtons(){
  let removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button,index) => {
    button.addEventListener("click", () => {
      //removeBook(index)
      books.splice(index,1);
      localStorage.setItem("books",JSON.stringify(books));
      let bookToRemove = document.querySelectorAll(".single-book");
      let booksDivs = Array.from(bookToRemove);
      booksDivs[index].style.display = "none";

      if(books.length < 1){
        noBooks.style.display = "block";
      }
    });
  });
}

function removeBook(index){
  books.splice(index,1);
  localStorage.setItem("books",JSON.stringify(books));
  let bookToRemove = document.querySelectorAll(".single-book");
  let booksDivs = Array.from(bookToRemove);
  booksDivs[index].style.display = "none";
  
  //books.length < 1 ? noBooks.style.display = "block" : noBooks.style.display = "none";
  if(books.length < 1){
    noBooks.style.display = "block";
  }
}

getBooks(books);

form.addEventListener('submit',addBook);