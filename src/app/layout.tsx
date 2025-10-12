import { Header } from '@/components/header';
import { Theme } from '@radix-ui/themes';
import './globals.css';
import { PageContainer } from '@/components/page-container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stockly',
  description: 'Your stock management solution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Theme>
          <Header />
          <PageContainer>{children}</PageContainer>
        </Theme>
      </body>
    </html>
  );
}
