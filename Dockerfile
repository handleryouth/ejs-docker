FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
ENV SERVER_PORT=8000
RUN npm install --silent && mv node_modules ../
COPY . .
EXPOSE 8000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "dev"]
