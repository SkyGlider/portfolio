import fs from "fs"
import path from "path"

export function getSiteContent() {
  const filePath = path.join(process.cwd(), "content/site.json")
  const raw = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(raw)
}