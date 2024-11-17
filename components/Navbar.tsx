'use client'

import Image from 'next/image';
import Link from 'next/link';
import Arrow from '@/public/images/arrow.png'
import ProfileIcon from '@/public/images/profile-icon.png'
import { usePathname } from 'next/navigation';

const NavBar: React.FC = () => {
  const currentPath = usePathname();
  
  return (
    <div className="sticky top-0 w-full flex items-center justify-between bg-white shadow-md p-4 z-50">
      <div>
        {currentPath !== '/' && (
          <Link href="/">
            <Image src={Arrow} alt="Go to Map" width={20} height={20} />
          </Link>
        )}
      </div>
      <span className='font-semibold tracking-wider'>MyPart901</span>
      <div>
        <Link href="/profile">
          <Image src={ProfileIcon} alt="Profile" className="text-black" width={20} height={20} />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
