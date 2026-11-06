# CD image findings — evidence ledger

Checked 2026-11-06 against user-provided `RR2GWINCD.iso`.

## Verified via ISO9660 parsing + direct file header inspection

- Volume label: `RR2GWINCD`.
- ISO file size: **278,009,856 bytes** (~265.1 MiB).
- SHA-256: `f13b2e16e1e1aea2004156f8c96325d277ed1b20544dc6cc700e35d5a233ada8`.
- Standard ISO9660 filesystem: **191 files**, **15 non-root directories**.
- File extensions: 66 `.RSC`, 14 `.MPS`, 8 `.SMK`, 6 `.GRP` (other files also present).
- `/RR2G/RR2GW16.EXE`: MS-DOS MZ stub + NE executable signature (16-bit Windows).
- `/RR2G/RR2GW32.EXE`: MZ stub + PE signature (32-bit Windows). Recommended primary binary analysis target.
- Sample `/DATA/BEZEL.RSC`: MZ stub + NE signature; `.RSC` resources **are NE modules**, and are not yet decoded into individual images/sounds. All RSC entries need per-file validation.
- `/DATA/CLOSING.SMK` and other `.SMK`: `SMK2` prefix (Smacker).
- Sample `/ASSETS/WSCOMMON.GRP`: `RGrp` header, followed by recognizable RIFF/WAVE bytes (suggests archive-like packing; full layout unverified).
- `/INST_32/SORTER.MPS`: readable text syntax with `Scene`, `OMAnimation`, `set`, `yield` etc.; comments mention a `SORTER.RSC` requirement.
- `/INST_32/LAB1.MPS`: readable text script; header describes `labdemo` edits in 10/97; appears tied to demo/preview assets. Do **not** treat these files as complete original game's source.

**Significance:** there is promising recoverable information in both structured resources and readable scripts, but there is currently no proven direct path from original binaries to a fully playable HTML5 build.

## Unverified and needs investigation

1. Which NE resource types and IDs contain frames, palettes, speech, interface geometry and executable/data payloads?
2. What format/codec and table of contents does `RGrp` use, and how is it linked to the main game?
3. Does the *main* game use embedded scripts, bytecode, resource IDs, or hard-coded gameplay?
4. Can an engine be reconstructed independently from black-box observation plus Ghidra analysis?
5. Can original visuals and sound be decoded and synchronized in browser Web APIs?
6. Which browser compatibility and accessibility requirements apply?
7. What permissions are needed to distribute original assets or make the game available online?

## Recommended technology, only where justified

- **Ghidra** with headless scripts and optionally an MCP connector for PE analysis. AI output must cite function addresses and corroborating disassembly.
- **Pure Python** for offline file inspection and NE/RGrp resource exploration; don't conflate executable header recognition with full parsing.
- **TypeScript + HTML Canvas / WebGL + Web Audio** as first-choice browser runtime for this 2D educational game, subject to profiling.
- **WebAssembly** only where there is a portable native engine/decoder worth compiling.
- **Regression tests**: golden resource decode fixtures, screenshot diffs, input-to-state trace replays, reference game recordings.

## Execution plan

**Gate 0:** verify ISO hash and map directory/resource types. (Basic inventory complete; resource decoding not yet done.)

**Gate 1:** extract and display one true original graphic and one original audio clip locally in the web demo, with licensing controls.

**Gate 2:** identify an actual game scene/state flow and recreate that scene's authentic interactive behavior.

**Gate 3:** support saving/progress, navigation and more scenes.

**Gate 4:** cross-browser testing, fidelity and legal review before any public hosting.

## Reproduce

```bash
python3 reader-rabbit-2nd-grade/tools/iso_inventory.py /path/to/RR2GWINCD.iso
```

The script should report a matching volume, counts and format signatures. Never run foreign executable code directly in the browser.
