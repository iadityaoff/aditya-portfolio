/**
 * Shared by the client store (site-theme.ts) and the server root layout,
 * so it must not be a "use client" module.
 */
export const SITE_THEME_KEY = "at-site-theme";

/**
 * Pre-paint script for <head>: applies the saved, already-compiled variables
 * before first paint so there is no flash of the default theme.
 */
export const SITE_THEME_BOOT = `(function(){try{var s=JSON.parse(localStorage.getItem('${SITE_THEME_KEY}')||'null');if(!s||!s.site)return;var r=document.documentElement;for(var k in s.site)r.style.setProperty(k,s.site[k]);if(s.lab)for(var j in s.lab)r.style.setProperty(j,s.lab[j]);var t=s.theme;r.dataset.theme=t.mode;r.dataset.skin=t.skin||'studio';r.dataset.motion=t.motion||'full';r.dataset.texture=t.texture===false?'off':'on';r.style.colorScheme=t.mode;}catch(e){}})();`;
