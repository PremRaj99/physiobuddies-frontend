import React from 'react';
import {
  Activity,
  ActivityIcon,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  ShieldCheck,
  Stethoscope,
  User as UserIcon,
  Wallet,
} from 'lucide-react';
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
import type { User } from '@/store/userStore';

interface UserMenuProps {
  user: User;
  navigate: (path: string) => void;
  handleProfileView: () => void;
  handleTherapyPlans: () => void;
  handleLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  user,
  navigate,
  handleProfileView,
  handleTherapyPlans,
  handleLogout,
}) => {
  return (
    <>
      {user.id ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="bg-primary rounded-full hover:bg-[#013a63]">
              <UserIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user.role === 'therapist' && (
                <DropdownMenuItem onSelect={() => navigate('/therapist/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onSelect={handleProfileView}>
                <UserIcon className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleTherapyPlans}>
                <Activity className="mr-2 h-4 w-4" /> Your Therapy Plans
              </DropdownMenuItem>
              {user.role === 'therapist' && (
                <DropdownMenuItem onSelect={() => navigate('/therapist/slot-management')}>
                  <Stethoscope className="mr-2 h-4 w-4" /> Slot Management
                </DropdownMenuItem>
              )}
              {user.role === 'therapist' && (
                <DropdownMenuItem onSelect={() => navigate('/therapist/commission-history')}>
                  <Wallet className="mr-2 h-4 w-4" /> Commission History
                </DropdownMenuItem>
              )}
              {user.role === 'therapist' && (
                <DropdownMenuItem onSelect={() => navigate('/therapist/subscriptions')}>
                  <ShieldCheck className="mr-2 h-4 w-4" /> Subscription Plans
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => navigate('/activities')}>
                <ActivityIcon className="mr-2 h-4 w-4" /> Activities
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/my-issues')}>
                <FileText className="mr-2 h-4 w-4" /> Issues
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => navigate('/terms')}>
                <FileText className="mr-2 h-4 w-4" /> Terms of Service
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/privacy-policy')}>
                <Shield className="mr-2 h-4 w-4" /> Privacy Policy
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => navigate('/login')}
          className="bg-primary rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#013a63]"
        >
          Login
        </Button>
      )}
    </>
  );
};
