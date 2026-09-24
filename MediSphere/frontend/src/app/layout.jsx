import '../index.css';
import '../components/Navbar.css';
import '../components/Footer.css';
import '../components/LoginModal.css';
import '../views/LandingPage.css';
import '../views/Register.css';
import '../components/DashboardNavbar.css';
import '../views/Dashboard.css';
import { AppProvider } from '../context/AppContext';
import LayoutWrapper from '../components/LayoutWrapper';

export const metadata = {
  title: 'HealSync - Smart Hospital Management System',
  description: 'Smart Hospital Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <AppProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
