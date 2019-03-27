var divs = $("div");
var highlight = $("div.highlight");
var third = $("#third");


divs.css("background", "purple");
highlight.css("width", "200px");
third.css("border", "2px solid orange");
divs.eq(0).css("color", "pink");
// Could also use:
// $("div:first-of-type") or $("div:first")