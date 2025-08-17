const fs = require("fs"); // permite leer/escribir archivos
const readline = require("readline"); //  permite leer lo que el usuario escribe en la consola

const FILE = "books.json"; // Archivo donde guardaremos los datos

// Si no existe el archivo, creamos uno vacío
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify([]));
}

// Funciana para leer libros desde el archivo
function readBooks() {
  return JSON.parse(fs.readFileSync(FILE));
}

// Funciana para guardar libros en el archivo
function saveBooks(books) {
  fs.writeFileSync(FILE, JSON.stringify(books, null, 2));
}

// Interfaz para leer datos desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Menú principal
function showMenu() {
  console.log("\n📚 App de gestión de libros");
  console.log("1. Agregar libro");
  console.log("2. Listar libros");
  console.log("3. Buscar libro por título");
  console.log("4. Eliminar libro por título");
  console.log("5. Salir");

  rl.question("Elige una opción: ", (option) => {
    switch (option) {
      case "1":
        addBook(); // Llama a la función para agregar libro
        break;
      case "2":
        listBooks(); // para listar libros
        break;
      case "3":
        searchBook(); //buscar libros
        break;
      case "4":
        removeBook(); // remover los libros agregados
        break;
      case "5":
        rl.close();
        break;
      default:
        console.log("❌ Opción no válida.");
        showMenu(); // Vuelve a mostrar el menú
    }
  });
}

// 1. Agregar libro
function addBook() {
  rl.question("Título: ", (title) => {
    rl.question("Autor: ", (author) => {
      rl.question("Año de publicación: ", (year) => {
        rl.question("Género: ", (genre) => {
          const books = readBooks();  // lee los libros que ya existen
          books.push({ title, author, year, genre }); // Agregamos el nuevo
          saveBooks(books);
          console.log("✅ Libro agregado con éxito!");
          showMenu();
        });
      });
    });
  });
}

// 2. Listar libros
function listBooks() {
  const books = readBooks(); 
  console.log("\n📖 Lista de libros:");
  books.forEach((b, i) => {
    console.log(`${i + 1}. ${b.title} - ${b.author} (${b.year}) [${b.genre}]`);
  });
  if (books.length === 0) console.log("⚠️ No hay libros registrados.");
  showMenu();
}

// 3. Buscar libro
function searchBook() {
  rl.question("Título a buscar: ", (title) => {
    const books = readBooks();// Filtra por los libro agregados
    const found = books.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
    if (found.length > 0) {
      console.log("🔎 Resultados:");
      found.forEach((b) =>
        console.log(`${b.title} - ${b.author} (${b.year}) [${b.genre}]`)
      );
    } else {
      console.log("❌ No se encontró ningún libro.");
    }
    showMenu();
  });
}

// 4. Eliminar libro
function removeBook() {
  rl.question("Título del libro a eliminar: ", (title) => {
    let books = readBooks();// Filtrar por todos libros que NO  se encuentren con ese titulo
    const newBooks = books.filter(
      (b) => b.title.toLowerCase() !== title.toLowerCase()
    );
    if (books.length === newBooks.length) {
      console.log("⚠️ No se encontró ese libro.");
    } else {
      saveBooks(newBooks);
      console.log("🗑️ Libro eliminado.");
    }
    showMenu();
  });
}
// Iniciar app y mostrar inmediatamente el menú.
showMenu(); 
