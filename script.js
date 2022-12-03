"use strict";

let library = []; //main storage
//IIEF start app
const startApp = (() => {
  const form = document.getElementById("mainForm");
  form.addEventListener("submit", addBookToLibrary);
  return library;
})();

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(e) {
  e.preventDefault();
  //store values from form
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read");
  //create new book and add it into library
  library.push(new Book(title, author, pages, read.checked));
  const form = document.getElementById("mainForm");
  form.reset();
  displayBooks();
}

function displayBooks() {
  //remove book-cards if exists
  try {
    document.querySelectorAll(".bookCard").forEach((e) => e.remove());
    const delCont = document.getElementById("container");
    delCont.remove();
  } catch {
    //pass
  } finally {
    //pass
  }

  const cont = document.getElementById("cont");
  const container = document.createElement("div");
  container.id = "container";
  cont.appendChild(container);

  //create book-cards
  for (let i = 0; i < library.length; i++) {
    //create book-card
    const bookCard = document.createElement("div");
    bookCard.className = "bookCard";
    // if read = true -> bookRead = read
    const bookRead = library[i].read ? "read" : "not read";
    // create paragraphs for displaying values
    const dispTitle = document.createElement("p");
    const dispAuthor = document.createElement("p");
    const dispPages = document.createElement("p");
    const dispRead = document.createElement("p");
    // button for status - read/not read change
    const btn = document.createElement("button");
    btn.id = i;
    btn.className = "btn";
    btn.addEventListener("click", changeStatus);
    //button for remove book-card
    const delBtn = document.createElement("button");
    delBtn.id = i;
    delBtn.className = "delBtn";
    delBtn.addEventListener("click", deleteBook);

    dispTitle.innerText = "Title: " + library[i].title;
    dispAuthor.innerText = "Author: " + library[i].author;
    dispPages.innerText = "Pages: " + library[i].pages;
    dispRead.innerText = "Status: " + bookRead;
    btn.innerHTML = "Change Status";
    delBtn.innerHTML = "Remove Book";

    document.getElementById("container").appendChild(bookCard);
    bookCard.appendChild(delBtn);
    bookCard.appendChild(dispTitle);
    bookCard.appendChild(dispAuthor);
    bookCard.appendChild(dispPages);
    bookCard.appendChild(dispRead);
    bookCard.appendChild(btn);
  }
}

function changeStatus(e) {
  // if "book".read = true -> newStatus = false
  const newStatus = library[e.target.id].read ? false : true;
  //new "read" value
  library[e.target.id].read = newStatus;
  displayBooks();
}

function deleteBook(e) {
  library.splice(e.target.id, 1);
  displayBooks();
}
