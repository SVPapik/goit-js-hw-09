!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body"),d=null;e.disabled=!0,t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,d=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),e.addEventListener("click",(function(){clearInterval(d),t.disabled=!1,e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.3abb10b6.js.map
