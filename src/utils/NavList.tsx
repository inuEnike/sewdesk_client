import { CiCalendarDate } from 'react-icons/ci';
import { FaRegMoneyBill1, FaSackDollar } from 'react-icons/fa6';
import { GoGraph } from 'react-icons/go';
import { ImCoinDollar } from 'react-icons/im';
import { IoPeopleOutline } from 'react-icons/io5';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdDashboard } from 'react-icons/md';
import { TbRulerMeasure } from 'react-icons/tb';

export const navList = [
    {
        routeName: 'Dashboard',
        route: '/dashboard',
        icon: <LuLayoutDashboard />,
    },
    {
        routeName: 'Clients',
        route: '/clients',
        icon: <IoPeopleOutline />,
    },
    {
        routeName: 'Orders',
        route: '/orders',
        icon: <FaRegMoneyBill1 />,
    },
    {
        routeName: 'Measurements',
        route: '/measurements',
        icon: <TbRulerMeasure />,
    },

    {
        routeName: 'Appointments',
        route: '/appointments',
        icon: <CiCalendarDate />,
    },

    {
        routeName: 'Payments',
        route: '/payments',
        icon: <ImCoinDollar />,
    },
    {
        routeName: 'Reports',
        route: '/reports',
        icon: <GoGraph />,
    },
];
