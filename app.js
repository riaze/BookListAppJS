//book class:
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks(){
        /*const storedBooks = [
            {
                title:'Book one',
                author:'Johe Doe',
                isbn:'123456'
            },
            {
                title:'Book two',
                author:'Riaze ahamed',
                isbn:'7891011'
            }
        ];*/
        //const books = storedBooks;
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
        `;
        list.appendChild(row);

    }
    static deleteBook(el) {
        if(el.classList.contains("delete")){
            console.log('gi');
            el.parentElement.parentElement.remove();
            UI.showAlertMsg('Removed Successfuly', 'success');
            
        }
        else{
            UI.showAlertMsg('Book was not Removed', 'danger');
        }
        
    }
    static showAlertMsg(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
       
        // supperimer apers 3 secondes
        setTimeout(() => document.querySelector('.alert').remove(),2000);

    }
    static clearFieds(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
// class for store books
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null) {
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('book'));
        }
        return books;
    }
    static addBooks(book){
        alert('jai');
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBooks(isbn){
        const book = Store.getBooks();
        books.forEach((book,index) =>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks());

// Event: add a Books
document.querySelector('#book-form').addEventListener('submit', (e) =>
{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
//validate form
if(title === '' || author === '' || isbn === ''){
    UI.showAlertMsg('Pls Fill all filed and Enter', 'danger');
}
else{
     //Instatiate Book
 book = new Book(title, author, isbn);
 // Add Book to UI
 UI.addBookToList(book);
    
 // add book to store
 Store.addBooks(book);
 // Succes Msg Alert
 UI.showAlertMsg('Successfully Added', 'success');
 // vide le filed
 UI.clearFieds();
}
});
// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
   
    UI.deleteBook(e.target);

    // Alert msg for successfully removes
   
   
});
