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
    
    $("#content-area").niceScroll();
  }
  
  setMenuAnime(){
    const handleMenuEvent = (page, cssClass) => {
      const menu = this.sidebarMenu.find(`a[data-page='${page}']`);
      menu.on("mouseenter", (e) => this.sidebarLogo.addClass(cssClass));
      menu.on("mouseleave", (e) => this.sidebarLogo.removeClass(cssClass));
    };
  
    handleMenuEvent("overview", "rotate72");
    handleMenuEvent("code_html", "rotate144");
    handleMenuEvent("code_style", "rotate216");
    handleMenuEvent("code_js", "rotate288");
    handleMenuEvent("misc", "rotate");
  }
  
  setMenuToggleEvent(){
    this.sidebarToggle.on("click", (e) => {
      $("#sidebar-area").toggleClass("expand");
    });
  }
}
