import Logo from '@/components/ui/Logo';
import { navList } from '@/utils/NavList';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <aside className="bg-white h-screen w-75 border-r border-border px-6 py-8">
            <Logo />

            <ul className="flex flex-col gap-6 pt-8 text-text-secondary">
                {navList.map((router, key) => (
                    <li key={key} className="text-sm">
                        <Link href={router.route} className="flex items-center gap-4">
                            <span>{router.icon}</span>
                            {router.routeName}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
