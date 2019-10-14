// A library holds books and has the ability to add new books to list.

class Library {
  constructor() {
    this.books = [
      {
        title: 'Hitchhikers Guide to the Galaxy',
        author: 'Douglas Adams'
      }
    ];
  }

  bindBookshelfChanged(callback) {
    this.onBookshelfChanged = callback;
  }

  addBook(title, author) {
    const book = {
      title: title,
      author: author
    };
    this.books.push(book);
    this.onBookshelfChanged(this.books);
  }
}

class View {
  constructor() {
    this.app = this.getElement('#root');
    this.heading = this.createElement('h1');
    this.heading.textContent = 'My Library';
    this.shelf = this.createElement('ul');
    this.button = this.createElement('button', 'button--action');
    this.button.textContent = 'Add New Book';
    this.button.value = 'Add New Book';
    this.form = this.createElement('div', 'form--add');
    this.form.classList.add('hidden');
    this.titleInput = this.createElement('input');
    this.authorInput = this.createElement('input');
    this.titleInput.name = 'title';
    this.titleInput.placeholder = 'Add book title';
    this.authorInput.name = 'author';
    this.authorInput.placeholder = 'Enter author';
    this.addBookButton = this.createElement('button', 'button--action');
    this.addBookButton.textContent = 'Submit Book';
    this.form.appendChild(this.titleInput);
    this.form.appendChild(this.authorInput);
    this.form.appendChild(this.addBookButton);
    this.app.appendChild(this.heading);
    this.app.appendChild(this.button);
    this.app.appendChild(this.form);
    this.app.appendChild(this.shelf);
  }

  bindShowHideForm() {
    this.button.addEventListener('click', event => {
      this.form.classList.toggle('hidden');
      console.log(event.target.value);
      if (event.target.value === 'Add New Book') {
        this.button.textContent = 'Close Form';
        this.button.value = 'Close Form';
      } else {
        this.button.textContent = 'Add New Book';
        this.button.value = 'Add New Book';
      }
    });
  }

  bindAddBook(handler) {
    this.addBookButton.addEventListener('click', event => {
      const title = this.titleInput.value;
      const author = this.authorInput.value;
      handler(title, author);
      this.titleInput.value = '';
      this.authorInput.value = '';
    });
  }

  displayBooks(books) {
    while (this.shelf.firstChild) {
      this.shelf.removeChild(this.shelf.firstChild);
    }
    books.forEach(book => {
      const slot = this.createElement('li', 'book');
      slot.innerHTML = `<h3>${book.title}</h3><p>${book.author}</p>`;
      this.shelf.appendChild(slot);
    });

    console.log('Books', books);
  }

  createElement(el, className) {
    const element = document.createElement(el);
    element.classList.add(className);
    return element;
  }

  getElement(el) {
    return document.querySelector(el);
  }
}

class Librarian {
  constructor(view, library) {
    this.view = view;
    this.library = library;

    this.view.bindShowHideForm(this.handleAddBook);
    this.view.bindAddBook(this.handleAddBook);
    this.library.bindBookshelfChanged(this.bookshelfChanged);

    this.bookshelfChanged(this.library.books);
  }

  handleAddBook = (title, author) => {
    this.library.addBook(title, author);
  };

  bookshelfChanged = books => {
    this.view.displayBooks(books);
  };
}

const app = new Librarian(new View(), new Library());
