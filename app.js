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
        <td><a href="#" class="btn btn-danger btn-md delete"><i class="fas fa-trash-alt"></i></a></td>
        `;
        list.appendChild(row);

    }
    static deleteBook(el) {
        if(el.classList.contains("delete")){
           
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
    static checkInput(InputValue){
        if (/^[0-9]+$/.test(InputValue)){
            return false;
        }
       else{
        return true;}     
    }
}
// class for store books
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBooks(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) =>{
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
else if(UI.checkInput(isbn)){
    UI.showAlertMsg('pls use numers only in ISBN column', 'danger');
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
   //method for delete book from UI
    UI.deleteBook(e.target);
    // method for delete book from local stroage
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    // Alert msg for successfully removes
   
   
});
