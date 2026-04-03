'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  BookOpen,
  Building2,
  FileText,
  Globe,
  Home,
  House,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  Stethoscope,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Search Physio', href: '/search', icon: <Search className="h-4 w-4" /> },
  ];

  const networkItems = [
    {
      title: 'Home Network',
      icon: <House className="h-4 w-4" />,
      href: '/network/home',
    },
    {
      title: 'Clinic Network',
      icon: <Building2 className="h-4 w-4" />,
      href: '/network/clinic',
    },
    {
      title: 'Online Network',
      icon: <Globe className="h-4 w-4" />,
      href: '/network/online',
    },
  ];

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
        <nav className="hidden items-center space-x-6 lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link to={item.href}>
                    <Button
                      variant="ghost"
                      className="hover:text-primary flex items-center gap-2 text-[#012a4a]"
                    >
                      {item.icon} {item.name}
                    </Button>
                  </Link>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[#012a4a]">
                  <Stethoscope className="mr-2 h-4 w-4" /> Physio Network
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="bg-background/70 grid w-100 gap-2 p-1 backdrop-blur-md md:w-125 md:grid-cols-1 lg:w-50">
                    {networkItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className="hover:bg-secondary bg-background/70 hover:text-primary-foreground focus:bg-accent block w-full space-y-1 rounded-md p-3 leading-none no-underline backdrop-blur-md transition-colors outline-none select-none"
                          >
                            <div className="flex items-center gap-4 text-sm leading-none font-medium">
                              {item.icon} {item.title}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/blog">
                  <Button variant="ghost" className="text-[#012a4a]">
                    <BookOpen className="mr-2 h-4 w-4" /> Blog
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="bg-primary rounded-full hover:bg-[#013a63]">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Activity className="mr-2 h-4 w-4" /> Your Therapy Plans
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" /> Issues
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" /> Terms of Service
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" /> Privacy Policy
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-border bg-background overflow-hidden border-t lg:hidden"
          >
            <div className="flex flex-col space-y-2 p-4">
              {[
                ...navigationItems,
                { name: 'Blog', href: '/blog', icon: <BookOpen className="h-4 w-4" /> },
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
              <div className="border-border grid grid-cols-2 gap-2 border-t pt-4">
                <Link to="/about" className="p-2 text-center text-sm text-[#012a4a]">
                  About
                </Link>
                <Link to="/contact" className="p-2 text-center text-sm text-[#012a4a]">
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
