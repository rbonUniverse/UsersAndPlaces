FROM node:18.16-alpine3.17
# Create app directory and user
RUN addgroup app && adduser -S -G app app
# install dependencies

RUN npm i -g npm@latest
# set user
USER app
# Copy app source code and install dependencies
WORKDIR /app/Frontend
COPY ./Frontend/package*.json .
RUN npm ci --production
# Copy app source code and install dependencies
WORKDIR /app/
COPY ./Backend/package*.json .
RUN npm ci --production
WORKDIR /app/Frontend
COPY ./Frontend .
RUN npm run build
EXPOSE 3001
WORKDIR /app
COPY ./Backend/ .
CMD ["npm", "start"]