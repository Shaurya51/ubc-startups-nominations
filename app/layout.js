export const metadata = {
  title: "UBC Startups Elections 2026",
  description: "Nominate yourself for President or Treasurer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
