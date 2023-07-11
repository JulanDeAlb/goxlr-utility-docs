"use strict";(self.webpackChunkgoxlr_utiltiy_docs=self.webpackChunkgoxlr_utiltiy_docs||[]).push([[265],{4137:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>y});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(t),u=i,y=d["".concat(l,".").concat(u)]||d[u]||m[u]||o;return t?r.createElement(y,a(a({ref:n},c),{},{components:t})):r.createElement(y,a({ref:n},c))}));function y(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[d]="string"==typeof e?e:i,a[1]=s;for(var p=2;p<o;p++)a[p]=t[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},8357:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var r=t(7462),i=(t(7294),t(4137));const o={id:"named-pipe",title:"Named Pipe",sidebar_position:2},a="Named Pipe Example",s={unversionedId:"development/api/examples/named-pipe",id:"development/api/examples/named-pipe",title:"Named Pipe",description:"C",source:"@site/docs/development/api/examples/named-pipe.md",sourceDirName:"development/api/examples",slug:"/development/api/examples/named-pipe",permalink:"/goxlr-utility-docs/docs/development/api/examples/named-pipe",draft:!1,editUrl:"https://goxlr-on-linux.github.io/goxlr-utility-docs/docs/development/api/examples/named-pipe.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"named-pipe",title:"Named Pipe",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Unix Socket",permalink:"/goxlr-utility-docs/docs/development/api/examples/unix-socket"},next:{title:"All possible Commands",permalink:"/goxlr-utility-docs/docs/development/api/examples/all-possible-commands"}},l={},p=[{value:"C#",id:"c",level:2}],c={toc:p},d="wrapper";function m(e){let{components:n,...t}=e;return(0,i.kt)(d,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"named-pipe-example"},"Named Pipe Example"),(0,i.kt)("h2",{id:"c"},"C#"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'using System;\nusing System.Buffers.Binary;\nusing System.IO.Pipes;\nusing System.Diagnostics;\nusing System.Text;\n\nConsole.WriteLine("Checking Daemon Running..");\nvar processes = Process.GetProcessesByName("goxlr-daemon");\nif (processes.Length == 0) {\n    Console.Error.WriteLine("GoXLR Utility Daemon not Running");\n    return;\n}\n\nvar client = new NamedPipeClientStream("@goxlr.socket");\ntry {\n    // If we can\'t connect for 20ms, the daemon probably isn\'t running..\n    client.Connect(20);\n} catch (Exception) {\n    Console.Error.WriteLine("Unable to connect to the GoXLR Pipe");\n    return;\n}\n\n// Create the Stream Handlers..\nvar reader = new BinaryReader(client);\nvar writer = new BinaryWriter(client);\n\n// This is the JSON Message as a String..\nvar message = "\\"GetStatus\\"";\n\n// Grab the Message Bytes, and the bytes length..\nvar bytes = Encoding.UTF8.GetBytes(message);\nvar len = BitConverter.GetBytes((Int32)bytes.Length);\n\n// If we\'re on a little endian system, we need to reverse the length to BigEndian\nif (BitConverter.IsLittleEndian) {\n    Array.Reverse(len);\n}\n\n// Write the Message.\nwriter.Write(len);\nwriter.Write(bytes);\n\n// Read the first 4 bytes (response length)\nvar response_length_bytes = reader.ReadBytes(4);\n\n// Again, LittleEndian check and change\nif (BitConverter.IsLittleEndian) {\n    Array.Reverse(response_length_bytes);\n}\nvar response_length = BitConverter.ToUInt32(response_length_bytes);\n\n// Read the Response Body..\nvar response_bytes = reader.ReadBytes((int)response_length);\nvar response_body = Encoding.UTF8.GetString(response_bytes);\n\n// Output to Console (should be JSON)\nConsole.WriteLine(response_body);\n')))}m.isMDXComponent=!0}}]);