/**
 * global $, jQuery
 */
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
    this.mainDiv = $("#main");
    
    this.setMenuAnime();
    this.setMenuToggleEvent();
    
    this.sidebarLogo.on("click", (e) => {
      window.location = "../../";
    });
    
    $("#sidebar-area").niceScroll();
    $("#content-area").niceScroll({autohidemode: "hidden"});
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
