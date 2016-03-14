(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ImageCropper = require('./imagecrop.min.js');

var dimensions = null;
var is_active = false;
var img_c = null;

var onUpdateHandler = function (dim) {
  dimensions = dim;
};

var onCropHandler = function() {
  var img = new Image();
  img.src = img_c.crop('image/jpeg', 1);
  img.width = dimensions.w;
  img.height = dimensions.h;
  var target = document.querySelector('.preview');
  while(target.firstChild) {
    target.removeChild(target.firstChild)
  }
  target.appendChild(img);
};

var onCreateHandler = function() {
  if(is_active) { return; }

  new ImageCropper('.test-imagecrop', 'img.jpg', {
    update: onUpdateHandler
  });
  destroy_btn.style.display = 'initial';
  create_btn.style.display = 'none';

  is_active = true;
};

var onDestroyHandler = function() {
  if(!is_active) { return; }

  img_c.destroy();
  destroy_btn.style.display = 'none';
  create_btn.style.display = 'initial';

  is_active = false;
};

var crop_btn = document.querySelector('.crop-button');
crop_btn.addEventListener('click', onCropHandler);

var create_btn = document.querySelector('.create-button');
create_btn.addEventListener('click', onCreateHandler);
create_btn.style.display = 'none';

var destroy_btn = document.querySelector('.destroy-button');
destroy_btn.addEventListener('click', onDestroyHandler);

img_c = new ImageCropper('.test-imagecrop', 'img.jpg', {
  update: onUpdateHandler,
  min_crop_width: 100,
  min_crop_height: 150,
  mode: 'circular',
  fixed_size: true,
  create_cb: function(dim) {
    console.log('created - ', dim);
  },
  destroy_cb: function() {
    console.log('destroy');
  }
});
is_active = true;
},{"./imagecrop.min.js":2}],2:[function(require,module,exports){
module.exports=function(){function e(e){var t=s.getBoundingClientRect(),n=e.clientX-t.left,o=e.clientY-t.top;return{x:0>n?0:n>t.width?t.width:n,y:0>o?0:o>t.height?t.height:o}}function t(){var e=parseInt(s.style.width),t=parseInt(s.style.height);y.x<0&&(y.x=0,y.x2=y.w),y.y<0&&(y.y=0,y.y2=y.h),y.x2>e&&(y.x2=e,y.x=y.x2-y.w),y.y2>t&&(y.y2=t,y.y=y.y2-y.h),y.w=y.x2-y.x,y.h=y.y2-y.y,a.style.top=y.y+"px",a.style.left=y.x+"px",a.style.right=~~(e-y.x2)+"px",a.style.bottom=~~(t-y.y2)+"px";var n=["M 0 0 v",t,"h",e,"v",-t,"H-0zM"].join("");if("square"===x.mo)n+=[y.x,y.y,"h",y.w,"v",y.h,"h",-y.w,"V",-y.h,"z"].join(" ");else if("circular"===x.mo){var o=.5*y.w;n+=[y.x+.5*y.w,y.y+.5*y.h,"m",-o,",0","a",o,",",o,"0 1,0",y.w,",0","a",o,",",o,"0 1,0",-y.w,",0","z"].join(" ")}d.setAttribute("d",n),x.up&&x.up(y)}function n(n){n=e(n),y.x=n.x-.5*y.w,y.y=n.y-.5*y.h,y.x2=n.x+.5*y.w,y.y2=n.y+.5*y.h,t()}function o(e){s&&this.destroy(),s=document.querySelector(e),s.className+=s.className.indexOf("imgc")>-1?"":" imgc"}function i(e){document.addEventListener("mousemove",r),document.addEventListener("mouseup",m),n(e)}function m(e){document.removeEventListener("mouseup",m),document.removeEventListener("mousemove",r)}function r(e){n(e)}function c(n,o,i){function m(e){e.stopPropagation(),document.addEventListener("mouseup",c),document.addEventListener("mousemove",r)}function r(n){n.stopPropagation(),n=e(n),i(n),t()}function c(e){e.stopPropagation(),document.removeEventListener("mouseup",c),document.removeEventListener("mousemove",r)}var h=document.createElement("span");return h.className="imgc-handles-el-"+n+"-"+o,h.addEventListener("mousedown",m),h}function h(e,t,n){t&&e&&(n=n||{},Object.keys(f).forEach(function(e){x[f[e][0]]=n[e]||f[e][1]}),x.mcw>80&&(y.x2=y.w=x.mcw),x.mch>80&&(y.y2=y.h=x.mch),x.fs&&(x.mcw>80||x.mch>80)&&(y.x2=y.y2=y.w=y.h=x.mcw>x.mch?x.mcw:x.mch),o.call(this,e),l=new Image,l.addEventListener("load",function(e){this.create()}.bind(this)),l.src=t)}var s,a,d,u=!1,y={},x={},l=null,w={w:1,h:1},f={update_cb:["up",!1],create_cb:["cr",!1],destroy_cb:["de",!1],min_crop_width:["mcw",32],min_crop_height:["mch",32],max_width:["mw",500],max_height:["mh",500],fixed_size:["fs",!1],mode:["mo","square"]},v={circular:[function(e){console.log("scaling up and down")}],square:[function(e){var t=y.x;v[x.mo][7](e),x.fs?y.y+y.x-t<0?(y.x=t-y.y,y.y=0):y.y+=y.x-t:v[x.mo][4](e)},function(e){var t=y.x2;v[x.mo][5](e),x.fs?y.y-y.x2+t<0?(y.x2=t+y.y,y.y=0):y.y-=y.x2-t:v[x.mo][4](e)},function(e){var t=y.x2;if(v[x.mo][5](e),x.fs){var n=s.getBoundingClientRect();y.y2+y.x2-t>n.height?(y.x2=t+(n.height-y.y2),y.y2=n.height):y.y2+=y.x2-t}else v[x.mo][6](e)},function(e){var t=y.x;if(v[x.mo][7](e),x.fs){var n=s.getBoundingClientRect();y.y2+(t-y.x)>n.height?(y.x=t-(n.height-y.y2),y.y2=n.height):y.y2-=y.x-t}else v[x.mo][6](e)},function(e){y.y=y.y2-e.y<x.mch?y.y2-x.mch:e.y},function(e){y.x2=e.x-y.x<x.mcw?y.x+x.mcw:e.x},function(e){y.y2=e.y-y.y<x.mch?y.y+x.mch:e.y},function(e){y.x=y.x2-e.x<x.mcw?y.x2-x.mcw:e.x}]};return h.prototype.create=function(e){if(!u){s||o.call(this,e);var n=l.width,m=l.height;n>x.mw&&(m=~~(x.mw*m/n),n=x.mw),m>x.mh&&(n=~~(x.mh*n/m),m=x.mh),w={w:l.naturalWidth/n,h:l.naturalHeight/m},s.style.width=n+"px",s.style.height=m+"px",s.addEventListener("DOMNodeRemovedFromDocument",this.destroy),s.appendChild(l);var r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("height",m),r.setAttribute("width",n),s.appendChild(r),d=document.createElementNS("http://www.w3.org/2000/svg","path"),d.setAttribute("fill-rule","evenodd"),r.appendChild(d),a=document.createElement("div"),a.className=["imgc-handles",x.mo].join(" "),s.appendChild(a);var h=v[x.mo];if("square"===x.mo)for(var f=0;f<(x.fs?4:8);f++)a.appendChild(new c(x.fs?0:~~(f/4),f%4,h[f]));else for(var f=0;f<h.length;f++)a.appendChild(new c(2,f,h[f]));s.addEventListener("mousedown",i),u=!0,y={x:0,y:0,x2:0,y2:0,w:0,h:0},n===m?y.x2=y.y2=n:n>m?(y.x2=m,y.y2=x.fs?m:m-(n-m)):m>n&&(y.x2=x.fs?n:n-(m-n),y.y2=n),t(),x.cr&&x.cr({w:n,h:m})}},h.prototype.destroy=function(){if(u){if(s){for(s.removeEventListener("DOMNodeRemovedFromDocument",this.destroy),s.removeEventListener("mousedown",i);s.firstChild;)s.removeChild(s.firstChild);s=l=a=d=null}u=!1,x.de&&x.de()}},h.prototype.crop=function(e,t){(!e||"image/jpeg"!==e&&"image/png"!==e)&&(e="image/jpeg"),(!t||0>t||t>1)&&(t=1);var n=document.createElement("canvas");n.setAttribute("width",y.w),n.setAttribute("height",y.h);var o=n.getContext("2d");return o.drawImage(l,w.w*y.x,w.h*y.y,w.w*y.w,w.h*y.h,0,0,y.w,y.h),n.toDataURL(e,t)},h}();
},{}]},{},[1]);
