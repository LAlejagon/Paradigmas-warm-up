import os

# ---- Función: analizar un archivo de texto ----
def analyze_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()
            lines = text.splitlines()
            words = text.split()
            chars = len(text)
            return len(lines), len(words), chars
    except Exception as e:
        print(f"⚠️ Error al leer {file_path}: {e}")
        return 0, 0, 0

# ---- Función: recorrer la carpeta "test" ----
def analyze_folder(folder_path):
    results = []
    print(f"🔎 Buscando archivos en: {os.path.abspath(folder_path)}")

    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".txt"):
                full_path = os.path.join(root, file)
                print(f"✅ Analizando: {full_path}")
                lines, words, chars = analyze_file(full_path)
                results.append((full_path, lines, words, chars))
    return results

# ---- Función: mostrar resumen ----
def print_summary(results):
    total_lines = sum(r[1] for r in results)
    total_words = sum(r[2] for r in results)
    total_chars = sum(r[3] for r in results)

    print("\n📊 Resumen de archivos de texto\n")
    print(f"{'Archivo':40} {'Líneas':>7} {'Palabras':>9} {'Caracteres':>12}")
    print("-" * 70)

    for file, lines, words, chars in results:
        print(f"{file:40} {lines:7} {words:9} {chars:12}")

    print("-" * 70)
    print(f"{'TOTAL':40} {total_lines:7} {total_words:9} {total_chars:12}")

# ---- Programa principal ----
if __name__ == "__main__":
    folder = "test"   # 👈 siempre busca en la carpeta "test"
    if not os.path.isdir(folder):
        print("❌ La carpeta 'test' no existe.")
    else:
        results = analyze_folder(folder)
        if results:
            print_summary(results)
        else:
            print("⚠️ No se encontraron archivos .txt en la carpeta.")
