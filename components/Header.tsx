"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";
// import { useTheme } from "@/lib/ThemeContext";
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  // const { darkMode, toggleDarkMode } = useTheme();
  return (
    <header className='header'>
      <Search />
      <div className='header-wrapper'>
        <FileUploader ownerId={userId} accountId={accountId} />
        {/* <div onClick={toggleDarkMode} className='mode-toggle-button'>
          {darkMode ? (
            <SunIcon className='dark:text-white size-5' />
          ) : (
            <MoonIcon className='text-dark-100 dark:text-black size-5' />
          )}
        </div> */}
        <form
          action={async () => {
            // "use server";

            await signOutUser();
          }}
        >
          <Button type='submit' className='sign-out-button'>
            <Image
              src='/assets/icons/logout.svg'
              alt='logo'
              width={24}
              height={24}
              className='w-6'
            />
          </Button>
        </form>
      </div>
    </header>
  );
};
export default Header;
