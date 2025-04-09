import os
import re

# Directorio donde están tus notas de Obsidian
notes_dir = "/home/chl/Documents/Obsidian Vault/Pagina_Web"
# Carpeta donde están guardadas las imágenes pegadas
images_dir = "/home/chl/Documents/pagina_web/Blog/blog/docs/images/"

# Procesar cada archivo Markdown en el directorio
for filename in os.listdir(notes_dir):
    if filename.endswith(".md"):
        filepath = os.path.join(notes_dir, filename)
        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()

        # Reemplazar el formato de Obsidian por rutas absolutas o relativas
        updated_content = re.sub(
            r"!\[\[([^\]]+)\]\]",
            rf"![\1]({images_dir}\1)",
            content,
        )

        # Guardar los cambios en el archivo
        with open(filepath, "w", encoding="utf-8") as file:
            file.write(updated_content)
