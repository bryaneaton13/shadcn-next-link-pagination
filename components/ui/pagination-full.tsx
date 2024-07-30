"use client";

import { type ReactNode, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface PaginationFullProps {
  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string;
    pageSizeOptions: number[];
  };
  totalCount: number;
  pageSize: number;
  page: number;
  showCount?: boolean;
  pageSearchParam?: string;
}

export function PaginationFull({ pageSizeSelectOptions, pageSize, totalCount, page, showCount }: PaginationFullProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPageCount = Math.ceil(totalCount / pageSize);

  const buildLink = useCallback(
    (newPage: number) => {
      const key = pageSizeSelectOptions?.pageSizeSearchParam || "page";
      if (!searchParams) return `${pathname}?${key}=${newPage}`;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, String(newPage));
      return `${pathname}?${newSearchParams.toString()}`;
    },
    [searchParams, pathname],
  );

  const navToPageSize = useCallback(
    (newPageSize: number) => {
      const key = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
      const newSearchParams = new URLSearchParams(searchParams || undefined);
      newSearchParams.set(key, String(newPageSize));
      router.push(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams, pathname],
  );

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={buildLink(1)} isActive={page === 1}>
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink href={buildLink(totalPageCount)} isActive={page === totalPageCount}>
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 w-full">
      <div className="flex flex-col gap-4 flex-1">
        {pageSizeSelectOptions && (
          <SelectRowsPerPage
            options={pageSizeSelectOptions.pageSizeOptions}
            setPageSize={navToPageSize}
            pageSize={pageSize}
          />
        )}
        {showCount && <ShowingCount totalPerPage={pageSize} page={page} total={totalCount} />}
      </div>
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={page === 1 ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount}
              tabIndex={page === totalPageCount ? -1 : undefined}
              className={page === totalPageCount ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

function ShowingCount({ page, totalPerPage, total }: { total: number; page: number; totalPerPage: number }) {
  const start = (page - 1) * totalPerPage + 1;
  const end = Math.min(page * totalPerPage, total);
  return (
    <span className="text-sm text-gray-700 dark:text-gray-400">
      Showing{" "}
      {start === end || end === 0 ? (
        <span className="font-bold">{`${end.toLocaleString()}`}</span>
      ) : (
        <span className="font-bold">{`${start.toLocaleString()}-${end.toLocaleString()}`}</span>
      )}{" "}
      of <span className="font-bold">{total.toLocaleString()}</span>
    </span>
  );
}

function SelectRowsPerPage({
  options,
  setPageSize,
  pageSize,
}: {
  options: number[];
  setPageSize: (newSize: number) => void;
  pageSize: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap text-sm">Rows per page</span>

      <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
        <SelectTrigger>
          <SelectValue placeholder="Select page size">{String(pageSize)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
