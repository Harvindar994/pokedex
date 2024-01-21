import type { Metadata } from "next";
import { poppins } from "./styles/fonts";
import "./globals.css";
import Provider from "./_trpc/Provider";
import TosterContext from "./components/TosterContext";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Pokedex",
  description: "By Harvindar Singh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  data-theme="light">
      <body className={poppins.className}>
        <Provider>
          <TosterContext/>
            <Header/>
              {children}
            <Footer/>
        </Provider>
      </body>
    </html>
  );
}
