import { Inter, Josefin_Sans, Lusitana, Poppins } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  style: ["normal", "italic"],
});

export const josefin = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
});
