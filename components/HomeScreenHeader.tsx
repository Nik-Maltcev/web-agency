'use client';

import { ThemeLogo } from '@/app/components/theme-logo';
import UserButton from '@/components/auth/UserButton';

export default function HomeScreenHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between animate-[fadeIn_0.8s_ease-out]">
      <ThemeLogo />
      <UserButton />
    </div>
  );
}
