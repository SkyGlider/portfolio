// app/layout.tsx
import "./globals.css"

export const metadata = {
  title: "Andrew Pang",
  description:
    "Experienced Software Engineer in Finance and Blockchain domains.",
  openGraph: {
    title: "Andrew Pang Yong Chen",
    description:
      "Experienced Software Engineer in Finance and Blockchain domains.",
    url: "https://andrewpa.ng",
    siteName: "Andrew Pang's Portfolio",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
