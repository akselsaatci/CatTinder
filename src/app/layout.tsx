import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "CaTinder",
  description: "Tinder for cats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background:"",
          backgroundImage: `linear-gradient(to top, transparent 0%, rgb(0, 0, 0) 105%),url("/bg.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "bottom",
        }}
        className="font-main"
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
