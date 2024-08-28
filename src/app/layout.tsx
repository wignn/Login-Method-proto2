import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";
const inter = Inter({ subsets: ["latin"] });
import favi from './favicon.ico'


export const metadata = {
  title: "NUKE",
  description: "Generated by create next-Js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href={favi.src} />
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}