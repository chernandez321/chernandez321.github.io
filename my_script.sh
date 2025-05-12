#!/bin/bash

#passprhase git

# Definir rutas
OBSIDIAN_PATH="/home/chl/Documentos/Obsidian Vault/Pagina_Web"
HUGO_CONTENT_PATH="/home/chl/Documentos/pagina_web/Blog/blog/content/"
GITHUB_BRANCH="main"  # o la rama que estés utilizando
GITHUB_REPO="git@github.com:chernandez321/chernandez321.github.io.git"  # Usando SSH

# 1. Sincronizar archivos de Obsidian a la carpeta de Hugo
echo "Sincronizando archivos desde Obsidian a Hugo..."
rsync -av "$OBSIDIAN_PATH" "$HUGO_CONTENT_PATH"

# 2. Ejecutar Hugo para generar el sitio
echo "Generando el sitio con Hugo..."
hugo -d docs

# 3. Hacer commit y push a GitHub
echo "Preparando commit y push a GitHub..."
git add .
git commit -m "Actualización automática del contenido"
git push --force origin $GITHUB_BRANCH

echo "Proceso completado exitosamente."
