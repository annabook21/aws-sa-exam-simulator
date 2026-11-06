# Instructions for all coding agents — Reader Rabbit HTML5

**Read this first.** The user wants a **faithful PLAYABLE BROWSER GAME**, not a macOS .app, not documentation alone and not a loose remake.

## Source of truth
- The user's original CD ISO, `RR2GWINCD.iso`, is source evidence; it is intentionally **not in the repository**.
- Observations in `docs/ISO_FINDINGS.md` come from inspecting that CD on 2026-11-06.
- Never guess what main-game files contain from `.MPS` scripts found in the preview directory.
- Distinguish observed facts, tentative hypotheses, inferred behavior, and unverified claims.
- User-supplied original screenshots/recordings in the issue tracker (if provided) are evidence for UI/gameplay; do not substitute imagined mechanics.

## Workstreams (parallelize only independent work)
1. **Binaries:** Analyze `RR2G/RR2GW32.EXE` with Ghidra, identify import table, graphics/input/audio/resource APIs, dispatch architecture; record exact offsets and reproducible findings. Cross-check against the 16-bit binary.
2. **Assets:** Build read-only parsers for ISO9660, Windows NE resource tables in `.RSC`, `RGrp` archive headers and Smacker SMK metadata. Require robust boundary checks. Keep raw extracted assets **local and gitignored**.
3. **Gameplay:** Observe a legally acquired copy running under a suitable legacy-compatible environment; capture scene transitions, hitboxes, timing, scoring, scripts, audio, and save behavior.
4. **Browser runtime:** TypeScript/Canvas or WebGL + Web Audio; file-input/OPFS/IndexedDB local asset loading as appropriate. No CDN dependence for proprietary game data. Separate asset decoding from gameplay simulation.
5. **Validation:** Screenshots/video and deterministic state transitions compared to original; record known mismatches in a test matrix.

## MVP definition (not satisfied yet)
- Browser loads original user-supplied media locally and enters **one authentic scene**.
- Original assets are correctly displayed, not placeholder art.
- Actual mouse/key interaction works.
- Correct success/failure rules and transition to next state.
- Animation timing and audio behave acceptably.
- Tested in current Chromium and Safari or Firefox; document limitations.

## Rules
- **Never upload or commit** `RR2GWINCD.iso`, proprietary resources, sprites, audio, videos, copied commercial code, or AI-made close copies of copyrighted assets.
- The sample `web/index.html` is only an ISO inventory proof-of-concept. It does not run the game.
- Don't assert Emscripten can directly compile a Windows .EXE or that browser emulation is a genuine port.
- Prefer testable decoding tools with bounds checks, sample header fixtures and format evidence.
- Do not automatically render or execute opaque binary content from the ISO as JS or HTML.
- Ask for legal review before any public distribution of assets or a publicly hosted game.
- Maintain `docs/ISO_FINDINGS.md` as a living evidence ledger with reproducibility steps.
- Don't claim success until an actual browser game interaction passes the MVP gate.

## Immediate next PR
- Enumerate NE `.RSC` resource IDs/type tables and map one representative visual to on-screen appearance.
- Inspect `RR2GW32.EXE` resource-loader code and any scripting references.
- Build a **single scene renderer** with the real extracted image/sound under local-only loading.
- Report blockers with binary offsets/file paths and concrete next actions.
