"use client";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

type SearchResult = {
    id: string;
    title: string;
    slug: string;
    date: string;
    featuredImage?: {
        node: {
            sourceUrl: string;
            altText: string;
        };
    };
};

// Add the color generation function at the top level
const getColorFromString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
};

export function SearchPosts() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearch = useDebounce(query, 300);
    const router = useRouter();
    const commandRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(commandRef, () => setIsOpen(false));

    useEffect(() => {
        const searchPosts = async () => {
            if (!debouncedSearch) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(
                    `/api/search?q=${encodeURIComponent(debouncedSearch)}`
                );
                const data = await response.json();

                setResults(
                    data.posts.nodes.map((post: any) => ({
                        id: post.id,
                        title: post.title || "",
                        slug: post.slug,
                        date: post.date,
                        featuredImage: post.featuredImage,
                    }))
                );
            } catch (error) {
                console.error("Erro ao buscar posts:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        searchPosts();
    }, [debouncedSearch]);

    const handleSelect = (slug: string) => {
        setIsOpen(false);
        setQuery("");
        router.push(`/${slug}`);
    };

    return (
        <div ref={commandRef} className="relative w-full">
            <Command className="rounded-lg" shouldFilter={false}>
                <CommandInput
                    placeholder="Pesquisar notícias..."
                    value={query}
                    onValueChange={setQuery}
                    onFocus={() => setIsOpen(true)}
                    className="h-11"
                />
                {isOpen && (
                    <CommandList className="z-50 absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border shadow-lg max-h-[300px] overflow-y-auto">
                        {isLoading ? (
                            <CommandEmpty className="py-6 text-center">
                                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                                <p className="text-sm text-muted-foreground mt-2">
                                    Buscando notícias...
                                </p>
                            </CommandEmpty>
                        ) : results.length === 0 && query ? (
                            <CommandEmpty className="py-6 z-50">
                                Nenhuma postagem encontrada para "{query}"
                            </CommandEmpty>
                        ) : (
                            <CommandGroup>
                                {results.map((post) => (
                                    <CommandItem
                                        key={post.id}
                                        onSelect={() => handleSelect(post.slug)}
                                        className="cursor-pointer z-50"
                                    >
                                        <div className="flex items-center gap-3 w-full z-50">
                                            <div className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                                {post.featuredImage?.node ? (
                                                    <Image
                                                        src={post.featuredImage.node.sourceUrl}
                                                        alt={post.featuredImage.node.altText || post.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                ) : (
                                                    <div
                                                        className="w-full h-full flex items-center justify-center"
                                                        style={{ backgroundColor: getColorFromString(post.title) }}
                                                    />
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1 flex-grow min-w-0">
                                                <p className="font-medium truncate">{post.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(post.date).toLocaleDateString("pt-BR")}
                                                </p>
                                            </div>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                )}
            </Command>
        </div>
    );
} 