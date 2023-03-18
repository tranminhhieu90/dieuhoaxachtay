import './globals.css'

export const metadata = {
  title: 'Điều Hoà Xách Tay',
  description: 'Điều Hoà Xách Tay',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
