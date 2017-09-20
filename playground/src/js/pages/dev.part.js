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
    
    const sidebarLogo = $(".sidebar-logo > img");
    const sidebarMenu = $(".sidebar-menu ul.nav > li");
    
    const handleMenuEvent = (page, cssClass) => {
      const menu = sidebarMenu.find(`a[data-page='${page}']`);
      menu.on("mouseenter", (e) => sidebarLogo.addClass(cssClass));
      menu.on("mouseleave", (e) => sidebarLogo.removeClass(cssClass));
    };
    
    handleMenuEvent("overview", "rotate72");
    handleMenuEvent("code_html", "rotate144");
    handleMenuEvent("code_style", "rotate216");
    handleMenuEvent("code_js", "rotate288");
    handleMenuEvent("misc", "rotate");
  }
}
