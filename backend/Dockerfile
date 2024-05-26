FROM node:lts-buster 

# Create app directory 
WORKDIR /usr/src/app 

# Create a directory logs 
RUN mkdir /logs

ENV NODE_ENV=production

ENV PORT=5001 

ENV AWS_REGION=us-east-1

# Copy dependency definitions
COPY package.json ./package.json

COPY package-lock.json ./package-lock.json 

# Install dependencies 
RUN npm ci 

# Get all the code needed to run the app 
COPY . . 

# Expose the port the app runs in 
EXPOSE 5001 

# Serve the app 
CMD ["npm", "start"] 