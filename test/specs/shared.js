function Shared(){
  // store these functions to restore later because we are messing with them
  this.stdout_write = process.stdout.write;
  this.stderr_write = process.stderr.write;
  this.console_log = console.log;
  this.console_error = console.error;
  
  this.stdout = "";
  this.stderr = "";
  this.stdout_err = "";
  
  this.testdata = {
    input: __dirname + "/../testdata/input/src/",
    expected: __dirname + "/../testdata/input/dst/",
    output: __dirname + "/../testdata/output/dst/"
  };
  
  this.testConfig = {
    src: this.testdata.input,
    dst: this.testdata.output,
    root: this.testdata.output,
    env: "development"
  };
}

Shared.prototype.suppressConsole = function(){
  // store these functions to restore later because we are messing with them
  this.stdout_write = process.stdout.write;
  this.stderr_write = process.stderr.write;
  this.console_log = console.log;
  this.console_error = console.error;
  
  // our stub will concatenate any output to a string
  process.stdout.write = console.log = function(s) {
    this.stdout += s + "\n";
    this.stdout_err += s + "\n";
  }.bind(this);
  
  process.stderr.write = console.error = function(s) {
    this.stderr += s + "\n";
    this.stdout_err += s + "\n";
  }.bind(this);
  
  return this;
};

Shared.prototype.resetConsole = function(cb){
  process.stdout.write = this.stdout_write;
  process.stderr.write = this.stderr_write;
  console.log = this.console_log;
  console.error = this.console_error;
  
  if(cb && typeof(cb) === "function") cb();
  
  return this;
};

Shared.prototype.getConsoleOutput = function(){
  return this.stdout;
};

Shared.prototype.getConsoleError = function(){
  return this.stderr;
};

Shared.prototype.getAllOutput = function(){
  return this.stdout_err;
};

module.exports = Shared;
