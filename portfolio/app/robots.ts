// app/robots.ts
export default function robots() {
    return {
        rules: [{ userAgent: "*", allow: "/" }],
        sitemap: "https://andrewpa.ng/sitemap.xml",
    }
}
