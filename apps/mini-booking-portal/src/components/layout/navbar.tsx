'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAVBAR_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/bookings', label: 'My Bookings' },
];

export const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-blue-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Mini Booking Portal</div>
        <div className="space-x-4">
          {NAVBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-white font-semibold hover:underline',
                isActive(link.href) && 'text-yellow-400',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
