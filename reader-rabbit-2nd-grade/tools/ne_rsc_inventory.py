#!/usr/bin/env python3
"""Read-only inventory of NE-formatted RSC resources inside an ISO9660 CD image.
No proprietary content is extracted or uploaded. Standard-library Python only.
"""
import argparse
from collections import Counter
import json
import mmap
from pathlib import Path

SECTOR = 2048

def num(b, offset, width=2):
    if offset < 0 or offset + width > len(b):
        raise ValueError(f"Out-of-range integer at {offset:#x}")
    return int.from_bytes(b[offset:offset + width], "little")

def iso_files(data):
    pvd = data[16 * SECTOR:17 * SECTOR]
    if len(pvd) != SECTOR or pvd[:6] != b"\x01CD001":
        raise ValueError("Not an ISO9660 primary volume descriptor")
    root = pvd[156:190]
    visited = set()
    def walk(extent, size, prefix):
        if (extent, size) in visited: return
        visited.add((extent, size))
        start, end = extent * SECTOR, extent * SECTOR + size
        if start < 0 or end > len(data):
            raise ValueError("Directory outside ISO")
        pos = start
        while pos < end:
            reclen = data[pos]
            if not reclen:
                pos = (pos // SECTOR + 1) * SECTOR
                continue
            if reclen < 34 or pos + reclen > end:
                raise ValueError("Invalid directory record")
            record = data[pos:pos + reclen]
            name_len = record[32]
            if 33 + name_len > reclen:
                raise ValueError("Invalid filename length")
            name = bytes(record[33:33 + name_len])
            if name not in (b"\x00", b"\x01"):
                display = name.decode("ascii", "replace").split(";")[0]
                path = prefix + "/" + display
                off = num(record, 2, 4) * SECTOR
                length = num(record, 10, 4)
                if off + length > len(data):
                    raise ValueError(f"File exceeds ISO: {path}")
                if record[25] & 2:
                    yield from walk(off // SECTOR, length, path)
                else:
                    yield path, off, length
            pos += reclen
    yield from walk(num(root, 2, 4), num(root, 10, 4), "")

def characterize(head):
    if head.startswith(b"RIFF") and head[8:12] == b"WAVE": return "RIFF/WAVE"
    if head.startswith(b"BM"): return "BMP"
    if head.startswith(b"\x89PNG"): return "PNG"
    if head.startswith((b"GIF87a", b"GIF89a")): return "GIF"
    if head.startswith(b"MThd"): return "MIDI"
    if head.startswith(b"SMK2"): return "Smacker"
    return "undetermined"

def ne_resources(blob):
    if len(blob) < 64 or blob[:2] != b"MZ":
        raise ValueError("Not an MZ executable")
    ne = num(blob, 0x3c, 4)
    if blob[ne:ne + 2] != b"NE":
        raise ValueError("Not a Windows NE executable")
    begin = ne + num(blob, ne + 0x24)
    end = ne + num(blob, ne + 0x26)
    if begin < ne + 0x40 or end <= begin or end > len(blob):
        raise ValueError("Invalid NE resource table")
    alignment = num(blob, begin)
    if alignment > 16: raise ValueError("Unreasonable resource alignment shift")
    pos = begin + 2
    entries = []
    while pos + 2 <= end:
        resource_type = num(blob, pos)
        if resource_type == 0: break
        count = num(blob, pos + 2)
        pos += 8
        if count > 5000 or pos + count * 12 > end:
            raise ValueError("Invalid resource count/table bounds")
        for _ in range(count):
            offset = num(blob, pos) << alignment
            size = num(blob, pos + 2) << alignment
            flags = num(blob, pos + 4)
            rid = num(blob, pos + 6)
            pos += 12
            if offset + size > len(blob):
                raise ValueError(f"Resource {resource_type:#x}/{rid:#x} outside file")
            head = bytes(blob[offset:offset + min(size, 16)])
            entries.append({"type": f"0x{resource_type:04x}", "id": f"0x{rid:04x}",
                            "offset": offset, "length": size,
                            "flags": f"0x{flags:04x}", "signature": characterize(head)})
    return entries

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("iso", type=Path, help="Locally owned RR2GWINCD.iso")
    g = p.add_mutually_exclusive_group()
    g.add_argument("--file", default="/DATA/BEZEL.RSC", help="Specific ISO path")
    g.add_argument("--all-rsc", action="store_true", help="Inventory all RSC modules")
    p.add_argument("--json", action="store_true", help="Output resource IDs and offsets as JSON")
    args = p.parse_args()
    reports = []
    with args.iso.open("rb") as fh, mmap.mmap(fh.fileno(), 0, access=mmap.ACCESS_READ) as data:
        found = False
        for path, offset, length in iso_files(data):
            if not (args.all_rsc and path.upper().endswith(".RSC")) and path.upper() != args.file.upper():
                continue
            found = True
            try:
                entries = ne_resources(memoryview(data)[offset:offset + length])
                reports.append({"path": path, "resources": len(entries),
                                "type_counts": dict(sorted(Counter(e["type"] for e in entries).items())),
                                "signatures": dict(sorted(Counter(e["signature"] for e in entries).items())),
                                "entries": entries})
            except ValueError as err:
                reports.append({"path": path, "error": str(err)})
        if not found: raise SystemExit(f"No matching file found in ISO: {args.file}")
    if args.json:
        print(json.dumps(reports, indent=2))
    else:
        for r in reports:
            print(r["path"], "error=" + r["error"] if "error" in r else
                  f"resources={r['resources']} types={r['type_counts']} signatures={r['signatures']}")

if __name__ == "__main__":
    main()
