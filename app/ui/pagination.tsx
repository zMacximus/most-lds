"use client";
import { Pagination } from "@nextui-org/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CustomPagination({
  currentPage,
  tableLength,
}: {
  currentPage: number;
  tableLength: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const paginationLength = Math.ceil(tableLength / 5);

  function handlePagination(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    // Preserve the 'query' parameter when changing pagination
    const queryParam = params.get("query");
    if (queryParam) {
      params.set("query", queryParam);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Pagination
      showControls
      total={paginationLength}
      initialPage={currentPage}
      defaultValue={searchParams.get("page")?.toString()}
      isCompact
      variant='flat'
      color='primary'
      onChange={(page) => {
        handlePagination(page);
      }}
    ></Pagination>
  );
}
