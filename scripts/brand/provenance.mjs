// Records where a generated raster came from, inside the PNG itself (a tEXt chunk),
// so the origin travels with the file. The keyword matches Impeccable's
// `embed-prompt`, which reads and scans for it.
import fs from "node:fs";
import zlib from "node:zlib";

const KEYWORD = "impeccable:prompt";

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "latin1"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(zlib.crc32(body));
  return Buffer.concat([len, body, crc]);
}

/** Inserts (or replaces) the provenance text chunk right after IHDR. */
export function withOrigin(png, text) {
  const ihdrEnd = 8 + 12 + png.readUInt32BE(8);
  const parts = [png.subarray(0, ihdrEnd)];
  for (let i = ihdrEnd; i < png.length;) {
    const n = png.readUInt32BE(i);
    const type = png.toString("latin1", i + 4, i + 8);
    const end = i + 12 + n;
    const isOurs =
      type === "tEXt" &&
      png.toString("latin1", i + 8, i + 8 + KEYWORD.length + 1) ===
        `${KEYWORD}\0`;
    if (!isOurs) parts.push(png.subarray(i, end));
    i = end;
  }
  const text_ = chunk("tEXt", Buffer.from(`${KEYWORD}\0${text}`, "latin1"));
  return Buffer.concat([parts[0], text_, ...parts.slice(1)]);
}

export function stampOrigin(file, text) {
  fs.writeFileSync(file, withOrigin(fs.readFileSync(file), text));
}
