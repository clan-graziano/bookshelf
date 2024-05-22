const baseApiUrl = 'https://librarymanagementpw.azurewebsites.net/api';
var button= document.querySelector('.submit');
var bottoneCerca = document.querySelector('#bottoneCerca')
//textbox titolo che l'utente ricerca

//funzione per la ricerca (eventListener)
bottoneCerca.addEventListener('click', function() {
    // Ottieni il valore del nome del libro dal campo di input
    let nomeLibro = document.getElementById('nomeLibroInput').value.trim();

    fetch('https://librarymanagementpw.azurewebsites.net/api/Book')
        .then(response => response.json())
        .then(data => {
            // Crea una lista per contenere i libri trovati
            let listaLibriTrovati = [];

            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                for (var key in obj) {
                    if (key === "title") {
                        console.log(obj[key]);
                        // Se il titolo cercato corrisponde al titolo del libro, lo aggiunge alla lista
                        if (obj[key].toLowerCase() === nomeLibro.toLowerCase()) {
                            listaLibriTrovati.push(obj);
                        }
                    }
                }
            }

            // Visualizza gli elementi nella lista
            let listaElementi = document.getElementById('listaLibri');
            listaElementi.innerHTML = ''; // Pulisce la lista precedente

            if (listaLibriTrovati.length > 0) {
                for (var j = 0; j < listaLibriTrovati.length; j++) {
                    let libro = listaLibriTrovati[j];
                    let listItem = document.createElement('li');
                    listItem.textContent = `Titolo: ${libro.title}, Autore: ${libro.author}, Anno: ${libro.year}`;
                    listaElementi.appendChild(listItem);
                }
            } else {
                listaElementi.textContent = 'Nessun libro trovato con quel titolo.';
            }
        })
        .catch(err => alert("La richiesta è andata male: " + err));
});


// Funzione per cercare libri
async function searchBooks() {
    const title = document.getElementById('searchTitle').value;



    
    let query = `${baseApiUrl}/Book?`;
    if (title) query += `title=${title}&`;

    // Rimuove l'ultimo carattere '&' o '?' dal query
    query = query.slice(0, -1);

    console.log('Query:', query);

    try {
        const response = await fetch(query);
        if (!response.ok) {
            throw new Error('Errore nella risposta del server');
        }
        const books = await response.json();
        console.log('Books:', books);
        displayBooks(books);
    } catch (error) {
        console.error('Errore nella ricerca dei libri:', error);
        alert('Errore nella ricerca dei libri. Controlla la console per i dettagli.');
    }
}



// Funzione per visualizzare i libri
function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (!books.length) {
        bookList.innerHTML = '<p>Nessun libro trovato</p>';
        return;
    }

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <p>Id: ${book.bookId}</p>
            <p>Titolo: ${book.title}</p>
            <p>Prezzo: ${book.price}</p>
        `;
        bookList.appendChild(bookItem);
    });
}

// Funzione per aggiungere o aggiornare un libro
async function addOrUpdateBook() {
    const id = document.getElementById('bookId').value;
    const title = document.getElementById('bookTitle').value;
    const price = document.getElementById('bookPrice').value;

    if (!title || !price) {
        alert('Titolo e Prezzo sono campi obbligatori');
        return;
    }

    const book = {
        title: title,
        price: parseFloat(price)
    };

    try {
        let response;
        if (id) {
            book.bookId = parseInt(id);
            response = await fetch(`${baseApiUrl}/Book`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
        } else {
            response = await fetch(`${baseApiUrl}/Book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
        }

        if (!response.ok) {
            throw new Error('Errore durante l\'aggiunta/modifica del libro');
        }

        alert('Libro aggiunto/modificato con successo!');
        searchBooks();
    } catch (error) {
        console.error('Errore durante l\'aggiunta/modifica del libro:', error);
        alert('Errore durante l\'aggiunta/modifica del libro. Controlla la console per i dettagli.');
    }
}
window.onload = function() {
    searchBooks();
};
async function searchBookShelves() {
   
}


async function addOrUpdateBookShelf() {
    
}


async function searchGenres() {
    
}


async function addOrUpdateGenre() {
    
}


window.onload = function() {
    searchBooks();
    searchBookShelves();
    searchGenres();
};



/*function getBook(title) {
    fetch(`https://librarymanagementpw.azurewebsites.net/api/Book`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(typeof(data));
        
        let foundBook = null;

        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            for (var key in obj) {
                var value = obj[key];
                console.log(key + " = " + value);
                if (key === "title" && obj[key] === title) {
                    foundBook = obj;
                    break;
                }
            }
            if (foundBook) {
                break;
            }
        }

        if (foundBook) {
            let bookDetails = 'Book found:<br>';
            for (let key in foundBook) {
                bookDetails += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${foundBook[key]}<br>`;
            }
            document.getElementById('output-book1').innerHTML = bookDetails;
        } else {
            document.getElementById('output-book1').innerText = 'Book not found';
        }
    })
    .catch(error => {
        document.getElementById('output-book1').innerText = `Error: ${error.message}`;
    });
}

// Esempio di utilizzo con un pulsante di ricerca
document.getElementById('searchButton').addEventListener('click', function() {
    const title = document.getElementById('bookTitle').value;
    getBook(title);
});
*/