import './globals.css'

export const metadata = {
  title: 'Joyllibee 🐝 — dev board',
  description: 'Personal work command board for joy / joy-2 / joy-3',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
