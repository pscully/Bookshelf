const Library = [];

class View {
  constructor() {
    this.app = this.getElement('#app');
    this.h1 = document.createElement('h1');
    this.h1.textContent = 'Add New Book to Library';
    this.button = document.createElement('button');
    this.button.textContent = 'Add New Book';
    this.app.appendChild(this.h1);
    this.app.appendChild(this.button);
  }

  getElement(element) {
    const el = document.querySelector(element);
    return el;
  }

  bindAddBook(handler) {
    this.button.addEventListener('click', event => {
      handler(event);
    });
  }
}

const Book = (title, author, pages, read) => {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

class Controller {
  constructor(view) {
    this.view = view;
    this.addBook = this.view.bindAddBook(this.addBook);
  }

  addBook(title, author, pages, read) {
    console.log('Button clicked');
    const book = new Book(title, author, pages, read);
    Library.push(book);
    console.log(Library);
  }
}

const library = new Controller(new View());
