"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    // const pageParam = params.get("page");
    // if (pageParam) params.set("page", pageParam);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    // Remove the 'page' parameter from the URL to reset the pagination to 1 when searching
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Input
      type='search'
      placeholder='Search...'
      startContent={
        <MagnifyingGlassIcon height={"1em"}>Search</MagnifyingGlassIcon>
      }
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("query")?.toString()}
    ></Input>
  );
}
