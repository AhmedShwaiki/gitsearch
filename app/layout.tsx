import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GitSearch',
  description: 'Simply Search by users and repositories',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
