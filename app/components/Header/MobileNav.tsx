import { XMarkIcon } from '@heroicons/react/24/outline';
import NavLinks from './NavLinks';
import { NewRocker } from "@/app/ui/fonts";

export default function MobileNav ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: any;
}) {
    return (
        <div className="flex flex-col bg-cardOverlay backdrop-blur-sm justify-center gap-16 w-screen h-screen overflow-y-hidden  z-50 overflow-hidden">
            <XMarkIcon className="h-8 w-8 fixed right-4 top-4" onClick={ () => setIsOpen(!isOpen)}/>
            <div className='flex items-center justify-center w-full  h-72 gap-10 flex-col'>
                <NavLinks Mobile={true}/>
            </div>

            <a className={`${NewRocker.className} antialiased text-3xl text-webColor flex items-center justify-center w-full`}>FitNotion</a>
            
        </div>
    );
}