import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InfoIcon, MailIcon, MapPinIcon, TruckIcon, LockIcon, InstagramIcon } from 'lucide-react';
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-full bg-black z-50">
      <div className="z-50 sm:px-2 pd:px-8 lg:px-16 xl:px-40 2xl:px-64">
        <div className=" bg-black border-x border-neutral-600 p-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/vestesport2.png"
                  alt="Blog Logo"
                  width={300}
                  height={50}
                  className="rounded-lg"
                />
              </Link>
              <p className="text-muted-foreground">
                Fique por dentro das novidades do Vestesport e do mundo esportivo com a gente.
              </p>
            </div>

            <div>
              <ul className="space-y-2">
              <h3 className="font-bold text-lg mb-4 text-neutral-400">Institucional</h3>
                <li><Link href="https://www.vestesport.com.br/quem-somos" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                  <InfoIcon className="w-4 h-4" />
                  Quem somos</Link></li>
                <li><Link href="https://www.vestesport.com.br/politicadeprivacidade" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                  <LockIcon className="w-4 h-4" />
                  Política de privacidade</Link></li>
                <li><Link href="https://www.vestesport.com.br/compra-segura" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                  <LockIcon className="w-4 h-4" />
                  Compra segura</Link></li>
                <li><Link href="https://www.vestesport.com.br/contato" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                  <MailIcon className="w-4 h-4" />
                  Contato</Link></li>
                <li><Link href="https://www.vestesport.com.br/rastreio" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                  <TruckIcon className="w-4 h-4" />
                  Rastreio</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-neutral-400">Entre em contato</h3>
              <ul className="space-y-2">
                <li><Link href="https://wa.me/5562999322197" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                  <SiWhatsapp className="w-4 h-4" />
                  (62) 99932-2197</Link></li>
                <li><Link href="mailto:redacted@example.invalid" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                  <MailIcon className="w-4 h-4" />
                  redacted@example.invalid</Link></li>
                <li><Link href="https://www.vestesport.com.br/" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  Aparêcida de Goiânia, Goiás</Link></li>
                <li><Link href="https://instagram.com/vestesport" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                  <InstagramIcon className="w-4 h-4" />
                  Instagram</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-neutral-400">Loja Online</h3>
              <p className="text-muted-foreground mb-4">
                Visite nossa loja online e encontre as melhores ofertas em camisas de futebol!
              </p>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Use o cupom <span className="font-semibold text-verde-c">PRIMEIRACOMPRA</span> e ganhe 17% de desconto!
                </p>
                <Link 
                  href="https://www.vestesport.com.br/" 
                  className="inline-flex items-center gap-2 w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full">
                    Ir para Loja
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Vestesport - Vista sua Paixão! - 46.996.756/0001-33. Todos os direitos reservados.</p>
            <Link 
              href="https://wa.me/5562984268492"
              className="text-sm text-muted-foreground hover:text-white mt-2 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Desenvolvido por Ewzxyh Studios
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 