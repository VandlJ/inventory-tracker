# Use Node.js as base image for frontend build
FROM node:18-alpine AS frontend-build

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install --legacy-peer-deps

# Copy frontend source code
COPY frontend/ ./

# Build frontend
RUN npm run build

# Use Python for backend
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install supervisor
RUN apt-get update && apt-get install -y supervisor

# Copy backend requirements
COPY backend/requirements.txt ./backend/

# Install backend dependencies
RUN cd backend && pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy frontend from build stage
COPY --from=frontend-build /app/frontend ./frontend

# Set environment variables
ENV PYTHONPATH=/app/backend
ENV BACKEND_PORT=8000
ENV FRONTEND_PORT=3000
ENV HOST=0.0.0.0
ENV MONGODB_URI=mongodb://mongodb:27017

# Create supervisor configuration
RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports
EXPOSE 8000 3000

# Start supervisor
CMD ["/usr/bin/supervisord"]
