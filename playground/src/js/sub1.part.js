// global $, jQuery
"use strict";

function popUp(template){
  const layer = $("<div>");
  layer.addClass("layer");
  $("body").append(layer);
  
  const popup = $(".popup");
  popup.removeClass("hidden");
  popup.addClass("template");
  
  layer.on("click", (e)=>{
    popup.addClass("hidden").removeClass("template");
    layer.removeClass("dark");
    setTimeout(() => {
      popup.empty();
      layer.remove();
    }, 0);
  });
  
  setTimeout(()=>{
    layer.addClass("dark");
    popup.append(template);
  }, 0);
}

export function describeInstall(elm){
  const template = $(".templates .install").html();
  popUp(template);
}

export function describeInit(elm){
  const template = $(".templates .init").html();
  popUp(template);
}

export function describeDevelop(elm){
  const template = $(".templates .develop").html();
  popUp(template);
}
