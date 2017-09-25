// global $, jQuery
"use strict";

import AppController from "../AppController";

export default class IndexController extends AppController {
  static get page() {
    return "index";
  }
  
  constructor(){
    super();
    this.initialize();
  }
  
  initialize(){
    const btn_install = $("#install");
    const btn_init = $("#init");
    const btn_dev = $("#develop");
  
    btn_install.on("click", (e) => {
      e.stopPropagation();
      const template = $(".templates .install").wrap("<div/>").parent().html();
      this.popUp(template);
    });
  
    btn_init.on("click", (e) => {
      e.stopPropagation();
      const template = $(".templates .init").wrap("<div/>").parent().html();
      this.popUp(template);
    });
  
    btn_dev.on("click", (e) => {
      e.stopPropagation();
      const template = $(".templates .develop").wrap("<div/>").parent().html();
      this.popUp(template);
    });
  }
  
  popUp(template){
    const layer = $("<div>");
    layer.addClass("layer");
    $("body #main").append(layer);
  
    const popup = $(".popup");
    layer.addClass("dark");
  
    setTimeout(()=>{
      popup.removeClass("hidden");
      popup.append(template);
      popup.find(".template").niceScroll();
    }, 0);

    layer.on("click", (e)=>{
      popup.addClass("hidden");
      layer.removeClass("dark");
      setTimeout(() => {
        popup.empty();
        layer.remove();
      }, 0);
    });
  }
}
