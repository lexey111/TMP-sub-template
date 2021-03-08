import * as React from 'react';
import {TcSmartLayout, TcViewTitle} from 'TMPUILibrary/layout';
import {TcNavAnchor} from 'TMPUILibrary/navigation';
import {SyntaxHighlight} from 'TMPUILibrary/ui-elements';

export const AppManual: React.FC = () => {
	return <>
		<TcViewTitle>
			Sub-app template: manual
		</TcViewTitle>

		<TcSmartLayout navigationMode={'scroll'} layoutClassName={'template-manual'}>
			<TcNavAnchor>Overview</TcNavAnchor>

			<p>
				What do you need to create new sub-application?
			</p>

			<p>
				First, create new folder in the <code>subapps</code> folder. Usual naming for sub-apps is <code>TMP-sub-%code%</code>.
			</p>

			<p>
				<i>Code</i> of sub-application must be unique and JS-variable-naming-compatible. Suppose it is "my cool application" - code has to be
				<code>my_cool_application</code>, application folder named <code>TMP-sub-mycool-app</code>.
			</p>

			<TcNavAnchor>Setting up files</TcNavAnchor>

			<p>
				Then you need to copy the content of existing sub-application inside your brand new folder. Let's assume you're starting
				with <code>TMP-sub-template</code> because it is designed for this goal.
			</p>

			<p>
				So do copy content of <code>TMP-sub-template</code> into <code>TMP-sub-mycool-app</code> folder.
			</p>

			<p>
				Remove any <code>.idea</code> and <code>.git</code> folders (especially the last one).
			</p>

			<p>
				Remove <code>dist</code> folder, if any.
			</p>

			<p>
				Remove source code you don't need: <code>src/app/home</code> if you don't need Home Card, <code>src/app/manual</code> (this text).
			</p>

			<TcNavAnchor>Setting up application</TcNavAnchor>

			<p>
				In the <code>build/app-config.js</code> replace the application code:
			</p>

			<SyntaxHighlight content={`module.exports = {
	appName: 'template', // <- my_cool_app
};
`}/>

			<p>
				In file <code>src/@index.tsx</code> remove unnecessary views registrations:
			</p>

			<SyntaxHighlight content={`// register target subapp/view
SubApplication.registerSimpleView('template/example', <AppTemplate/>);

// register target subapp/view - documentation page
SubApplication.registerSimpleView('template/manual', <AppManual/>);

// register view which will be automatically placed to home page
SubApplication.registerSimpleView('template/home', <AppTemplateHome/>);
`}/>

			<p>
				Replace view(s) id:
			</p>

			<SyntaxHighlight content={`// register target subapp/view
SubApplication.registerSimpleView('my_cool_app/my_cool_page', <AppTemplate/>);
`}/>

			<p>
				Remove imports of unnecessary stylesheets from <code>src/index.less</code>.
			</p>

			<SyntaxHighlight content={`@import "app/home/home.less"; // remove unused
@import "app/template/template.less";
@import "app/manual/manual.less";
`} language={'less'}/>

			<TcNavAnchor>Setting up package.json</TcNavAnchor>

			<p>
				In <code>package.json</code> edit build info:
			</p>

			<SyntaxHighlight content={`{
	"name": "tmp-sub-app-template", // <- tmp-sub-my-cool-app
	"version": "1.0.0",
	"description": "UAC PoC - subapp template",
	"repository": {
		"type": "git",
		"url": "https://github.com/lexey111/TMP-sub-template"
	},
	"keywords": [
		"uac",
		"tmp",
		"app template"
	],
	"author": "lexey111",
}`}/>

			<TcNavAnchor>Setting up build environment</TcNavAnchor>

			<p>
				In the <code>docker-compose*.yml</code> files edit container code:
			</p>

			<SyntaxHighlight content={`version: '3'
services:
  tmp-sub-template: // <- tmp-sub-my-cool-app
    working_dir: /app
`}/>

			<p>
				In the <code>docker_build.cmd</code> file tune names of build parts as well (replace <code>template</code> with <code>my_cool_app</code>):
			</p>

			<SyntaxHighlight language={'shell'} content={`#!/bin/bash
docker build -f Dockerfile.prod -t template .
docker run --name temp template
docker cp temp:/app/dist ./dist
docker rm temp
docker image rm template
`}/>
			<p>
				Update <code>README.md</code> file according to changes.
			</p>

			<p>
				Set up correct port for online mode in the <code>build/webpack.config.js</code> file:
			</p>

			<SyntaxHighlight content={`devServer: {
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Expose-Headers': 'Content-Length'
	},
	contentBase: path.resolve('./dist'),
	historyApiFallback: true,
	compress: false,
	port: 3034, // <- here
},
`}/>
			<p>
				And do the same for <code>docker-compose.start.yml</code> and <code>docker-compose.watch.yml</code> files:
			</p>

			<SyntaxHighlight content={`version: '3'
services:
  tmp-sub-template:
    working_dir: /app
    build: .
    command: npm run start
    volumes:
      - ./:/app
      - /app/node_modules
    tty: true
    ports:
      - 3034:3034 // <- here
    stdin_open: true
    environment:
      - CHOKIDAR_USEPOLLING=true`}/>

			<TcNavAnchor>Registering</TcNavAnchor>

			<p>
				You need to register your application in the Host application and/or in the Composer.
			</p>

			<p>
				In the <code>TMP-host/config/subapps.config.js</code> file add your section:
			</p>

			<SyntaxHighlight content={`{
	// ...
	example_vue: {
		name: 'Vue JS',
		dist: 'TMP-sub-vue/dist',
		homeCard: true,
		entry: 'example_vue.js',
		styles: 'example_vue.css'
	},
	my_cool_app: { // <- here
		name: 'My cool application',
		online: true,
		homeCard: true, // if you provide it
		entry: 'http://localhost:3031/my_cool_app.js', // <- set up the port!
		styles: 'http://localhost:3031/my_cool_app.css',
		routes: [{ // <-- if you need an icon in sidebar
			path: 'mycoolapp', // url: ...site.com/mycoolapp
			view: 'my_cool_app/my_cool_page', // bundleName/viewName
			spineIcon: 'Star',
			spineTitle: 'Cool page'
		}]
	}
}`}/>
			<p>
				Or for offline configuration &mdash;
			</p>
			<SyntaxHighlight content={`{
	// ...
	example_vue: {
		name: 'Vue JS',
		dist: 'TMP-sub-vue/dist',
		homeCard: true,
		entry: 'example_vue.js',
		styles: 'example_vue.css'
	},
	my_cool_app: { // <- here
		name: 'My cool application',
		dist: 'TMP-sub-mycool-app/dist',
		homeCard: true, // if you provide it
		entry: 'my_cool_app.js',
		styles: 'my_cool_app.css',
		routes: [{ // <-- if you need an icon in sidebar
			path: 'mycoolapp', // url: ...site.com/mycoolapp
			view: 'my_cool_app/my_cool_page', // bundleName/viewName
			spineIcon: 'Star',
			spineTitle: 'Cool page'
		}]
	}
}`}/>
			<p>
				For Composer register your application in the <code>TMP-composer/config/subapps.config.js</code>:
			</p>

			<SyntaxHighlight content={`{
	// ...
	example_vue: {
		name: 'Vue JS',
		dist: 'TMP-sub-vue/dist',
		homeCard: true,
		entry: 'example_vue.js',
		styles: 'example_vue.css'
	},
	my_cool_app: { // <- here
		name: 'My cool application',
		dist: 'TMP-sub-mycool-app/dist',
		homeCard: true, // if you provide it
		entry: 'my_cool_app.js',
		styles: 'my_cool_app.css',
		routes: [{ // <-- if you need an icon in sidebar
			path: 'mycoolapp', // url: ...site.com/mycoolapp
			view: 'my_cool_app/my_cool_page', // bundleName/viewName
			spineIcon: 'Star',
			spineTitle: 'Cool page'
		}]
	}
}`}/>

			<p>
				Yes, it's the same as for offline mode.
			</p>

			<TcNavAnchor>Finalize</TcNavAnchor>

			<p>
				Run <code>npm install</code> to update <code>package-lock.json</code>.
			</p>

			<p>
				Run <code>npm run build</code> to pre-build <code>dist</code> folder.
			</p>

			<p>
				Build and run Host application (<code>TMP-host/npm run start</code>) and/or Composer (<code>TMP-composer/npm run start</code>). Open browser page at
				<code>localhost:3030</code> and try to navigate your application.
			</p>

			<p>
				Register GitHub repository and push the files.
			</p>

			<p>
				Try to run all the Docker modes (see README.md): build Docker image, run <code>docker-compose-*</code> commands,
				check <code>docker-compose.yml</code> build script. Everything should work.
			</p>
		</TcSmartLayout>
	</>;
};
