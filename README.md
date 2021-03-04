# TMP SubApp template

Includes two views: `template/home` to display no home page and `template/example`  - just a template for a view.

## How to build

### Docker

To generate `dist` folder without installing NPM packages and adding local garbage, use these commands:

1. Build image: `docker build -f Dockerfile.prod -t template .` in the root folder.
2. Run container: `docker run --name temp template`
3. Copy `dist` folder from container: `docker cp temp:/app/dist ./dist`
4. Remove the container: `docker rm temp`
5. Remove the image: `docker image rm template`

That's it.

P.S. On Linux or Mac you can just run `docker_build.cmd` script.
P.P.S. Before run please remove `dist` folder, if any.

### Docker compose

#### Production mode

In root folder run `docker-compose up` to build the files. Result will be
placed into `dist` folder.

#### Development + watch mode

In root folder run `docker-compose -f docker-compose.watch.yml up` to build the files. Result will be placed into `dist` folder and application will start watching. Webserver will be available on URL `localhost:3030`.

`node_modules` and `dist` folders will be mapped. Webpack will start watching.

### CLI (with local NPM install)

1. `npm i`
2. `npm run build` or `npm run build:dev`
3. `npm run build --watch` or `npm run build:dev --watch` to start watching.
