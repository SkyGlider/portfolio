// app/page.tsx
import { getSiteContent } from "@/lib/content"
import PortfolioWindow from "@/components/PortfolioWindow"

export default function HomePage() {
  const content = getSiteContent()
  return <PortfolioWindow content={content} />
}
