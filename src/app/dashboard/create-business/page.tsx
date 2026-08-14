import Logo from '@/components/ui/Logo';
import CreateBusiness from '@/features/business/CreateBusiness';
import React from 'react';

const page = () => {
    return (
        <section className="flex justify-center items-center h-screen not-md:my-10">
            <div className="md:bg-white w-full md:w-170 md:shadow-xs md:px-5 md:rounded-xl py-7 not-md:mx-3">
                <Logo />
                <div className="py-3">
                    <p className="text-sm text-primary font-semibold">
                        Create your business profile
                    </p>
                    {/* <hr className="border-2 my-2 border-primary rounded-xl" /> */}
                </div>
                <div className="">
                    <h3 className="text-[18px] md:text-[22px] font-bold">
                        Tell us about your business
                    </h3>
                    <p className="text-text-muted text-[13px] md:text-sm pt">
                        Set up your sewing studio profile to personalize measurements and invoices.
                    </p>
                </div>
                <CreateBusiness />
            </div>
        </section>
    );
};

export default page;
