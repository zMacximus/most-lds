import "./ui/global.css";
// import '/react-big-calendar/lib/css/styles.css'
import { Metadata } from "next";
import { poppins } from "@/components/fonts";
import { NextUIProvider } from "@nextui-org/react";
import favi from "../public/favicon.ico";

export const metadata: Metadata = {
  title: "HRMIS TMS",
  icons: {
    icon: favi.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} bg-slate-100/80`}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
