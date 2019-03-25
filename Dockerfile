FROM alpine:3.9

LABEL maintainer="Lauris Vavere <lauris@ma-1.lv>"

RUN apk add --no-cache nodejs npm

WORKDIR /opt/resource/
ENV NODE_NO_WARNINGS=1

COPY package*.json /opt/resource/

RUN npm ci --production

COPY lib/* /opt/resource/lib/
COPY index.js /opt/resource/index.js

RUN cd /opt/resource \
&& chmod +x index.js \
&& ln -s index.js check \
&& ln -s index.js in \
&& ln -s index.js out

