let library = [
  {
    title: 'Hitchhikers Guide to the Galaxy',
    author: 'Douglas Adams'
  }
];

class View {
  constructor() {
    this.app = document.querySelector('#root');
    this.heading = this.createElement('h1');
    this.heading.textContent = 'My Library';
    this.shelf = this.createElement('ul');
    this.app.appendChild(this.heading);
    this.app.appendChild(this.shelf);
    this.stockShelf();
  }

  stockShelf() {
    library.forEach(book => {
      console.log(book);
      const slot = this.createElement('li', 'book');
      slot.innerHTML = `<h3>${book.title}</h3><p>${book.author}</p>`;
      this.shelf.appendChild(slot);
    });
  }

  createElement(el, className) {
    const element = document.createElement(el);
    element.classList.add(className);
    return element;
  }
}

const app = new View();
