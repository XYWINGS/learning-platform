# Use the official Node.js image as the base
FROM node:lts-alpine

# Set the working directory
WORKDIR /Users/imandialuthge/Desktop/SLIIT/Year 03/Semester 2/DS/Assignment/learning-platform/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the React app
RUN npm run build