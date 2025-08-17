import java.util.*; // es la importacion de todas ls clases 

// una clase de producto con los atributos correspondiente
class Product {
   String name;
   String category;
   double price;
   int stock;
   int unitsSold;


public Product  (String name, String category, double price, int stock, int unitsSold) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.stock = stock;
    this.unitsSold = unitsSold;

   }
}

  public class Main { 
    // lista con los productos 
    public static void main(String[] args) {
        List<Product> products = new ArrayList<>(Arrays.asList(

         new Product("Computadora", "Electronics", 1500000, 5 ,10),
         new Product("Celular", "Electronics", 8000000, 3 ,5),
         new Product("table", "Electronics", 900000, 2 ,3),
         new Product("Televisor", "Electronics", 2500000, 1 ,9),
         new Product("Sofa", "Home", 2000000, 4, 6),
         new Product("Cama", "Home", 1100000, 10, 3),
         new Product("Comedor", "Home", 3000000, 7, 1)

       ));

     
        // 1. productos con estanteria > 0 y ordenados por nombre 
        System.out.println("Electrónicos con stock > 0:");// titilo  a mostrar
        products.stream()
                .filter(p -> p.category.equals("Electronics") && p.stock > 0) // filtrar los productos mayor a 0 en el stock
                .sorted(Comparator.comparing(p -> p.name)) // Ordenarlos alfabéticamente por nombre
                .forEach(p -> System.out.println("- " + p.name)); // Imprimirlos uno por uno en pantalla


        // 2. Buscar los productos de "Home" con Estanteria menor a 5 y aumentamos su precio un 10%.
        products.stream()
                .filter(p -> p.category.equals("Home") && p.stock < 5)
                .forEach(p -> p.price *= 1.10); //multiplicamos el precio por 1.10



        // 3. Calcular ingreso total por categoría
        Map<String, Double> revenueByCategory = new HashMap<>(); // Creamos un mapa para guardar el ingreso total por categoría.
        for (Product p : products) {
            revenueByCategory.put(p.category,
            revenueByCategory.getOrDefault(p.category, 0.0) + (p.price * p.unitsSold)); // Recorremos todos los productos y sumamos precio * unidadesVendidas a la categoría correspondiente. 
        }

        // 4. Categoría con mayor ingreso
        String topCategory = Collections.max(revenueByCategory.entrySet(), Map.Entry.comparingByValue()).getKey(); // Encontramos la categoría con mayor ingreso usando Collections.max
        System.out.println("\nCategoría con mayor ingreso: " + topCategory);                                      //getKey() obtiene solo el nombre de la categoría.

        // 5. Lista de nombres ordenada por precio desc y stock asc si precios iguales
        System.out.println("\nProductos ordenados por precio (desc) y stock (asc):");
        products.stream()
                .sorted(Comparator.comparingDouble((Product p) -> p.price).reversed() // Precio descendente (reversed()).
                .thenComparingInt(p -> p.stock))
                .forEach(p -> System.out.println(p.name + " - $" + p.price + " - stock: " + p.stock)); // Luego imprimimos el nombre, precio y stock
      }
    }