FROM node:18-alpine as STAGE_ONE_BUILD
RUN mkdir -p /home/frontend 
COPY package.json /home/frontend
WORKDIR /home/frontend
COPY . .
RUN npm install
RUN npm run build


## second stage
FROM node:18-alpine as STAGE_TWO_PROD
WORKDIR /home/frontend
COPY --from=STAGE_ONE_BUILD /home/frontend/dist/ /home/frontend/dist/
COPY package.json .
COPY vite.config.js .
EXPOSE 8081
CMD ["npm", "run", "preview"]

