# Fidelity is the release requirement (not a visual shell)

This project is an effort to make the **actual Reader Rabbit's 2nd Grade experience playable in a modern web browser**. It is **not** a generic educational game or a screenshot-only facsimile. This is a *target*, not a claim that a port is already complete.

## Non-negotiable acceptance gates

A scene is not marked "complete" unless all of the following have been measured against the authentic legacy application:

- **Art:** original scene backgrounds, character sprites, palettes, UI graphics and text placement (no replacement illustrations presented as originals).
- **Audio:** original voice lines, music, cues and correct trigger timings.
- **Animation:** frame order, sprite alignment, timing, transitions and user feedback.
- **Gameplay:** input semantics, hitboxes, level selection, puzzle generation, correct/incorrect feedback, winning/losing behavior, level difficulty/progression.
- **Navigation:** transitions and interaction states, including returning to previous scenes and saving/loading where implemented in the original.
- **Determinism:** a documented input sequence produces the same observable game result in the reference executable and HTML5 version.
- **Authenticity:** no guessed content, fake menus, invented levels, substituted voices, or partial "clickable shells" labeled as a port.

## Evidence for every scene

Each scene PR must contain:
1. A dated reference video or structured observation log made from the original running game (reference files may be stored privately).
2. A map from the original CD resources to decoded browser assets, including path, NE resource ID, source and codec.
3. A scene-specific state-machine description with input/output traces.
4. A fidelity matrix marking each requirement as PASS / FAIL / NOT YET VERIFIED.
5. Comparative screenshots and, where relevant, audio/animation timing measurements.
6. A browser execution test covering completion and failure branches.

## Allowed interim demonstrations

A technical **resource viewer**, audio decoder, scene renderer, or a single unfinished scene is acceptable for development, but **must be labeled as such**. It is never a substitute for a playable port.

## Strategic priority

Do not start by rebuilding the whole frontend or choosing a generic game UI. First decode a representative scene's **actual assets** and establish the authentic **game rules**. Then implement the minimal matching game loop and validate a complete activity. Expand only after that works.

## Distribution caveat

The original game and all its assets remain proprietary unless rights are established. Agents should not commit or publish disc images or ripped assets. A public website distributing those assets needs appropriate rights; local loading from the user's own disc is an alternative technical delivery approach, not a legal guarantee.
