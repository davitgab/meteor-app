# FROM node:12

# RUN apt-get install -y curl

# RUN curl https://install.meteor.com/ | /bin/sh

# ADD . /opt/test-app/app

# WORKDIR /opt/test-app/app/programs/server

# RUN npm install

# WORKDIR /opt/test-app/app
# # Set environment variables
# ENV PORT 80

# ENV ROOT_URL http://127.0.0.1

# ENV MONGO_URL mongodb://localhost:27017/meteor
# # Expose port 80
# EXPOSE 80
# # Start the app
# CMD node ./main.js

FROM node:12

RUN apt-get install -y curl

RUN curl https://install.meteor.com/ | /bin/sh

ADD . /opt

WORKDIR /opt

ENV PORT 80

ENV ROOT_URL http://127.0.0.1

ENV MONGO_URL mongodb://localhost:27017/meteor

ENV SERVER_HOST "localhost"

RUN meteor npm install --save @babel/runtime

RUN meteor build . --server=${SERVER_HOST} --directory --allow-superuser

WORKDIR /opt/bundle/programs/server

RUN npm install

WORKDIR /opt/bundle

EXPOSE 80

CMD node ./main.js