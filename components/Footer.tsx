import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="container py-10 flex gap-6 flex-wrap items-center justify-center">
      <a className="flex items-center gap-2">
        {/* <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
        /> */}
        Created by Zack Hanni
      </a>
      <a
        className="flex items-center gap-2 scale-underlined"
        href="https://www.zachary.works/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        Personal Portfolio
      </a>
      <a
        className="flex items-center gap-2 scale-underlined"
        href="https://www.webwizarddev.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Go to webwizarddev.com →
      </a>
    </footer>
  );
}
