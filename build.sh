#!/bin/bash

# Build script para despliegue

echo "🔨 Construyendo el sistema..."

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd backend
npm install
cd ..

# No es necesario construir el backend, solo node se encarga

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Build completado!"
echo "📁 Frontend build disponible en: frontend/build/"
