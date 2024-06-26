const baseApiUrl = 'https://librarymanagementpw.azurewebsites.net/api';
var button= document.querySelector('.submit');
var bottoneCerca = document.querySelector('#bottoneCerca');
var search_book = document.querySelector('#searchTitle');
//textbox titolo che l'utente ricerca

//funzione per la ricerca (eventListener)
bottoneCerca.addEventListener('click', function() {
    // Ottieni il valore del nome del libro dal campo di input
    let nomeLibro = document.getElementById('searchTitle').value;
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
                        // console.log(obj[key] + "+" + nomeLibro);
                        // Se il titolo cercato corrisponde al titolo del libro, lo aggiunge alla lista
                        if (obj[key].toLowerCase() === nomeLibro.toLowerCase()) {
                            listaLibriTrovati.push(obj);                           
                        }
                    }
                }
            }
            console.log(listaLibriTrovati);

            for (var i = 0; i < listaLibriTrovati.length; i++) {
                var obj = listaLibriTrovati[i];
                console.log("**Titolo:** " + obj.title);
                console.log("**Prezzo:** " + obj.price);
                console.log("-----------------------");
                books.forEach(book => {
                    const libro = document.createElement('div');
                    libro.className = 'libro';
                    libro.innerHTML = `
                        <h2>Risultato libro</h2>
                        <p>Titolo: ${book.title}</p>
                        <p>Prezzo: ${book.price}</p> 
                        `;
                    libro.appendChild(libro);
                });
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


