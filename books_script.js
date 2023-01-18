class BooksLibrary{
  
  constructor(books,form,nobooks,booksContainer){
    this.form = form;
    this.noBooks = nobooks
    this.booksContainer = booksContainer
    this.books = books;
  }


  // getAllBooks(){
  //   return JSON.parse(localStorage.getItem("books")) || [];
  // }

  showBook(book){
    this.noBooks.style.display = "none";
    this.booksContainer.innerHTML += `<div class="single-book">
    <p class="book-title">${book.title}</p>
    <p class="book-author">${book.author}</p>
    <button type="button" class="remove-button">Remove</button>
    <hr>
    </div>`

    let removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button,index) => {
      button.addEventListener("click", () => {
        this.removeBook(index);
        
      });
    }); 
  }

  getBooks(){
    if(this.books.length > 0){
      this.noBooks.style.display = "none";
      this.books.forEach((book) => {
        this.showBook(book);
      })
    }
  }

  addBook(event){
    event.preventDefault();
    let newBook = {
      title: document.getElementById("booktitle").value, 
      author: document.getElementById("bookauthor").value
    };

    this.books.push(newBook);
    form.reset();
    this.showBook(newBook); 
    localStorage.setItem("books",JSON.stringify(this.books));
  }

  removeBook(index){
    this.books.splice(index,1);
    localStorage.setItem("books",JSON.stringify(this.books));
    let bookToRemove = document.querySelectorAll(".single-book");
    let booksDivs = Array.from(bookToRemove);
    booksDivs[index].style.display = "none";

    if(this.books.length < 1){
      this.noBooks.style.display = "block";
    }
  }
}

let books = JSON.parse(localStorage.getItem("books")) || [];
const form = document.getElementById("form");
const noBooks = document.querySelector(".no-books");
const booksContainer = document.querySelector(".books-container");

const booksObj = new BooksLibrary(books,form,noBooks,booksContainer);
booksObj.getBooks();
form.addEventListener('submit',(event) => {booksObj.addBook(event)});