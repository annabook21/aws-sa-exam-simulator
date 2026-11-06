# Reader Rabbit's 2nd Grade — Browser Reimplementation Research

**Product goal:** a faithful playable **HTML5/browser** version of the user's Windows CD game, not a macOS-only native port, not a screenshot-based imitation, and not just an emulator embedded on a webpage.

**State (2026-11-06):** Original ISO has been inspected for filesystem, format signatures and sample text-script content. A browser-based **ISO inventory harness** exists in `web/index.html`. **No original game is yet playable in HTML.** Do not misrepresent the current state.

## Architecture under investigation

```text
User's lawful original RR2GWINCD.iso (local file, never uploaded by default)
  -> browser-side or offline extraction/decoding (ISO9660; NE RSC; RGrp; SMK)
  -> data-driven game runtime (TypeScript + Canvas/WebGL + Web Audio)
  -> one playable original scene with input, animation, sounds, level logic
  -> expand scene-by-scene using observation tests against original game
```

Avoid WebAssembly unless a recovered/reimplemented **C/C++** engine makes it useful: old Windows PE binary cannot simply be fed to Emscripten. Browser emulation may be useful to observe behavior, but is not a source-level HTML5 port.

## Initial hands-on test

Open `web/index.html` in a modern browser; choose your *local* `RR2GWINCD.iso`. It inventories ISO9660 files **without uploading the file**. This is a research harness, not the game. The source image and original commercial assets are **not stored** in this repository.

## Repo organization

- `AGENTS.md` — task boundaries, evidence and quality gates for AI coding agents.
- `docs/ISO_FINDINGS.md` — confirmed ISO observations, uncertainties and roadmap.
- `tools/iso_inventory.py` — standard-library Python script to inspect the ISO offline.
- `web/index.html` — browser-side ISO inventory starter.

## Non-negotiable success criteria

1. Runs in mainstream browsers without installing a 1990s operating system.
2. Uses original game rules established by evidence, not generic educational-game inventions.
3. A single representative scene is playable **before** broad rewrites.
4. Runs on desktop with responsive input; later address mobile interaction separately.
5. Offline-friendly; don't send proprietary assets from local media to third parties.
6. Document precisely whether a component is reconstructed, decoded, emulated, or placeholder.
7. Preserve provenance, automated tests, comparison videos, and an asset/version manifest.

## References

- Ghidra headless workflow: https://github.com/NationalSecurityAgency/ghidra/blob/master/Ghidra/RuntimeScripts/support/analyzeHeadlessREADME.md
- Emscripten (use if C/C++ implementation exists): https://emscripten.org/
- ScummVM architecture and existing engine examples: https://github.com/scummvm/scummvm

## Rights

The game, characters, artwork, scripts, sound and disc are copyrighted by their respective owners. Do not commit, publish or distribute the ISO, copied art/audio or decompiled proprietary code without appropriate rights. Tools and original analyses can be committed independently. Hosting a public browser port with original assets requires a separate rights review. 
