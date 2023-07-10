---
id: messaging
title: Messaging
sidebar_position: 5
---

# Messaging

While not formally documented (yet!),
determining the JSON messages to send across to the GoXLR is relatively straight forward.
All of the commands and responses are defined in the `ipc` crates [lib.rs](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/main/ipc/src/lib.rs)
file, DaemonRequest are the requests, and `DaemonResponse` are the possible responses.

## Sending

All requests should be derived from the [DaemonRequest](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/f9d2635e8692e6b8fb008155dc08c5fafd8cd353/ipc/src/lib.rs#L21)
enum, if you send a request that's not listed there, or is of an incorrect format,
an error will be returned. Serialization of the enums is straight forward,
the constant is converted to a String, and the parameters are represented either by themselves,
or as an Array if there's more than one. If there ARE parameters,
the command needs to be wrapped in a JSON object `{}` so the `DaemonRequest::GetStatus` constant is represented in JSON as:
```json
"GetStatus"
```

With this information, we can infer the behavior of the `DaemonRequest::OpenPath` command,
[PathTypes](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/f9d2635e8692e6b8fb008155dc08c5fafd8cd353/ipc/src/lib.rs#L49) is an enum, and we know the constants are just represented as Strings in the JSON,
and there's only one parameter, so an array isn't needed, but it needs to be wrapped in an object,
so to open the profiles directory, the JSON would be:
```json
{ "OpenPath": "Profiles" } 
```

And `DaemonRequest::Command` has two parameters, which need to be represented as an array, so we end up with:
```json
{ "Command": [String, GoXLRCommand] }
```

The `String` in this case is a device serial number (they're included in the `GetStatus` response)...
As for the [GoXLRCommand](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/f9d2635e8692e6b8fb008155dc08c5fafd8cd353/ipc/src/lib.rs#L84C10-L84C23),
this is another enum further down the same file, listing all of the device commands that can be sent.
These commands all serialize out the same way as the top level elements.
It should be noted, that the commands include a lot of types, these can be found in the `types` crates [lib.rs](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/main/ipc/src/lib.rs)
file. They're all enums, so their values get sent as Strings.

So to set a Fader, we look to the `GoXLRCommand::SetFader` constant,
it requires a [FaderName](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/f9d2635e8692e6b8fb008155dc08c5fafd8cd353/types/src/lib.rs#L55)
and a [ChannelName](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/f9d2635e8692e6b8fb008155dc08c5fafd8cd353/types/src/lib.rs#L14)
(both defined in the types crate), so we'll change Fader `A` to the channel `Mic`, remembering to start at the `DaemonRequest` level, we end up with:
```json
{ "Command": [Serial, { "SetFader": ["A", "Mic"] } ] }
```

## Receiving

Serialization of responses tends to behave in exactly the same way as serializing requests,
except they're based on the [DaemonResponse](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/f9d2635e8692e6b8fb008155dc08c5fafd8cd353/ipc/src/lib.rs#L29C10-L29C25)
enum. when executing a GoXLRCommand, you'll get one of two responses, either `Ok` as a string by itself, or an error:
```json
{ "Error": "This is an Error!" }
```

Obviously, errors can be sent for any Request.

There are two other types of responses, `DaemonStatus` fetched by calling `GetStatus` and `Patch`, discussed earlier in the websocket section.

Serialisation of these structs is pretty straight forward, although they're defined in the `ipc` crates [device.rs](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/main/ipc/src/device.rs)
file.

In the case of a struct, the values inside it are represented as `key: value` pairs, so for example a `DaemonConfig`
inside the DaemonStatus struct would be represented as:
```json
/* "Status" is from DaemonResponse */
"Status": {
  "config": {
    "daemon_version": "0.12.4",

    /* Rust boolean is mapped directly to javascript boolean */
    "autostart_enabled": true,
    "show_tray_icon": true
  },
  ...
}
```

For anything that's an `Option`, there will be either a value, or `null`, this generally applies to feature that aren't present on a Mini.

For Maps (`EnumMap`, `HashMap`, `BTreeMap`), the first type is the key, and the second the value, for example, the `mixers` are defined in rust as:
```rust
  pub mixers: HashMap<String, MixerStatus>,
```

And map to:
```json
"mixers": {
  "SERIAL_NUMBER": {
    /* Into the MixerStatus object */
    "hardware": {
      ...
    }
  },
  "SERIAL_NUMBER_2": {
    ...
  }
}
```

For the `EnumMap<A, B>` type, all keys of type A are GUARANTEED to be present and set in the response,
in `HashMaps` and `BTreeMaps` that guarantee is not met (note, in future releases, some HashMaps may be converted to EnumMaps).

And finally, for types defined as `Vec`, they will be presented as a simple Javascript array.