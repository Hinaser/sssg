"use strict";

import AppController from "../AppController";

export default class DevController extends AppController {
  static get page() {
    return "dev";
  }
  
  constructor(){
    super();
    
    this.sidebarLogo = $(".sidebar-logo > img");
    this.sidebarMenu = $(".sidebar-menu ul.nav > li");
    this.sidebarToggle = $(".sidebar-toggle");
    
    this.setMenuAnime();
    this.setMenuToggleEvent();
    
    this.sidebarLogo.on("click", (e) => {
      window.location = "../../";
    });
    
    $("#sidebar-area").niceScroll();
    $("#content-area").niceScroll({autohidemode: "hidden"});
  
    const input = $(".switcher .input");
    const dev = $(".switcher .dev");
    const output = $(".switcher .output");
  
    let currentImage = 0;
    let timer = setInterval(() => {
      if(currentImage === 0) dev.trigger("click", "auto");
      if(currentImage === 1) output.trigger("click", "auto");
      if(currentImage === 2) input.trigger("click", "auto");
      currentImage = ++currentImage % 3;
    }, 3000);
    
    const showInputImage = (e) => {
      $(".overview-image .switcher .btn").removeClass("out").removeClass("dev");
      $(".overview-image .source-sample").removeClass("hidden");
      $(".overview-image .dev-sample").addClass("hidden");
      $(".overview-image .result-sample").addClass("hidden");
    };
    
    const showDevImage = (e) => {
      $(".overview-image .switcher .btn").removeClass("out").addClass("dev");
      $(".overview-image .source-sample").addClass("hidden");
      $(".overview-image .dev-sample").removeClass("hidden");
      $(".overview-image .result-sample").addClass("hidden");
    };
  
    const showOutputImage = (e) => {
      $(".overview-image .switcher .btn").removeClass("dev").addClass("out");
      $(".overview-image .source-sample").addClass("hidden");
      $(".overview-image .result-sample").removeClass("hidden");
      $(".overview-image .dev-sample").addClass("hidden");
    };
  
    input.on("click", showInputImage);
    dev.on("click", showDevImage);
    output.on("click", showOutputImage);
    $(".switcher .clickable").on("click", (e, data) => {
      if(data !== "auto" && timer){
        clearTimeout(timer);
        timer = null;
      }
    });
  }
  
  setMenuAnime(){
    const handleMenuEvent = (page, cssClass) => {
      const menu = this.sidebarMenu.find(`a[data-page='${page}']`);
      menu.on("mouseenter", (e) => this.sidebarLogo.addClass(cssClass));
      menu.on("mouseleave", (e) => this.sidebarLogo.removeClass(cssClass));
    };
  
    handleMenuEvent("overview", "rotate60");
    handleMenuEvent("build", "rotate120");
    handleMenuEvent("usage", "rotate180");
    handleMenuEvent("code_html", "rotate240");
    handleMenuEvent("code_style", "rotate300");
    handleMenuEvent("code_js", "rotate360");
  }
  
  setMenuToggleEvent(){
    const sidebarArea = $("#sidebar-area");
    this.sidebarToggle.on("click", (e) => {
      sidebarArea.toggleClass("expand");
    });
  
    sidebarArea.on("transitionend", (e) => {
      sidebarArea.getNiceScroll().resize();
    });
  }
}
