#!/bin/bash

# Script d'installation automatique du proxy Valorant
echo "🚀 Installation du proxy Valorant..."

# Mise à jour du système
apt update && apt upgrade -y

# Installation de Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Vérification des versions
echo "📦 Node.js version:"
node --version
echo "📦 NPM version:"
npm --version

# Création du dossier du projet
mkdir -p /opt/valorant-proxy
cd /opt/valorant-proxy

# Copie des fichiers (vous devrez les transférer)
echo "📁 Copiez proxy-server.js et package.json dans /opt/valorant-proxy/"
echo "💡 Puis exécutez: npm install && npm start"

# Installation des dépendances globales pour PM2 (gestionnaire de processus)
npm install -g pm2

echo "✅ Installation terminée!"
echo "🔧 Prochaines étapes:"
echo "1. Transférez proxy-server.js et package.json vers /opt/valorant-proxy/"
echo "2. Exécutez: cd /opt/valorant-proxy && npm install"
echo "3. Démarrez avec: pm2 start proxy-server.js --name valorant-proxy"
echo "4. Configurez le firewall: ufw allow 1999"
