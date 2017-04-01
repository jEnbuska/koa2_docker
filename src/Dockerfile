FROM node:boron

RUN apt-get update -y;apt-get install netcat -y --fix-missing
# Create app directory
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production && mkdir -p /usr/src/app/node_modules/
RUN cp -a /tmp/node_modules /usr/src/app/
WORKDIR /usr/src/app


# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]
