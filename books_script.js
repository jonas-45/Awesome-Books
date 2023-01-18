class BooksLibrary{
  
  constructor(books,form,nobooks,booksContainer){
    this.form = form;
    this.noBooks = nobooks
    this.booksContainer = booksContainer
    this.books = books;
  }

  showBook(book){
    this.noBooks.style.display = "none";
    this.booksContainer.innerHTML += `<tr>
    <td class="book-title">${book.title} by <span class="book-author">${book.author}</span></td>
    <td><button type="button" class="remove-button">Remove</button></td>
  </tr>`

    let removeButtons = document.querySelectorAll(".remove-button");
    //console.log("Remove buttons: " + removeButtons.length);
    removeButtons.forEach((button,index) => {
      button.addEventListener("click", () => {
        this.removeBook(index);
        
      });
    }); 

    if(this.books.length < 1){
      alert("Should show");
      this.noBooks.style.display = "block";
    }
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
    console.log(books);
    // let bookToRemove = document.querySelectorAll(".single-book");
    // let booksDivs = Array.from(bookToRemove);
    // booksDivs[index].style.display = "none";
    localStorage.setItem("books",JSON.stringify(this.books));

    window.location.reload();
  }
}

let books = JSON.parse(localStorage.getItem("books")) || [];
const form = document.getElementById("form");
const noBooks = document.querySelector(".no-books");
const booksContainer = document.querySelector(".books-table");

const booksObj = new BooksLibrary(books,form,noBooks,booksContainer);
booksObj.getBooks();
form.addEventListener('submit',(event) => {booksObj.addBook(event)});