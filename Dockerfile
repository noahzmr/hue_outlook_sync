FROM node:20.1.0

RUN mkdir -p /hue_outlook_syncer

COPY ./hue_outlook_server /hue_outlook_syncer

WORKDIR /hue_outlook_syncer
RUN npm install

CMD ["npm","start"]
