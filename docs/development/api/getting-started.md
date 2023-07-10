---
id: getting-started
title: Getting started
sidebar_position: 1
---

# Getting started

The GoXLR Utility is an 'API Driven' application, meaning all configuration happens via an API.<br/>
The `goxlr-client` binary and Web UI are examples of API clients, and the message format is simple JSON.

:::info
If you want to create a library or anything else,
please consider adding a disclaimer that this project is not supported by,
or affiliated in any way with, TC-Helicon and add the Music Tribe License.

It can be found here: [3rd-Party-License](https://github.com/GoXLR-on-Linux/goxlr-utility/blob/main/LICENSE-3RD-PARTY)
:::

## Communication Methods
There are currently three methods of communication with the API:
- The Unix Socket `/tmp/goxlr.socket`, or on Windows the Named Pipe `@goxlr.socket` which are always present
- Simple HTTP Requests via `/api/command` on the embedded web server
- Websocket communication via `/api/websocket` on the embedded web server

Note, that all three interfaces have the same JSON message processing and responses attached to them
(so any command will work on all three), however the websocket has an additional JSON Patch mechanism, for real-time updates.

We'll go through each of these, and how to communicate with them.