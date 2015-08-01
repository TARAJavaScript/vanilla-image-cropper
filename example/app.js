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
  create_cb: function(dim) {
    console.log('created - ', dim);
  },
  destroy_cb: function() {
    console.log('destroy');
  }
});
is_active = true;
},{"./imagecrop.min.js":2}],2:[function(require,module,exports){
module.exports=function(){function e(e,t,n){t&&e&&(L(n),b(e),E=new Image,E.addEventListener("load",function(e){this.create()}.bind(this)),E.src=t)}function t(e){var t=e.clientX-w("left"),n=e.clientY-w("top");return{x:0>t?0:t>w("width")?w("width"):t,y:0>n?0:n>w("height")?w("height"):n}}function n(){g.w=g.w<32?32:g.w,g.h=g.h<32?32:g.h,g.x=g.x<0?0:g.x+g.w>w("width")?w("width")-g.w:g.x,g.y=g.y<0?0:g.y+g.h>w("height")?w("height")-g.h:g.y}function i(){m.style.top=g.y+"px",m.style.left=g.x+"px",m.style.width=g.w+"px",m.style.height=g.h+"px",a.setAttribute("d","M 0 0 v"+w("height")+"h"+w("width")+"v"+-w("height")+"H-0zM"+g.x+" "+g.y+"h"+g.w+"v"+g.h+"h-"+g.w+"V-"+g.h+"z"),f.up&&f.up(g)}function o(e){e=t(e),g.x=e.x-.5*g.w,g.y=e.y-.5*g.h,n(),i()}function h(e){x||(document.addEventListener("mousemove",r),document.addEventListener("mouseup",d),o(e),x=!0)}function d(e){x&&(document.removeEventListener("mouseup",d),document.removeEventListener("mousemove",r),x=!1)}function r(e){x&&o(e)}function u(e,o,h){function d(e){e.stopPropagation(),s=!0,document.addEventListener("mouseup",u),document.addEventListener("mousemove",r)}function r(e){e.stopPropagation(),s&&(h(t(e)),n(),i())}function u(e){e.stopPropagation(),s=!1,document.removeEventListener("mouseup",u),document.removeEventListener("mousemove",r)}var s=!1,h=h,m=e,c=o;this.el=document.createElement("span"),this.el.className="imgc-handles-el-"+m+"-"+c,this.el.addEventListener("mousedown",d)}var s,m,c,a,w=function(e){return s.getBoundingClientRect()[e]},p=[],y=[function(e){g.w+=g.x-e.x,g.h+=g.y-e.y,g.x=e.x,g.y=e.y},function(e){g.w=e.x-g.x,g.h+=g.y-e.y,g.y=e.y},function(e){g.w=e.x-g.x,g.h=e.y-g.y},function(e){g.w+=g.x-e.x,g.x=e.x,g.h=e.y-g.y},function(e){g.h+=g.y-e.y,g.y=e.y},function(e){g.w=e.x-g.x},function(e){g.h=e.y-g.y},function(e){g.w+=g.x-e.x,g.x=e.x}],l=null,v=!1,x=!1,g={x:0,y:0,w:80,h:80},f={},E=null,L=function(e){e=e?e:{},f.up="update"in e?e.update:!1,f.cr="create_cb"in e?e.create_cb:!1,f.de="destroy_cb"in e?e.destroy_cb:!1,f.mw="max_width"in e?e.max_width:500,f.mh="max_height"in e?e.max_height:500},b=function(e){s&&this.destroy(),s=document.querySelector(e),s.className+=" imgc ".indexOf(" "+f.cn+" ")>-1?"":" imgc"};return e.prototype.create=function(e){if(!v){s||setParent(e);var t=E.width,n=E.height;t>f.mw&&(n=~~(f.mw*n/t),t=f.mw),n>f.mh&&(t=~~(f.mh*t/n),n=f.mh),s.style.width=t+"px",s.style.height=n+"px",s.addEventListener("DOMNodeRemoved",this.destroy,!1),s.addEventListener("DOMNodeRemovedFromDocument",this.destroy,!1),l=document.createElement("canvas"),l.setAttribute("width",t),l.setAttribute("height",n),s.appendChild(l),s.appendChild(E),E.width=t,E.height=n,c=document.createElementNS("http://www.w3.org/2000/svg","svg"),c.setAttribute("height",w("height")),c.setAttribute("width",w("width")),s.appendChild(c),a=document.createElementNS("http://www.w3.org/2000/svg","path"),a.style.fill="rgba(0, 0, 0, .8)",c.appendChild(a),m=document.createElement("div"),m.className="imgc-handles",s.appendChild(m),p=[];for(var o=0;8>o;o++)p.push(new u(~~(o/4),o%4,y[o])),m.appendChild(p[o].el);s.addEventListener("mousedown",h),v=!0,i(),f.cr&&f.cr(g)}},e.prototype.destroy=function(){if(v){if(s){for(s.removeEventListener("DOMNodeRemoved",this.destroy),s.removeEventListener("DOMNodeRemovedFromDocument",this.destroy),s.removeEventListener("mousedown",h);s.firstChild;)s.removeChild(s.firstChild);s=l=E=m=p=c=a=null}v=!1,f.de&&f.de()}},e.prototype.crop=function(e,t){(!e||"image/jpeg"!==e&&"image/png"!==e)&&(e="image/jpeg"),(!t||0>t||t>1)&&(t=1);var n={x:g.x,y:g.y,w:g.w,h:g.h};l.setAttribute("width",n.w),l.setAttribute("height",n.h);var i=l.getContext("2d");return i.imageSmoothingEnabled=!1,i.drawImage(E,n.x,n.y,n.w,n.h,0,0,n.w,n.h),l.toDataURL(e,t)},e}();
},{}]},{},[1]);
