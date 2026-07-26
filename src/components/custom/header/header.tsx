import { AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DesktopNav } from './components/DesktopNav';
import { MobileNav } from './components/MobileNav';
import { UserMenu } from './components/UserMenu';
import { useHeader } from './hooks/useHeader';

const Header = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    navigate,
    user,
    navigationItems,
    networkItems,
    handleProfileView,
    handleTherapyPlans,
    handleLogout,
  } = useHeader();

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Medical-Trust Wellness"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav navigationItems={navigationItems} networkItems={networkItems} />

        {/* Right Section: Profile & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="border-border mr-4 hidden items-center space-x-2 border-r pr-4 md:flex">
            <Link to="/about" className="hover:text-primary text-xs font-medium text-[#012a4a]">
              About
            </Link>
            <Link to="/contact" className="hover:text-primary text-xs font-medium text-[#012a4a]">
              Contact
            </Link>
          </div>

          <UserMenu
            user={user}
            navigate={navigate}
            handleProfileView={handleProfileView}
            handleTherapyPlans={handleTherapyPlans}
            handleLogout={handleLogout}
          />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        <MobileNav
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          user={user}
          navigationItems={navigationItems}
          networkItems={networkItems}
          handleLogout={handleLogout}
          navigate={navigate}
        />
      </AnimatePresence>
    </header>
  );
};

export default Header;
