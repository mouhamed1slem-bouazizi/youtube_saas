'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideMenu() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/signin', label: 'Sign In' },
    { href: '/signup', label: 'Sign Up' },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <div className="text-xl font-bold mb-8 p-2">YouTube Info</div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block p-2 rounded hover:bg-gray-700 transition-colors ${
                  pathname === item.href ? 'bg-gray-700' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
