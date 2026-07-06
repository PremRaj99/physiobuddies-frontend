import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { NavigationItem, NetworkItem } from '../hooks/useHeader';
import type { User } from '@/store/userStore';

interface MobileNavProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
  user: User;
  navigationItems: NavigationItem[];
  networkItems: NetworkItem[];
  handleLogout: () => void;
  navigate: (path: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  user,
  navigationItems,
  networkItems,
  handleLogout,
  navigate,
}) => {
  if (!isMobileMenuOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="border-border bg-background overflow-hidden border-t lg:hidden"
    >
      <div className="flex flex-col space-y-2 p-4">
        {[
          ...navigationItems,
          {
            name: 'Blog',
            href: '/blog',
            icon: React.createElement(BookOpen, { className: 'h-4 w-4' }),
          },
        ].map((item) => (
          <Link key={item.name} to={item.href} onClick={() => setIsMobileMenuOpen(false)}>
            <div className="hover:bg-secondary flex items-center gap-3 rounded-lg p-3 text-[#012a4a] transition-colors">
              {item.icon} {item.name}
            </div>
          </Link>
        ))}
        <div className="text-muted-foreground p-3 text-xs font-semibold tracking-wider uppercase">
          Physio Network
        </div>
        {networkItems.map((item) => (
          <Link key={item.title} to={item.href} onClick={() => setIsMobileMenuOpen(false)}>
            <div className="hover:bg-secondary flex items-center gap-3 rounded-lg p-3 pl-6 text-[#012a4a]">
              {item.icon} {item.title}
            </div>
          </Link>
        ))}
        <div className="border-border flex flex-col gap-2 border-t pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-center text-sm text-[#012a4a]"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-center text-sm text-[#012a4a]"
            >
              Contact
            </Link>
          </div>
          {user.id ? (
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive mt-2 w-full py-2.5 hover:text-white"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/login');
              }}
              className="bg-primary mt-2 w-full py-2.5 text-white hover:bg-[#013a63]"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
