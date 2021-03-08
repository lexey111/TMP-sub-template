# TMP SubApp Template sub-app

## How to build

### Quick start

You can just run `docker_build.cmd` script.

Before run please remove `dist` folder, if any.

### Docker

To generate `dist` folder without installing NPM packages and adding local garbage, use these commands:

1. Build image: `docker build -f Dockerfile.prod -t template .` in the root folder.
2. Run container: `docker run --name temp template`
3. Copy `dist` folder from container: `docker cp temp:/app/dist ./dist`
4. Remove the container: `docker rm temp`
5. Remove the image: `docker image rm template`

### Docker compose

#### Production mode

In root folder run `docker-compose up` to build the files. Result will be
placed into `dist` folder.

#### Development + watch mode

In root folder run `docker-compose -f docker-compose.watch.yml up` to build the files. Result will be placed into `dist` folder and Webpack will start watching.

`node_modules` and `dist` folders will be mapped.

#### Development + online mode

In root folder run `docker-compose -f docker-compose.start.yml up` to build the files. Result will be placed into `dist` folder and application will start watching. Webserver will be available on URL `localhost:3034`.

`node_modules` and `dist` folders will be mapped.

### CLI (with local NPM install)

1. `npm i`
2. `npm run build` or `npm run build:dev`
3. `npm run build:watch` to start watching.
3. `npm run start` to run dev webserver.
