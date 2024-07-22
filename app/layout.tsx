import "./ui/global.css";
// import '/react-big-calendar/lib/css/styles.css'
import "@bitnoi.se/react-scheduler/dist/style.css";
import { Metadata } from "next";
import { inter, josefin, poppins } from "@/components/fonts";
import { NextUIProvider } from "@nextui-org/react";
import favi from "../public/favicon.ico";

export const metadata: Metadata = {
  title: "HRMIS LDS",
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
    <html lang='en' className={`${poppins.className} bg-gray-400/30`}>
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
