'use client';
import UserProvider from "@/context";

export default function CommonLayout({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
