if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,d,c)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const f={uri:location.origin+r.slice(1)};return Promise.all(d.map(r=>{switch(r){case"exports":return i;case"module":return f;default:return e(r)}})).then(e=>{const r=c(...e);return i.default||(i.default=r),i})}))}}define("./service-worker.js",["./workbox-d9851aed"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"appicon/192x192.png",revision:"c51a342b671858d36d8db234d21306a4"},{url:"appicon/48x48.png",revision:"0d778ab323b44c5d272aa3810d30b023"},{url:"appicon/512x512.png",revision:"944417c92d62f07248e95e78fcf9db4c"},{url:"appicon/72x72.png",revision:"2fe03073331db9ba2cf2f8e7ebdd4f14"},{url:"appicon/maskable.png",revision:"3b3fcf115ed95da8be2bd7ee9a0099fc"},{url:"bb50ca7ffb0ca7cfc335b8fcaff0f292.ttf",revision:"e713a7fdd207c514f5d17144a52e8094"},{url:"dfb4e4d09bd25b66e27b4cbdbdded022.ttf",revision:"c8f35daa05d411916abd4de0e16a62dc"},{url:"index.css",revision:"85853ba25f605f52ee7a5a3d8cb63ffa"},{url:"index.html",revision:"3b635bf51697f53d28da6ad5f784e779"},{url:"index.js",revision:"1df9ab140de634b1f29c9c6bf7659a53"},{url:"manifest.json",revision:"2e60db4885954639c7de5fa708826910"},{url:"orca.css",revision:"1d2c4ebdcd6bcdfc6a18392b3cd211b1"},{url:"orca.html",revision:"96ac6d9373c658f850cce0533133a0c6"},{url:"orca.js",revision:"b672c2e8cf76897553d7b2af40a2602c"},{url:"pilot.css",revision:"3f1d57c0fb33d2f677a7caa7055b611a"},{url:"pilot.html",revision:"16cdd599c577ddde0b0baf069407ae2f"},{url:"pilot.js",revision:"66f77b6552fe1574f687bf2f07e818e8"}],{})}));