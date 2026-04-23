# Backend Dockerfile for CAC Auto Filler
FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_APP=main.py \
    FLASK_ENV=production

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy required files and install python dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip -r requirements.txt

COPY . .

# Expose the Flask default port
EXPOSE 5000

# Command to run the application using Gunicorn (a production-ready WSGI server)
# The $PORT environment variable is automatically provided by Render at runtime.
# We bind to 0.0.0.0 to listen on all available network interfaces.
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "main:app"]
