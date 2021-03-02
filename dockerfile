FROM node:12
WORKDIR /api
# Copy package json and install dependencies
COPY package*.json ./
RUN npm install
# Copy our app
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
