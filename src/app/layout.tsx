import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Palkin Kirill React',
  description: 'E-commerce application built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.layout}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
