# Use the official Node.js image as the base
FROM node:lts-alpine



# Set the working directory
#WORKDIR /Users/imandialuthge/Desktop/SLIIT/Year 03/Semester 2/DS/Assignment/learning-platform/client
WORKDIR /SLIIT/DS/learning-platform/client



# Copy package.json and package-lock.json
COPY package*.json yarn.lock ./



# Install dependencies
RUN yarn install --frozen-lockfile



# Copy the entire project
COPY . .



# Build the React app
RUN yarn build



# Expose port 3000 to the outside world
EXPOSE 3000



# Command to run the React app
CMD ["yarn", "dev"]