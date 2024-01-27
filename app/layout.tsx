import '@/app/ui/global.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SessionAuthProvider from './context/SessionAuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className='bg-gray-50'>
        <SessionAuthProvider>
        <Header/>
        {children}
        <Footer/>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
