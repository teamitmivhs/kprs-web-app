# Use the official Node.js image
FROM node:24

# Set working directory inside the container
WORKDIR /kprs/src/frontend/

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Run your app
CMD ["npm", "run", "dev"]
