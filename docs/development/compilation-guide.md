---
id: compilation-guide
title: Compilation Guide
sidebar_position: 1
---

# Compilation Guide

## What you'll need
- A Git Client (like pure [Git](https://git-scm.com/) or [GitHub Desktop](https://desktop.github.com/))
- Install [Rust](https://rustup.rs/)
- For Linux:<br/>
  - Debian: `sudo apt-get install pkg-config libdbus-1-dev libpulse0`<br/>
  - Fedora: `sudo dnf install pkgconf-pkg-config dbus-devel pulseaudio-libs`

### TTS Feature
The following packages will be needed if doing the 'Linux Speedrun' build,
or if you require TTS capabilities inside the utility to report button presses.
- Dependencies:<br/>
  - Debian: `sudo apt-get install clang libspeechd-dev`
  - Fedora: `sudo dnf install clang speech-dispatcher-devel`

## Getting the Code
Firstly, we need to get the code from GitHub so we can build it. This is relatively simple,
from a command line run: `git clone https://github.com/GoXLR-on-Linux/goxlr-utility.git` then `cd goxlr-utility`.

If you require a specific feature or development branch (for example, the `dev-0.12.0` branch), you can switch to it using `git checkout dev-0.12.0`.

If there have been new commits, and you need to update your source tree, simply run `git pull` to update everything.

## Building

### Linux Speedrun
If you're simply building because you run a distribution where a package for the utility isn't available,
or want to run closer to bleeding edge, there's a script available that will build the utility and install
all the components into their correct system locations the same way a package would. Simply make sure you have
the TTS dependencies and from the `goxlr-utility` source directory, run `ci/build-and-install.sh`.
You'll be prompted for your password during this process while binaries, icons, and files are moved into the correct positions.

### Building by Hand
Building by hand is relatively simple, you start off with a single command:

`cargo build`

This will simply build the utility into the `target/debug` directory. We can enhance the build in various ways:

- Support the TTS feature, install the needed dependencies and add `--features "tts"` to the build command
- Create optimised binaries, add `--release` to the build command (Binaries are produced in `target/release`)

So for an optimised, TTS enabled release, you'd run:

`cargo build --features "tts" --release`

Once complete, you've got a build of the GoXLR Utility.

### Binaries
The utility creates several binaries, these can be found in either `target/debug` or `target/release` depending
on the build method above. The binaries are (Under Windows, these will have a `.exe` extension):

- goxlr-daemon - The Utilities Core Binary
- goxlr-client - The CLI Client for the Utility
- goxlr-launcher - A Tool to lauch the UI, and if needed, the daemon (Used in App Menus).
- goxlr-defaults - A 'package' of default profiles, mic profiles, icons and presets
- goxlr-initialiser - `[DEPRECATED]` A Tool to initialise the GoXLR for use
- goxlr-firmware - We don't talk about this.

Regardless of your intent, with the exception of `goxlr-client` you should keep ALL of these files together, as they often depend on each other to function.

### Done
If you get here, you should have a build of the utility you can use, have fun and enjoy!