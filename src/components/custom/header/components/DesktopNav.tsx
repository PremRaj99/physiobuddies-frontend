import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import type { NavigationItem, NetworkItem } from '../hooks/useHeader';

interface DesktopNavProps {
  navigationItems: NavigationItem[];
  networkItems: NetworkItem[];
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ navigationItems, networkItems }) => {
  return (
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
  );
};
