# Verified original resource index — 2026-11-06

This report is from actual read-only inspection of the uploaded, user-provided `RR2GWINCD.iso`, not AI speculation.

## Tested results

- ISO volume `RR2GWINCD`, 191 files, 66 files ending in `.RSC`.
- `tools/ne_rsc_inventory.py` successfully parsed **66/66** RSC files as NE resource modules, including resource type tables and entry offsets.
- **3,497 NE resource entries** indexed; **1,105 RIFF/WAVE resource headers** detected.
- `/DATA/BEZEL.RSC` yielded 116 resource entries, including 19 RIFF/WAVE headers.
- The first `/DATA/BEZEL.RSC` WAV at resource type `0xff06`, ID `0x8a8c`, file-relative offset `0x19de00` is RIFF/WAVE; verified with `ffprobe` to decode as `pcm_u8`, **22,050 Hz**, **1 channel**, duration **0.210023 seconds**. The NE resource occupies 5,120 bytes including alignment padding; the RIFF-declared file size is 4,675 bytes.

No copyrighted raw samples or ISO content are committed here. Actual resource content is loaded only from the local, user-supplied ISO.

## Reproduction

```sh
python3 reader-rabbit-2nd-grade/tools/ne_rsc_inventory.py /path/to/RR2GWINCD.iso --all-rsc
python3 reader-rabbit-2nd-grade/tools/ne_rsc_inventory.py /path/to/RR2GWINCD.iso --all-rsc --json > local-rsc-inventory.json
```

## Browser tool

`web/index.html` is a research UI that reads a **local** ISO, enumerates original NE resource entries, detects candidate RIFF/WAVE media and offers local playback. **It is not a game or port.** Its JavaScript syntax was checked using Node.js v22, but an interactive Chromium end-to-end test could **not** be run in the execution environment because browser navigation was blocked by administrator policy. Agent: verify it in an accessible desktop browser before treating the viewer as working.

## Fidelity next steps

1. Confirm the **original game's** playable scenes, music and interactions by observing the legacy executable.
2. Decode unknown NE resource types (many likely hold visual/game data) and the RGrp format.
3. Reconstruct a single complete **authentic** activity with its original image sequences, audio and exact gameplay rules.
4. Compare against baseline recordings and input traces.
5. Only then expand to complete game coverage. No placeholder shell should count as completion.

## Limitations

Resource-table indexing is not decoding sprites/scene graphs. Recognizable WAV headers do not prove all 1,105 entries have playable audio or meaningful voice lines; decoder testing is needed. Recreating and distributing a full copy of the commercial game (even if technically feasible) requires a rights review.
