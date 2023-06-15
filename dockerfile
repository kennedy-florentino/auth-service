FROM node:16
COPY tsconfig.json /app/
COPY tsconfig.build.json /app/
COPY src /app/src/
COPY package.json /app/
COPY package-lock.json /app/
WORKDIR /app
RUN npm install
RUN npm run build
CMD ["node", "dist/index.js"]