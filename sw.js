/* トイレいったら ガチャ / Service Worker */
const V="toilet-gacha-v2";
const SHELL=["./","./index.html","./manifest.webmanifest","./for-parents/",
  "./icons/icon-192.png","./icons/icon-512.png","./icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys()
  .then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const req=e.request;if(req.method!=="GET")return;
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{
    if(res.ok&&new URL(req.url).origin===location.origin){const c=res.clone();caches.open(V).then(x=>x.put(req,c))}
    return res}).catch(()=>caches.match("./index.html"))))});
