FROM node:alpine as build

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package*.lock ./

# If you are building your code for production
# RUN npm ci --omit=dev
RUN npm i --omit=dev
# or for development
# RUN npm install

# Bundle app source
COPY . .

# Copy entry.server.js to build folder
RUN cp ./src/entry.server.ts ./entry.server.js

# Expose port 3000
EXPOSE 3000

# Set environment variables: NODE_ENV=development or production
ENV NODE_ENV=development

# Run the app
CMD ["node", "-r", "dotenv/config", "./entry.server.js"]
