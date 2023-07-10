---
id: named-pipe
title: Named Pipe
sidebar_position: 2
---

# Named Pipe Example

## C#
```csharp
using System;
using System.Buffers.Binary;
using System.IO.Pipes;
using System.Diagnostics;
using System.Text;

Console.WriteLine("Checking Daemon Running..");
var processes = Process.GetProcessesByName("goxlr-daemon");
if (processes.Length == 0) {
    Console.Error.WriteLine("GoXLR Utility Daemon not Running");
    return;
}

var client = new NamedPipeClientStream("@goxlr.socket");
try {
    // If we can't connect for 20ms, the daemon probably isn't running..
    client.Connect(20);
} catch (Exception) {
    Console.Error.WriteLine("Unable to connect to the GoXLR Pipe");
    return;
}

// Create the Stream Handlers..
var reader = new BinaryReader(client);
var writer = new BinaryWriter(client);

// This is the JSON Message as a String..
var message = "\"GetStatus\"";

// Grab the Message Bytes, and the bytes length..
var bytes = Encoding.UTF8.GetBytes(message);
var len = BitConverter.GetBytes((Int32)bytes.Length);

// If we're on a little endian system, we need to reverse the length to BigEndian
if (BitConverter.IsLittleEndian) {
    Array.Reverse(len);
}

// Write the Message.
writer.Write(len);
writer.Write(bytes);

// Read the first 4 bytes (response length)
var response_length_bytes = reader.ReadBytes(4);

// Again, LittleEndian check and change
if (BitConverter.IsLittleEndian) {
    Array.Reverse(response_length_bytes);
}
var response_length = BitConverter.ToUInt32(response_length_bytes);

// Read the Response Body..
var response_bytes = reader.ReadBytes((int)response_length);
var response_body = Encoding.UTF8.GetString(response_bytes);

// Output to Console (should be JSON)
Console.WriteLine(response_body);
```