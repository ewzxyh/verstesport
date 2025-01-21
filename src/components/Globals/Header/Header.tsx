"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SearchPosts } from "@/components/ui/SearchPosts";
import { StoreIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-black z-50">
      <div className="container mx-auto px-4 py-4 md:px-16 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/vestesport2.png"
                alt="Blog Logo"
                width={300}
                height={50}
                className="w-[220px] md:w-[300px] h-auto rounded-lg"
              />
            </Link>
            <div className="md:hidden ml-6">
              <Button 
                size="lg" 
                className="bg-verde-c text-white hover:bg-verde-e"
                onClick={() => window.open('https://www.vestesport.com.br/', '_blank')}
              >
                <StoreIcon className="w-4 h-4" />
                Visitar loja
              </Button>
            </div>
          </div>

          <div className="w-full md:max-w-xl md:mx-8">
            <SearchPosts />
          </div>

          <div className="hidden md:block">
            <Button size="lg" className="bg-verde-c text-white hover:bg-verde-e">
              <StoreIcon className="w-4 h-4" />
              Visitar loja
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 