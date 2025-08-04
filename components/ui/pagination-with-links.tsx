"use client";

import { type ReactNode, useCallback, useTransition } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface PaginationWithLinksProps {
  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string;
    pageSizeOptions: number[];
  };
  totalCount: number;
  pageSize: number;
  page: number;
  pageSearchParam?: string;
  /**
   * Navigation mode: 'link' uses Next.js Link components, 'router' uses router.push with loading states
   * @default 'link'
   */
  navigationMode?: "link" | "router";
}

/**
 * Navigate with Nextjs links or router.push with loading states
 * 
 * @example
 * ```
 * // Using Link navigation (default)
 * <PaginationWithLinks
    page={1}
    pageSize={20}
    totalCount={500}
  />
 * 
 * // Using router.push with loading states
 * <PaginationWithLinks
    page={1}
    pageSize={20}
    totalCount={500}
    navigationMode="router"
  />
 * ```
 */
export function PaginationWithLinks({
  pageSizeSelectOptions,
  pageSize,
  totalCount,
  page,
  pageSearchParam,
  navigationMode = "link",
}: PaginationWithLinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPageCount = Math.ceil(totalCount / pageSize);

  const buildLink = useCallback(
    (newPage: number) => {
      const key = pageSearchParam || "page";
      if (!searchParams) return `${pathname}?${key}=${newPage}`;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, String(newPage));
      return `${pathname}?${newSearchParams.toString()}`;
    },
    [pageSearchParam, searchParams, pathname]
  );

  const navigateToPage = useCallback(
    (newPage: number) => {
      if (navigationMode === "router") {
        const url = buildLink(newPage);
        startTransition(() => {
          router.push(url);
        });
      }
    },
    [navigationMode, buildLink, router]
  );

  const navToPageSize = useCallback(
    (newPageSize: number) => {
      const key = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
      const newSearchParams = new URLSearchParams(searchParams || undefined);
      newSearchParams.set(key, String(newPageSize));
      newSearchParams.delete(pageSearchParam || "page"); // Clear the page number when changing page size
      const url = `${pathname}?${newSearchParams.toString()}`;

      if (navigationMode === "router") {
        startTransition(() => {
          router.push(url);
        });
      } else {
        router.push(url);
      }
    },
    [pageSearchParam, searchParams, pathname, navigationMode, router]
  );

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    const createPageItem = (pageNum: number) => {
      if (navigationMode === "router") {
        return (
          <PaginationItem key={pageNum}>
            <PaginationLink
              onClick={() => navigateToPage(pageNum)}
              isActive={page === pageNum}
              className={cn(
                "cursor-pointer",
                isPending && "pointer-events-none opacity-50"
              )}
              aria-disabled={isPending}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        );
      } else {
        return (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href={buildLink(pageNum)}
              isActive={page === pageNum}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        );
      }
    };

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(createPageItem(i));
      }
    } else {
      items.push(createPageItem(1));

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(createPageItem(i));
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(createPageItem(totalPageCount));
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      {pageSizeSelectOptions && (
        <div className="flex flex-col gap-4 flex-1">
          <SelectRowsPerPage
            options={pageSizeSelectOptions.pageSizeOptions}
            setPageSize={navToPageSize}
            pageSize={pageSize}
          />
        </div>
      )}
      <Pagination className={cn({ "md:justify-end": pageSizeSelectOptions })}>
        <PaginationContent className="max-sm:gap-0">
          {isPending && navigationMode === "router" && (
            <PaginationItem>
              <Loader2 className="h-4 w-4 animate-spin" />
            </PaginationItem>
          )}
          <PaginationItem>
            {navigationMode === "router" ? (
              <PaginationPrevious
                onClick={() => navigateToPage(Math.max(page - 1, 1))}
                aria-disabled={page === 1 || isPending}
                tabIndex={page === 1 || isPending ? -1 : undefined}
                className={cn(
                  page === 1 || isPending
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                )}
              />
            ) : (
              <PaginationPrevious
                href={buildLink(Math.max(page - 1, 1))}
                aria-disabled={page === 1}
                tabIndex={page === 1 ? -1 : undefined}
                className={
                  page === 1 ? "pointer-events-none opacity-50" : undefined
                }
              />
            )}
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            {navigationMode === "router" ? (
              <PaginationNext
                onClick={() =>
                  navigateToPage(Math.min(page + 1, totalPageCount))
                }
                aria-disabled={page === totalPageCount || isPending}
                tabIndex={page === totalPageCount || isPending ? -1 : undefined}
                className={cn(
                  page === totalPageCount || isPending
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                )}
              />
            ) : (
              <PaginationNext
                href={buildLink(Math.min(page + 1, totalPageCount))}
                aria-disabled={page === totalPageCount}
                tabIndex={page === totalPageCount ? -1 : undefined}
                className={
                  page === totalPageCount
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
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

      <Select
        value={String(pageSize)}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select page size">
            {String(pageSize)}
          </SelectValue>
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
