import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata = {
  title: "Ashraf Adel | Data Analyst",
  description: "Visualizing Insight, Grounded in Data. Data-driven analysis and visualization services specializing in business intelligence and statistical storytelling.",
  keywords: [
    "Ashraf Adel",
    "ashraf adel",
    "Adel Ashraf",
    "Ashraf Adel Portfolio",
    "Ashraf Adel Data",
    "adel ashraf",
    "ashraf adel data analyst",
    "adel ashraf data analyst",
    "ashraf adel data analyst portfolio",
    "adel ashraf data analyst portfolio",
    
    "Data Analyst",
    "Data Analysis",
    "Data Analytics Specialist",
    "Business Intelligence Analyst",
    "Data Visualization Expert",
    "Statistical Data Analysis",
    "Insight Visualization",
    
    "Python Data Analysis",
    "SQL Developer",
    "Power BI Dashboard",
    "Tableau Specialist",
    "Excel Data Modeling"
  ],
  authors: [{ name: "Ashraf Adel" }],
  openGraph: {
    title: "Ashraf Adel | Data Analyst",
    description: "Visualizing Insight, Grounded in Data.",
    type: "website",
  },
  verification: {
    google: "tQMqyEQB3Q73XwZHx9spm4bfQiUcioaOaNnsJiuzKHA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
