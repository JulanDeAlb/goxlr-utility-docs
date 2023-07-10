---
id: simple-http
title: Simple HTTP Request
sidebar_position: 3
---

# Simple HTTP Request

Once you have the web server details (or assumed the defaults), you can use HTTP to Send commands to the daemon.
These are incredibly simple, send a `POST` request with `Content-Type: application/json` to `/api/command`,
with the request in the body and you'll receive a JSON response. (more on messaging later).

So for example, to fetch the Daemon Status, you'd simply send a `"GetStatus"` message to the endpoint,
and will receive the `"Status" {..}` response.