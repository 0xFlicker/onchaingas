import { type Viewport } from "next";

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
      // style={{
      //   overflowX: "hidden",
      // }}
      >
        {children}
      </body>
    </html>
  );
}
