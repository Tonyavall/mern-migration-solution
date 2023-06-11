import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google'
import ApolloWrapper from './_lib/client';
import AppNavbar from './_components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <AppNavbar />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}