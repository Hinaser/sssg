# sssg - Simple Static Site Generator
<a href="https://travis-ci.org/Hinaser/sssg" target="_blank"><img src="https://travis-ci.org/Hinaser/sssg.svg" alt="Build Status"></a>
<a href="https://coveralls.io/github/Hinaser/sssg" target="_blank"><img src="https://coveralls.io/repos/github/Hinaser/sssg/badge.svg" alt="Coverage Status"></a>

Generate static website from developer-friendly languages like pug, stylus, es6.

[![](https://raw.github.com/Hinaser/sssg/master/lib/templates/readme/src/image/sssg-build-image.png)](https://hinaser.github.io/sssg/)

See [document](https://hinaser.github.io/sssg) for details.

# Install
```
npm install -g git+https://github.com/Hinaser/sssg
```

# Try prototyping
```
sssg try
```

After dispatching `sssg try`,
- Directories `./src` and `./dst` will be created at your working directory.
- Browser app will launch and open `./docs/index.html`.
- The web page in browser will be live-reloaded when you update files in `./src` folder. 

|dir|description|
|---|-----------|
|`./src`|Stores files to be edited.  |
|`./docs`|Stores files to be served by web server|

You can freely edit files in the `./src` folder and see changes on your browser's page.
