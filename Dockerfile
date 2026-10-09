FROM node:lts-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers du projet
COPY . .

# Exposition du port utilisé par Vite
EXPOSE 5173

# Commande de lancement
CMD ["npm", "run", "dev", "--", "--host"]