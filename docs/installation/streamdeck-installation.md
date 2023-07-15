---
id: streamdeck-installation
title: StreamDeck Plugin installation
sidebar_position: 3
---

# Stream Deck

:::info
Stream Deck does officially only work on MacOS and Windows.
:::

## What you'll need
Downloads are available [here](https://github.com/frostycoolslug/goxlr-utility-streamdeck/releases) under the 'Assets header'.<br/>
Only the file `com.frostycoolslug.goxlr-utility.streamDeckPlugin` is needed.

## Installation
Once downloaded, double-click on the file to install it.

## Configuration

### Local
If you're running your Stream Deck on the same computer as the GoXLR utility,
it should automatically detect it running and perform any configuration needed when you add your first action,
and you should be good to go.

### Remote
If you're running your Stream Deck on a different PC to your GoXLR,
you will need to configure the Plugin to connect to where the GoXLR is.

Firstly, ensure the GoXLR Utility is configured to allow network access,
open the UI, navigate to System -> Settings, from there ensure 'Allow UI Network Access' is ticked.
Restart the utility and make sure connections are allowed through your firewall.

Going back to the Stream Deck software, add an Action, and a 'Configure' button should appear,
click the button and the global settings page will open.
Change localhost to the IP of the computer running the GoXLR Utility
(unless you've explicitly changed the port from 14564, leave that there) and hit Connect.

You should see a green 'Success' message if the plugin was able to connect,
if not, double-check the IP is correct and that the connection isn't being blocked by the firewall.

Once connected, you should be able to configure actions.

## Troubleshooting

### The Icons are Red
This means that either the Stream Deck cannot connect to the GoXLR Utility,
or the GoXLR is unplugged or not found. Double-check the Utility to make sure it's functional and present.
If you've swapped your GoXLR with another one, click on each of the actions, which should make them resync.