import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Stethoscope,
  Ticket,
  User as UserIcon,
  Users,
  Wallet,
} from 'lucide-react';

import AdminRoute from '@/components/custom/ProtectedRoute/AdminRoute';
import ScrollToTop from '@/components/custom/scroll-to-top/scroll-to-top';
import { Toaster } from '@/components/ui/sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Providers } from '@/provider';
import { useLogout } from '@/hooks/useAuth';
import { useCurrUser as useUser } from '@/store/userStore';

const NAV_ITEMS = [
  { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Users', href: '/admin/users', icon: Users },
  { title: 'Therapists', href: '/admin/therapists', icon: Stethoscope },
  { title: 'Coupons', href: '/admin/coupons', icon: Ticket },
  { title: 'Treatment Plans', href: '/admin/treatment-plans', icon: ClipboardList },
  { title: 'Finance', href: '/admin/finance', icon: Wallet },
  { title: 'Blogs', href: '/admin/blogs', icon: FileText },
];

const PAGE_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/users': 'User Management',
  '/admin/therapists': 'Therapist Management',
  '/admin/coupons': 'Coupon Management',
  '/admin/treatment-plans': 'Treatment Plans',
  '/admin/finance': 'Finance & Payouts',
  '/admin/blogs': 'Blog Management',
};

function AdminShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser((s) => s.user);
  const removeUser = useUser((s) => s.removeUser);
  const logoutMutation = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'Admin';
  const initials = (user.name ?? 'AD')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    setIsLoggingOut(true);
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        removeUser();
        toast.success('Logged out successfully!');
        navigate('/login');
      },
      onError: () => {
        removeUser();
        toast.success('Logged out successfully!');
        navigate('/login');
      },
      onSettled: () => setIsLoggingOut(false),
    });
  };

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon" className="border-border border-r bg-white">
        <SidebarHeader className="border-border border-b px-4 py-4">
          <NavLink to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#014f86] text-white">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm leading-tight font-bold text-[#012a4a]">PhysioBuddies</p>
              <p className="text-xs leading-tight font-medium text-[#014f86]">Admin Console</p>
            </div>
          </NavLink>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <NavLink to={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-border border-t px-3 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-2.5 rounded-md p-2 text-left transition-colors group-data-[collapsible=icon]:justify-center hover:bg-[#a9d6e5]/40">
                <Avatar className="border-border h-8 w-8 shrink-0 border">
                  <AvatarFallback className="bg-[#014f86] text-xs font-semibold text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                  <p className="truncate text-xs font-semibold text-[#012a4a]">
                    {user.name ?? 'Admin'}
                  </p>
                  <p className="text-muted-foreground truncate text-[11px]">{user.email ?? ''}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" /> {user.name ?? 'Admin'}
              </DropdownMenuLabel>
              <p className="text-muted-foreground px-2 pb-1 text-xs">{user.email ?? ''}</p>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={handleLogout}
                disabled={isLoggingOut}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="bg-background/95 supports-backdrop-filter:bg-background/60 border-border sticky top-0 z-40 flex h-16 items-center gap-3 border-b px-4 backdrop-blur md:px-6">
          <SidebarTrigger className="text-[#013a63]" />
          <h1 className="text-sm font-semibold text-[#012a4a] md:text-base">{pageTitle}</h1>
        </header>
        <main
          id="main-scroll-container"
          className="min-h-[calc(100vh-4rem)] overflow-y-auto bg-[#f8fbfa] pb-24 font-sans"
        >
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AdminLayout() {
  return (
    <Providers>
      <ScrollToTop />
      <AdminRoute>
        <AdminShell />
      </AdminRoute>
      <Toaster />
    </Providers>
  );
}
