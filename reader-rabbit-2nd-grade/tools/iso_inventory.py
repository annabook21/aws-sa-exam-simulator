#!/usr/bin/env python3
"""Read-only ISO9660 PVD inventory for the original Reader Rabbit disc.

Only standard Python modules; no extraction, upload, or executable execution.
Not a general-purpose ISO9660 implementation (does not handle all extensions).
"""
import argparse
from collections import Counter
import hashlib
import mmap
from pathlib import Path

SECTOR = 2048

def le32(data):
    return int.from_bytes(data[:4], 'little')

def enumerate_iso(data):
    pvd = data[16 * SECTOR:17 * SECTOR]
    if len(pvd) < SECTOR or pvd[0] != 1 or pvd[1:6] != b'CD001':
        raise ValueError('ISO9660 primary volume descriptor not found')
    label = pvd[40:72].decode('ascii', 'replace').strip()
    root = pvd[156:190]
    seen, files, directory_count = set(), [], 0

    def walk(extent, size, base=''):
        nonlocal directory_count
        if (extent, size) in seen:
            return
        seen.add((extent, size))
        start, end = extent * SECTOR, extent * SECTOR + size
        if end > len(data):
            raise ValueError('directory extent past EOF')
        pos = start
        while pos < end:
            size_record = data[pos]
            if not size_record:
                pos = ((pos // SECTOR) + 1) * SECTOR
                continue
            if pos + size_record > end or size_record < 34:
                raise ValueError('invalid ISO9660 directory record')
            record = data[pos:pos + size_record]
            name_len = record[32]
            if 33 + name_len > len(record):
                raise ValueError('invalid filename length')
            name = bytes(record[33:33 + name_len])
            if name not in (b'\x00', b'\x01'):
                filename = name.decode('ascii', 'replace').split(';')[0]
                path = base + '/' + filename
                target_extent, target_size = le32(record[2:6]), le32(record[10:14])
                if record[25] & 2:
                    directory_count += 1
                    walk(target_extent, target_size, path)
                else:
                    if (target_extent * SECTOR + target_size) > len(data):
                        raise ValueError('file extent past EOF: ' + path)
                    head = bytes(data[target_extent * SECTOR:target_extent * SECTOR + min(target_size, 64)])
                    sig = ''
                    if head.startswith(b'MZ') and len(head) >= 64:
                        offset = le32(head[0x3c:0x40])
                        sig = bytes(data[target_extent * SECTOR + offset:target_extent * SECTOR + offset + 2]).decode('ascii', 'replace')
                        if sig == 'PE':
                            sig = 'PE'
                        elif sig != 'NE':
                            sig = 'MZ (unknown extended header)'
                    elif head.startswith(b'SMK2'):
                        sig = 'Smacker SMK2'
                    elif head.startswith(b'RGrp'):
                        sig = 'RGrp'
                    files.append((path, target_size, sig))
            pos += size_record
    walk(le32(root[2:6]), le32(root[10:14]))
    return label, directory_count, files

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('iso', type=Path)
    parser.add_argument('--sha256', action='store_true', help='hash entire ISO')
    args = parser.parse_args()
    with args.iso.open('rb') as handle, mmap.mmap(handle.fileno(), 0, access=mmap.ACCESS_READ) as data:
        label, dirs, files = enumerate_iso(data)
        print(f'Volume: {label} | Files: {len(files)} | Directories: {dirs}')
        print('Extensions:', dict(sorted(Counter(Path(f[0]).suffix.upper() for f in files).items())))
        for path, size, signature in files:
            print(f'{size:>10}  {signature:<30} {path}')
        if args.sha256:
            print('SHA-256:', hashlib.sha256(data).hexdigest())

if __name__ == '__main__':
    main()
