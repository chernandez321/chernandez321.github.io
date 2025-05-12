#!/bin/bash

# Configuración
OBSIDIAN_PATH="/home/chl/Documentos/Obsidian Vault/Pagina_Web"
HUGO_CONTENT_PATH="/home/chl/Documentos/pagina_web/Blog/blog/content/Pagina_Web"
GITHUB_BRANCH="main"
GITHUB_REPO="git@github.com:chernandez321/chernandez321.github.io.git"

# 1. Sincronizar archivos de Obsidian a Hugo
echo "🔄 Sincronizando archivos desde Obsidian a Hugo..."
rsync -av "$OBSIDIAN_PATH/" "$HUGO_CONTENT_PATH/"

# 2. Generar el sitio con Hugo
echo "🏗️  Generando el sitio con Hugo..."
cd "/home/chl/Documentos/pagina_web/Blog/blog" || exit
hugo -d docs

# 3. Hacer commit y push a GitHub
echo "⬆️  Subiendo los cambios a GitHub..."
git add .
git commit -m "Actualización automática del contenido de Hugo"
git push origin $GITHUB_BRANCH

echo "✅ Proceso completado exitosamente."
