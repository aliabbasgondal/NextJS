import './globals.css'

export const metadata = {
  title: 'Panaverse Website',
  description: 'Designed and Developed by Ali Abbas',
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
