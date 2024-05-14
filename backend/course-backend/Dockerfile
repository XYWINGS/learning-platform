# Use the official Node.js image as the base
FROM node:lts-alpine

# Set the working directory
#WORKDIR 
WORKDIR /Users/XYWINGS/Documents/LP/learning-platform/backend/course-backend

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install 

# Copy the entire project
COPY . .

# Compile TypeScript files
RUN yarn compile

# Expose the port your app runs on
EXPOSE 8090

# Command to run the Node.js application
CMD ["node", "dist/index.js"]