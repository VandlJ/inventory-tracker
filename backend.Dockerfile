FROM python:3.9-slim

WORKDIR /app

# Copy backend requirements
COPY backend/requirements.txt ./backend/

# Install backend dependencies
RUN cd backend && pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Set environment variables
ENV PYTHONPATH=/app/backend
ENV PORT=8000
ENV HOST=0.0.0.0

# Expose port
EXPOSE 8000

# Start backend
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--app-dir", "/app/backend"] 