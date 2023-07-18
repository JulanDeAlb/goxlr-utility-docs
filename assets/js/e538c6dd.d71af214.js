"use strict";(self.webpackChunkgoxlr_utiltiy_docs=self.webpackChunkgoxlr_utiltiy_docs||[]).push([[4066],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),u=i,g=d["".concat(s,".").concat(u)]||d[u]||m[u]||a;return n?r.createElement(g,o(o({ref:t},p),{},{components:n})):r.createElement(g,o({ref:t},p))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:i,o[1]=l;for(var c=2;c<a;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3666:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=n(7462),i=(n(7294),n(4137));const a={id:"getting-started",title:"Getting started",sidebar_position:1},o="Getting started",l={unversionedId:"development/api/getting-started",id:"development/api/getting-started",title:"Getting started",description:"The GoXLR Utility is an 'API Driven' application, meaning all configuration happens via an API.",source:"@site/docs/development/api/getting-started.md",sourceDirName:"development/api",slug:"/development/api/getting-started",permalink:"/goxlr-utility-docs/docs/development/api/getting-started",draft:!1,editUrl:"https://goxlr-on-linux.github.io/goxlr-utility-docs/docs/development/api/getting-started.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"getting-started",title:"Getting started",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"API",permalink:"/goxlr-utility-docs/docs/category/api"},next:{title:"Unix Socket/Named Pipe",permalink:"/goxlr-utility-docs/docs/development/api/unix-named"}},s={},c=[{value:"Communication Methods",id:"communication-methods",level:2}],p={toc:c},d="wrapper";function m(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"getting-started"},"Getting started"),(0,i.kt)("p",null,"The GoXLR Utility is an 'API Driven' application, meaning all configuration happens via an API.",(0,i.kt)("br",null),"\nThe ",(0,i.kt)("inlineCode",{parentName:"p"},"goxlr-client")," binary and Web UI are examples of API clients, and the message format is simple JSON."),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"If you want to create a library or anything else,\nplease consider adding a disclaimer that this project is not supported by,\nor affiliated in any way with, TC-Helicon and add the Music Tribe License."),(0,i.kt)("p",{parentName:"admonition"},"It can be found here: ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/GoXLR-on-Linux/goxlr-utility/blob/main/LICENSE-3RD-PARTY"},"3rd-Party-License"))),(0,i.kt)("h2",{id:"communication-methods"},"Communication Methods"),(0,i.kt)("p",null,"There are currently three methods of communication with the API:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The Unix Socket ",(0,i.kt)("inlineCode",{parentName:"li"},"/tmp/goxlr.socket"),", or on Windows the Named Pipe ",(0,i.kt)("inlineCode",{parentName:"li"},"@goxlr.socket")," which are always present"),(0,i.kt)("li",{parentName:"ul"},"Simple HTTP Requests via ",(0,i.kt)("inlineCode",{parentName:"li"},"/api/command")," on the embedded web server"),(0,i.kt)("li",{parentName:"ul"},"Websocket communication via ",(0,i.kt)("inlineCode",{parentName:"li"},"/api/websocket")," on the embedded web server")),(0,i.kt)("p",null,"Note, that all three interfaces have the same JSON message processing and responses attached to them\n(so any command will work on all three), however the websocket has an additional JSON Patch mechanism, for real-time updates."),(0,i.kt)("p",null,"We'll go through each of these, and how to communicate with them."))}m.isMDXComponent=!0}}]);