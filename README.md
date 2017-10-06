# sssg - Simple Static Site Generator
[![Build status](https://travis-ci.org/Hinaser/sssg.svg)](https://travis-ci.org/Hinaser/sssg)
[![Coverage status](https://coveralls.io/repos/github/Hinaser/sssg/badge.svg)](https://coveralls.io/github/Hinaser/sssg)
[![npm version](https://badge.fury.io/js/sssg.svg)](https://badge.fury.io/js/sssg)

Generate static website from developer-friendly languages like pug, stylus, es6.

Not limited to es6, you can develop with ReactJS, flow-type, and any other frameworks/languages
which babel can transpile. See detail in [Build Mechanism](https://hinaser.github.io/sssg/contents/build.html).

[![](https://raw.github.com/Hinaser/sssg/master/lib/templates/readme/src/image/sssg-build-image.png)](https://hinaser.github.io/sssg/)

See [document](https://hinaser.github.io/sssg) for details.

# Install
```
npm install -g sssg
```

# Try prototyping
```
sssg try
```

After dispatching `sssg try`,
- Directories `./src` and `./docs` will be created at your working directory.
- Browser app will launch and open `./docs/index.html`.
- The web page in browser will be live-reloaded when you update files in `./src` folder. 

|dir|description|
|---|-----------|
|`./src`|Stores files to be edited.  |
|`./docs`|Stores files to be served by web server|

You can freely edit files in the `./src` folder and see changes on your browser's page.
