FROM node:6.9.2
EXPOSE 3010 
COPY ./* ./
RUN npm install
CMD node index.js
