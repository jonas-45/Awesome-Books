class BooksLibrary {
  constructor(books){
    this.books = books;
    this.form = document.getElementById("form");
    this.booksContainer = document.querySelector(".table-body");
  }

  getBooksFromLocalStorage(){  //Retrieve books from local storage and diplay all when the page loads
    if(this.books.length > 0){
      document.getElementById("no-books").style.display = "none";
      this.books.forEach((book) => {
        this.showBook(book);
      })
    }
  }

  showBook(book){ //Method to used to display single book on the page
    document.getElementById("no-books").style.display = "none";
    this.booksContainer.innerHTML += `<tr class="book${book.bid}">
    <td>${book.title} <span class="book-author">by ${book.author}</span</td>
    <td class="button-cells"><button type="button" id = "${book.bid}" class="remove-button">Remove</button></td>
  </tr>`

  this.AddRemoveListerToButtons();
  }

  addBook(event){
    event.preventDefault();
    let bookId = Math.floor(Math.random() * 1000);
  
    let newBook = {
      title: document.getElementById("booktitle").value, 
      author: document.getElementById("bookauthor").value,
      bid: bookId
    };
  
    this.books.push(newBook);
    form.reset();
    this.showBook(newBook); 
    localStorage.setItem("books",JSON.stringify(books));
  }

  removeBook(bid){
    this.books = this.books.filter((book) => {
      console.log("bookID: " + book.bid);
      return book.bid != bid;
    })
    localStorage.setItem("books",JSON.stringify(this.books));
    let bookClass = ".book" + bid;
    this.booksContainer.removeChild(document.querySelector(bookClass));
    const noBooks = document.getElementById("no-books");
    this.books.length < 1 ? noBooks.style.display = "block" : noBooks.style.display = "none";
  }

  AddRemoveListerToButtons(){
    let removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.removeBook(e.target.id);
      });
    });
  }

}

let books = JSON.parse(localStorage.getItem("books")) || [];
const booksObj = new BooksLibrary(books);

booksObj.getBooksFromLocalStorage();

form.addEventListener('submit',booksObj.addBook.bind(booksObj));