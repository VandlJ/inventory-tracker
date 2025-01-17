FROM node:18-alpine

# Set working directory
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install --legacy-peer-deps

# Copy frontend source code
COPY frontend/ ./

# Build frontend
RUN npm run build

# Expose port
EXPOSE 3000

# Start frontend
CMD ["npm", "start"] 