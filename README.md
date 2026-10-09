# Mini Bug-Tracker

Ce projet est une application de suivi d'anomalies (Bug-Tracker) développée avec Vue.js, Vite et Vue Router. 
Il a été réalisé dans le cadre du TP de Technologie du Web.

## Prérequis

Avant de lancer l'application, assurez-vous que l'API backend (fournie via Docker) est en cours d'exécution sur votre machine :
\`\`\`bash
docker run -p 8080:80 nicolascauchois/fisa3-techno-web-api-tp:1.0.0
\`\`\`

## Installation et Lancement

1. Installer les dépendances du projet :
\`\`\`bash
npm install
\`\`\`

2. Démarrer le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

L'application sera accessible à l'adresse indiquée dans le terminal (généralement `http://localhost:5173`).

## 🐳 Utilisation avec Docker (si voulu)

L'application peut être entièrement conteneurisée grâce au `Dockerfile` inclus.

1. Construire l'image Docker de l'application front-end (à lancer depuis la racine du projet) :
\`\`\`bash
docker build -t mini-bug-tracker-front .
\`\`\`

2. Lancer le conteneur sur le port 5173 :
\`\`\`bash
docker run -p 5173:5173 mini-bug-tracker-front
\`\`\`

L'application sera ensuite disponible sur `http://localhost:5173`.

## Architecture 

- **Vue 3 (Composition API)** : Utilisation de `<script setup>`.
- **Vue Router** : Navigation fluide sans rechargement (Dashboard, Création, Détail).
- **Fetch API** : Appels asynchrones (GET, POST, PATCH, DELETE) centralisés dans un service (`api.js`).
- **Data Transfer Object (DTO)** : Formatage des données de l'API via une classe `TicketDTO`.
- **Composants** : Découpage modulaire (`AppHeader`, `TicketCard`, `FilterBar`).