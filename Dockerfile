FROM node:20-alpine

WORKDIR /app

# Installiere Angular CLI global
RUN npm install -g @angular/cli

# Kopiere package.json und installiere Dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Kopiere den Rest des Projekts
COPY . .

EXPOSE 4200

# Starte den Angular Entwicklungsserver mit Host 0.0.0.0 für Container-Zugriff und Proxy-Konfiguration
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check", "--proxy-config", "proxy.conf.json"] 