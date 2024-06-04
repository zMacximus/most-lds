import './ui/global.css'
// import '/react-big-calendar/lib/css/styles.css'
import { Metadata } from 'next'
import { poppins } from 'ui/fonts'
import {NextUIProvider} from "@nextui-org/react";
import favi from "../public/favicon.ico"
 
export const metadata: Metadata = {
  title: 'HRMIS TMS',
  icons: {
    icon: favi.src
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-100`}>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  )
}
