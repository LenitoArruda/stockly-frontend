import './globals.css';
import { PageContainer } from '@/components/page-container';
import { Metadata } from 'next';
import { AppProvider } from '@/providers/app-provider';

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
      <body className="text-[#444444] antialiased ">
        <AppProvider>
          <PageContainer>{children}</PageContainer>
        </AppProvider>
      </body>
    </html>
  );
}
