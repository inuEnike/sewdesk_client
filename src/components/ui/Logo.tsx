import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
        <div className='flex items-center gap-2'>
            <div className="">
                <Image src={'/logo.png'} alt="Sew Desk Logo" width={32} height={32} />
            </div>
            <div className="">
                <h3 className='text-[18px] md:text-[22px] font-bold'>SewDesk</h3>
            </div>
        </div>
    );
};

export default Logo;
