import type { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

import { suites } from "@/db/suites";

const WIDTH = 1200;
const HEIGHT = 630;

function toPublicFilePath(publicPath: string): string {
    const normalized = publicPath.startsWith("/") ? publicPath.slice(1) : publicPath;
    return path.join(process.cwd(), "public", normalized);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const idParam = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
        const suiteId = typeof idParam === "string" ? idParam : "";

        const suite = suites.find((s) => s.id === suiteId);
        const candidate = suite?.images?.[0];

        const sourcePublicPath = candidate && typeof candidate === "string" ? candidate : "/favicon.png";
        const sourceFilePath = toPublicFilePath(sourcePublicPath);

        const input = await fs.readFile(sourceFilePath);

        const output = await sharp(input)
            .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
            .jpeg({ quality: 86, mozjpeg: true })
            .toBuffer();

        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800");
        res.status(200).send(output);
    } catch {
        res.status(404).end();
    }
}
