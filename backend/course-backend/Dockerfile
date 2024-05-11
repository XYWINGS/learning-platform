# Base image 
FROM node:16-alpine AS build-stage  
# Working directory within the container
WORKDIR /app

# Copy application code
COPY package*.json ./  
RUN npm install  # Install dependencies (adjust command for your technology stack)

# Base image for the final container 
FROM node:16-alpine

# Expose port
EXPOSE 8090  

# Start command
CMD [ "npm", "start" ]
