import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Countdowns',
  description: 'Some countdowns',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
