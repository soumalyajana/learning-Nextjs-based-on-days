"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>

        {/* GitHub */}
        <a
          href="https://github.com/soumalyajana"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer transition-transform duration-200 hover:scale-125"
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2.24902C6.51613 2.24902 2 6.70064 2 12.249C2 16.6361 4.87097 20.3781 8.87097 21.7329C9.3871 21.8297 9.54839 21.5071 9.54839 21.2813C9.54839 21.0555 9.54839 20.4103 9.51613 19.5393C6.74194 20.1845 6.16129 18.1845 6.16129 18.1845C5.70968 17.0555 5.03226 16.7329 5.03226 16.7329C4.12903 16.0877 5.06452 16.0877 5.06452 16.0877C6.06452 16.12 6.6129 17.12 6.6129 17.12C7.48387 18.6684 8.96774 18.2168 9.51613 17.9264C9.6129 17.2813 9.87097 16.8297 10.1613 16.5716C7.96774 16.3458 5.6129 15.4748 5.6129 11.6684C5.6129 10.5716 6.03226 9.70064 6.64516 9.02322C6.54839 8.79741 6.19355 7.76515 6.74194 6.37806C6.74194 6.37806 7.6129 6.11999 9.51613 7.41031C10.3226 7.18451 11.1613 7.05548 12.0323 7.05548C12.9032 7.05548 13.7742 7.15225 14.5484 7.41031C16.4516 6.15225 17.2903 6.37806 17.2903 6.37806C17.8387 7.73289 17.5161 8.79741 17.3871 9.02322C18.0323 9.70064 18.4194 10.6039 18.4194 11.6684C18.4194 15.4748 16.0645 16.3458 13.871 16.5716C14.2258 16.8942 14.5484 17.5393 14.5484 18.4426C14.5484 19.7974 14.5161 20.8619 14.5161 21.1845C14.5161 21.4426 14.7097 21.7329 15.1935 21.6361C19.129 20.3135 22 16.6039 22 12.1845C21.9677 6.70064 17.4839 2.24902 12 2.24902Z"
              fill="#323544"
            />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/soumalya-jana-b3b281268/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer transition-transform duration-200 hover:scale-125"
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.7065 3H4.34844C3.62264 3 3.04199 3.58065 3.04199 4.30645V19.6935C3.04199 20.3903 3.62264 21 4.34844 21H19.6485C20.3743 21 20.9549 20.4194 20.9549 19.6935V4.27742C21.013 3.58065 20.4323 3 19.7065 3ZM8.35491 18.3H5.71297V9.73548H8.35491V18.3ZM7.01942 8.54516C6.14846 8.54516 5.4807 7.84839 5.4807 7.00645C5.4807 6.16452 6.17749 5.46774 7.01942 5.46774C7.86136 5.46774 8.55813 6.16452 8.55813 7.00645C8.55813 7.84839 7.91942 8.54516 7.01942 8.54516ZM18.371 18.3H15.7291V14.1484C15.7291 13.1613 15.7001 11.8548 14.3356 11.8548C12.942 11.8548 12.7388 12.9581 12.7388 14.0613V18.3H10.0968V9.73548H12.6807V10.9258H12.7097C13.0872 10.229 13.9291 9.53226 15.2356 9.53226C17.9356 9.53226 18.4291 11.2742 18.4291 13.6548V18.3H18.371Z"
              fill="#323544"
            />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/917029445312"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer transition-transform duration-200 hover:scale-125"
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.074 4.89389C17.2091 3.02894 14.6689 2 12.0644 2C6.59814 2 2.12869 6.4373 2.12869 11.9035C2.12869 13.672 2.57885 15.3441 3.44702 16.8875L2.03223 22L7.33769 20.6495C8.78464 21.4212 10.4245 21.8714 12.0965 21.8714C17.5306 21.8392 21.9679 17.4019 21.9679 11.9035C21.9679 9.26688 20.939 6.791 19.074 4.89389ZM12.0322 20.1672C10.5853 20.1672 9.07403 19.7492 7.82001 18.9775L7.49846 18.7846L4.37949 19.5884L5.24766 16.5659L5.05473 16.2444C4.25088 14.926 3.80072 13.3826 3.80072 11.8392C3.80072 7.30547 7.46631 3.63987 12.0322 3.63987C14.2187 3.63987 16.2766 4.50804 17.82 6.05145C19.3634 7.59486 20.2316 9.68489 20.2316 11.9035C20.2959 16.5016 16.566 20.1672 12.0322 20.1672Z"
              fill="#323544"
            />
          </svg>
        </a>

        {/* Gmail */}
        <a
          href="mailto:soumalyajana2003@gmail.com"
          className="cursor-pointer transition-transform duration-200 hover:scale-125"
        >
          <svg
            width="50"
            height="50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
        </a>

        {/* X (Twitter) */}
        <a
          href="https://x.com/SoumalyaJana4"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer transition-transform duration-200 hover:scale-125"
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.7512 2.96094H20.818L14.1179 10.6187L22 21.0391H15.8284L10.9946 14.7191L5.4636 21.0391H2.39492L9.56132 12.8483L2 2.96094H8.32824L12.6976 8.73762L17.7512 2.96094ZM16.6748 19.2035H18.3742L7.40492 4.70014H5.58132L16.6748 19.2035Z"
              fill="#323544"
            />
          </svg>
        </a>
      </Menu>
    </div>
  );
}
