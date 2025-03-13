# Use the official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if using npm
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nodemon

# Copy the rest of the project files
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]