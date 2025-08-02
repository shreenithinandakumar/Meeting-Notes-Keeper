'use client'
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import styles from '@/styles/ProfileDropdown.module.css';
import Image from 'next/image';

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className={styles.profileContainer}>
      <Image
        src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
        alt="Profile"
        width={40}
        height={40}
        className={styles.profileimg}
        onClick={toggleDropdown}>
      </Image>
      {open && (
        <div className={styles.dropdownMenu}>
          <p onClick={() => signOut()}>Logout</p>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
