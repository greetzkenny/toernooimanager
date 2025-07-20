import "../styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Toernooi Manager",
  description: "Football Tournament Manager",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeWrapper>
            <NavBar />
            {children}
          </ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
} 