#!/bin/sh

cd /app

# Nur wenn noch kein Projekt da ist
if [ ! -f package.json ]; then
  echo "📦 Erstelle neues Vue-Vite-Projekt..."

  npm install -g create-vite

  # Projekt in Unterordner erzeugen
  create-vite temp-vue --template vue --no-git

  # Kopiere Inhalte ins Arbeitsverzeichnis
  cp -r temp-vue/* .
  cp -r temp-vue/.[^.]* .  # Versteckte Dateien kopieren

  # Aufräumen
  rm -rf temp-vue

  npm install
else
  echo "📦 Projekt existiert bereits – überspringe Erstellung"
  npm install
fi

echo "🚀 Starte Dev-Server..."
npm run dev -- --host
