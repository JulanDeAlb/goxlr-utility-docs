---
id: unix-named
title: Unix Socket/Named Pipe
sidebar_position: 2
---

# Unix Socket / Named Pipe
These should be your primary point of entry to the utility, even if you intend to use the HTTP channels for actual work.
They will always be present, and active, so long as the GoXLR Utility is running.
Users can turn off the web server component of the Daemon, or change the port,
but this socket can be used to determine if that's the case.

The message send / receive format is relatively straight forward:<br/>
`[Message Length as unsigned 32bit BigEndian Integer][JSON Message]`

These sockets are simple send / receive, you send a request, you get a response in the same format.
To parse out the JSON response, you would read the length, then use that to read the message.

If you're writing in rust, you can utilize the [interprocess](https://crates.io/crates/interprocess) crate,
along with the utilities [ipc](https://github.com/GoXLR-on-Linux/goxlr-utility/tree/main/ipc) crate to automatically handle connections and marshaling data.
Check out the [goxlr-client](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/main/client/src/main.rs) for an example on how to do this.

If you're a C# / Other Language user, there's a VERY basic example on handling this socket available [here](./examples/named-pipe.md).

If your intent is to use the web based interfaces, you'd want to perform a GetStatus,
which will return a json structure detailing the complete device status.
In order to get the Url, you need to extract it from the Json.<br/>
The JsonPath should be: `/Status/config/http_settings`, it includes the Bind Address, Port and whether its enabled.