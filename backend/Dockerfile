FROM node:lts

RUN mkdir -p /home/node/backend/node_modules && chown -R node:node /home/node/backend

WORKDIR /home/node/backend

COPY ./package.json ./yarn.* ./

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait

# RUN chmod +x /wait

USER node

COPY --chown=node:node . .

RUN rm -rf node_modules

RUN yarn

RUN yarn build

EXPOSE 3333

CMD yarn start
# CMD /wait && yarn build:migrations && yarn build:seeds && yarn start
