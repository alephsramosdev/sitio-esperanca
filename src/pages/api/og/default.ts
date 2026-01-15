import type { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

function svgTextOverlay(): Buffer {
    const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font: 700 72px Arial, Helvetica, sans-serif; fill: #ffffff; }
    .subtitle { font: 400 34px Arial, Helvetica, sans-serif; fill: #d6d6d6; }
  </style>
    <text x="420" y="290" class="title">Sítio Esperança</text>
  <text x="420" y="355" class="subtitle">sitioesperancamp.com.br</text>
</svg>
`;
    return Buffer.from(svg);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const faviconPath = path.join(process.cwd(), "public", "favicon.png");
        const favicon = await fs.readFile(faviconPath);

        const background = sharp({
            create: {
                width: WIDTH,
                height: HEIGHT,
                channels: 3,
                background: "#0b0b0b",
            },
        });

        const icon = await sharp(favicon)
            .resize(260, 260, { fit: "contain" })
            .png()
            .toBuffer();

        const output = await background
            .composite([
                { input: icon, left: 120, top: Math.floor((HEIGHT - 260) / 2) },
                { input: svgTextOverlay(), left: 0, top: 0 },
            ])
            .jpeg({ quality: 86, mozjpeg: true })
            .toBuffer();

        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800");
        res.status(200).send(output);
    } catch {
        res.status(500).end();
    }
}
