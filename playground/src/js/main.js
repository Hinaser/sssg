// global $, jQuery

import {
  describeInstall,
  describeInit,
  describeDevelop
} from './sub1.part';

$(() => {
  const btn_install = $("#install");
  const btn_init = $("#init");
  const btn_dev = $("#develop");
  
  btn_install.on("click", (e) => {
    describeInstall(e.target);
  });
  
  btn_init.on("click", (e) => {
    describeInit(e.target);
  });
  
  btn_dev.on("click", (e) => {
    describeDevelop(e.target);
  });
});
