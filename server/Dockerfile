# Base Image
FROM node:20-alpine

# Working Directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]