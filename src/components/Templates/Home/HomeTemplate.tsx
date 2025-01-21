import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gravity, MatterBody } from "@/components/ui/gravity";
import { HeroPill } from "@/components/ui/hero-pill";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Squares } from "@/components/ui/squares-background";

type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
};

type HomeTemplateProps = {
  posts: Post[];
};

// Add this function at the top level, outside the component
const getColorFromString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`;
};

export default function HomeTemplate({ posts }: HomeTemplateProps) {
  return (
    <main className="relative w-full">
      {/* Hero Section - Full width */}
      <section className="text-center w-full md:-mt-16 mb-16">
        <div className="relative w-full min-h-[500px] flex flex-col overflow-hidden mt-6 md:mt-16">
          <Squares
            speed={0.3}
            className="absolute inset-0 opacity-10 w-full -z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/90 -z-0" />
          
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="relative w-full mt-10">
              {/* Hero Pill */}
              <div className="absolute -top-2 md:top-0 left-1/2 -translate-x-1/2 z-10">
                <HeroPill
                  href="https://vestesporte.com.br"
                  label="Seu portal de notícias esportivo"
                  announcement="📣 Novidade"
                  isExternal
                  className="bg-[hsl(151,80.8%,34.7%)]/20 ring-[hsl(151,40%,96.1%)] [&_div]:bg-[hsl(151,40%,96.1%)] [&_div]:text-[hsl(151,80.8%,34.7%)] [&_p]:text-[hsl(151,80.8%,34.7%)] [&_svg_path]:fill-[hsl(151,80.8%,34.7%)]"
                />
              </div>
              {/* Banner Desktop */}
              <div className="hidden md:block aspect-video relative w-full">
                <Image
                  src="/hero.png"
                  alt="Banner principal"
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              {/* Banner Mobile */}
              <div className="block md:hidden aspect-[2/4] relative w-full">
                <Image
                  src="/hero2.png"
                  alt="Banner principal"
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full hidden md:block">
                <MatterBody
                  matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                  x="30%"
                  y="10%"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl bg-[#0015ff] text-white rounded-full hover:cursor-pointer px-8 py-4">
                    futebol
                  </div>
                </MatterBody>
                <MatterBody
                  matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                  x="30%"
                  y="30%"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl bg-[#E794DA] text-white rounded-full hover:cursor-grab px-8 py-4">
                    basquete
                  </div>
                </MatterBody>
                <MatterBody
                  matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                  x="40%"
                  y="20%"
                  angle={10}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl bg-[#1f464d] text-white rounded-full hover:cursor-grab px-8 py-4">
                    vôlei
                  </div>
                </MatterBody>
                <MatterBody
                  matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                  x="75%"
                  y="10%"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl bg-[#ff5941] text-white rounded-full hover:cursor-grab px-8 py-4">
                    olimpíadas
                  </div>
                </MatterBody>
                <MatterBody
                  matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                  x="80%"
                  y="20%"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl bg-orange-500 text-white rounded-full hover:cursor-grab px-8 py-4">
                    copa
                  </div>
                </MatterBody>
                <MatterBody
                  matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                  x="50%"
                  y="10%"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl bg-[#ffd726] text-black rounded-full hover:cursor-grab px-8 py-4">
                    champions
                  </div>
                </MatterBody>
              </Gravity>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the content with container */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-24">
        {/* Posts Grid */}
        <section>
          <div className="flex items-center justify-between mb-8 md:pt-6">
            <h2 className="text-2xl font-bold">
              Últimas notícias
            </h2>
            <Button
              asChild
              variant="outline"
              className="text-primary hover:text-primary/90"
            >
              <Link href="/blog" className="inline-flex items-center">
                Ver notícias
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 6).map((post) => (
              <Link key={post.id} href={`/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-gray-600"
                        style={{ backgroundColor: getColorFromString(post.title) }}
                      >
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="space-y-1">
                      {/* {post.categories?.nodes && post.categories.nodes.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {post.categories?.nodes.map((category) => (
                            <span
                              key={category.slug}
                              className="text-xs bg-verde-c px-2 py-1 rounded-full text-white"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      )} */}
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(post.date)}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="text-muted-foreground line-clamp-3 h-[72px]"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                        Ler mais
                        <svg
                          className="ml-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Store Promotion Section */}
        <section className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-r from-verde-c/10 to-verde-c/5 rounded-2xl p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full bg-verde-c/10 px-4 py-1">
                  <span className="animate-pulse text-verde-c font-semibold">🔥 Oferta Especial</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight">
                  Vista sua paixão com a Vestesport
                </h2>
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-bold text-verde-c">
                    Leve 3, Pague 2
                  </p>
                  <p className="text-xl">
                    Camisas a partir de <span className="font-bold">R$ 170,00</span>
                  </p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                Encontre as melhores camisas de futebol dos seus times favoritos. Qualidade premium,
                entrega para todo Brasil e condições especiais de pagamento.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-verde-c" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Frete Grátis para todo Brasil
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-verde-c" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Parcelamento em até 12x
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-verde-c" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Site 100% Seguro
                </li>
              </ul>
              <div className="flex gap-4">
                <a
                  href="https://www.vestesport.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-verde-c px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-verde-c/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-c"
                >
                  Conheça nossa loja
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
                <a
                  href="https://wa.me/5562999322197"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-verde-c px-6 py-3 text-base font-medium text-verde-c shadow-sm hover:bg-verde-c/10"
                >
                  <SiWhatsapp className="mr-2 h-4 w-4" />
                  Fale conosco
                </a>
              </div>
            </div>
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              <Image
                src="/camisa.png"
                alt="Preview da loja Vestesport"
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 