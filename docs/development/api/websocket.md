---
id: websocket
title: Websocket Request
sidebar_position: 4
---

# Websocket Request

Websockets behave slightly differently than simple requests due to extra async behaviors to consider.
The websocket supports asynchronous reuse, allowing you to send commands with potentially different execution lengths,
and get the response as soon as it's available (Note that all requests will be processed in the order received).
The main issue that this can cause is that the responses may not arrive in the order they are sent,
so an ID is required to be attached to all requests, which will be returned with the response.

So an example GetStatus request will look something like this:
```json
{
    "id": 72, /* id is an unsigned 64bit integer */
    "data": "GetStatus",
}
```

And responses will follow a similar format:
```json
{
  "id": 72, /* Matches the Request */
  "data": { "Status" {..} }
}
```

How to match up requests and responses is an exercise for the integrator, I use simple javascript promises in the Web UI.

## JSON Patching
Whenever anything about the GoXLR changes (be it a physical interaction,
or another app changing a setting), a [JSON Patch](https://jsonpatch.com/) message is emitted to any and all clients connected via websockets.

This patch is intended to be applied to a `Status` object received from executing a `GetStatus` message,
although how this is achieved may be dependent on your platform or language, some options include:

- Directly mutating the Status structure (`fast-json-patch` for javascript, possibly Reflection in type-safe languages)
- Storing the raw JSON response from `GetStatus`, patching that, and replacing any de-serialized objects
- Serialize an object back to JSON, patch the JSON, then de-serialize replacing the original object


For a rust example on handling the websocket and patches, check out [this project](https://github.com/FrostyCoolSlug/goxlr-obs-fader-sync/),
it fetches the websocket address from the unix socket, grabs the `Status`, patches whenever updates arrive,
and updates an audio source in OBS whenever a specific channel volume changes (either via fader, or the UI),
it could be the basis for a 'VOD Track' implementation.

### A Patching Warning...
When working in a UI, you'll need to be considerate of patch events for your own changes.
When sending a change to the daemon, in addition to the general 'Ok' response, it will emit
a 'Patch' event for that change, confirming it has been made. Depending on the type of interaction,
and the speed of updates, the patches may be slightly behind what has been sent
(an example is spamming a slider up and down really fast), and if you've mapped your component directly
to the `Status` value there might be some contention over the actual value.

In addition, if you're modifying the volume of a fader on the full sized GoXLR,
the GoXLR itself will trigger internal events for the volume changes to the fader as the motorized sliders move,
which the daemon will pick up and emit as a new patch
(unfortunately, the GoXLR itself is authoritative as far asvolumes are concerned, and being physical may overshoot
/ undershoot an intended target making it difficult to handle daemon-side),
sending a command to the Daemon which sets the volume from 0 to 255 could result in many patch events as the fader moves.

In the WebUI, this is solved by temporarily ignoring patch events for sliders while the user is actively manipulating them.
Once the user finishes, simply replace the value in the `Status` object with the new value,
which will ostensibly be the same value as the last change sent to the Daemon.
While this might not perfectly catch overshoot / undershoot, and could leave the `Status` object slightly desynced,
it's generally close enough.