FROM node:20-alpine

WORKDIR /app

# Kopiere package.json und installiere Dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Kopiere den Rest des Projekts
COPY . .

EXPOSE 3000

# Entwicklungsserver mit Turbopack starten
CMD ["npm", "run", "dev"] 