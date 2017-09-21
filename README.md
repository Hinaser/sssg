# sssg - Simple Static Site Generator
[![Build Status](https://travis-ci.org/Hinaser/sssg.svg)](https://travis-ci.org/Hinaser/sssg)
[![Coverage Status](https://coveralls.io/repos/github/Hinaser/sssg/badge.svg)](https://coveralls.io/github/Hinaser/sssg)

Generate static website from developer-friendly languages like pug, stylus, es6, flow.

# Install
```
sudo npm install -g git+https://github.com/Hinaser/sssg
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

# Build static web files
```
sssg init ./src
sssg build --src ./src --dst ./docs
```

# Build details
## Source directory
```
<src-dir>/                 <- You can specify src folder locatoin by --src/-s option
 - html/
    - index.pug            <- Cannot be removed. Will be compiled to index.html
    - test/                <- (*) The same folder will be created at dest dir
       - sample1.pug       <- (*) Will be compiled to sample1.html
       - sample2.part.pug  <- (*) Won't be compiled except it is included by any .pug files
 - css/
    - main.styl            <- Cannot be removed. Will be compiled to main.css
    - mixins.styl          <- (*) Won't be compiled except it is imported by main.styl
    - lib/
       - useful-lib.css    <- (*) Files under lib/ will be merged into a file without transformation
 - image/                  <- Will be copied to destination directory
    - sample1.png          <- (*) 
 - js/
    - main.js              <- Cannot be removed.  Will be compiled to main.js in the dest dir.
    - func.js              <- (*) Won't be compiled except it is imported by main.js
    - lib/
       - useful-lib.js     <- (*) Files under lib/ will be merged into a file without transformation
 - misc/
    - anydir
       - anyfile           <- (*) Will be just copied to dst dir without any transformation
```

__(*) Optional. You can freely name/ignore it__

## Destination directory
```
<dst-dir>/                 <- You can specify dst folder locatoin by --dst/-d option
 - index.html              <- Originally <src-dir>/html/index.pug
 - contents/
    - test/                <- User defined folder in the src dir
       - sample1.html      <- User defined html file. Originally <src-dir>/html/test/sample1.pug
 - css/
    - main.css             <- Originally <src-dir>/css/main.styl
    - lib.css              <- A static lib file merged from files under source lib/ directory.
 - image/
    - sample1.png          <- Just a copy from src dir.
 - js/
    - main.js              <- Originally <src-dir>/js/main.js
    - lib.js               <- A static lib file merged from files under source lib/ directory.
 - misc/
    - anydir
       - anyfile           <- Just copied from source misc/ directory
```

### html
sssg will compile `*.pug` files under `<src-dir>/html/` directory.
Files whose extension is `*.part.pug` will be ignored.
`*.part.pug` files can be used to store template to be imported by `.pug` files.

For pug/html, resulted files will be generated into several locations.
The one is just under the directory specified by `--dst` option.
In this location, only `index.html` will be generated from `<src-dir>/html/index.pug`.
All pug files except for `<src-dir>/html/index.pug` will be generated under `<dst-dir>/contents/`.

Custom directories you create under `<src-dir>/html/` directory will be created in the dst folder as well.

### css
sssg will compile `<src-dir>/css/main.styl` into `<dst-dir>/js/main.css`.

### image
sssg will just copy image files from src to dst.

### javascript
sssg will compile `<src-dir>/js/main.js` into `<dst-dir>/js/main.js`.
