import { useState } from 'react';
import styles from '@/styles/ProfileDropdown.module.css';

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className={styles.profileContainer}>
      <img
        src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
        alt="Profile"
        className={styles.profileimg}
        onClick={toggleDropdown}
      />
      {open && (
        <div className={styles.dropdownMenu}>
          <p>My Profile</p>
          <p>Logout</p>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
