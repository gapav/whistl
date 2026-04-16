export const metadata = {
  title: "Whistl — AI-drevet \u00f8ktplanlegger for barneidrett",
  description:
    "Gjør treningsbeskrivelsen fra gruppechatten om til en ryddig, delbar treningsplan på sekunder.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, background: "#1C1B18" }}>{children}</body>
    </html>
  );
}
