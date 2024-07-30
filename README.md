## Shadcn Nextjs Link Pagination

Use shadcn pagination components to create links that will dynamically update based on the current page and the total number of pages.

You can use Nextjs server components to control the `page` and `pageSize` parameters that get updated in the URL.

`https://example.com?page=1&pageSize=20`

## Getting Started with

1. Copy the code located in [`pagination-with-links.tsx`](https://github.com/bryaneaton13/shadcn-next-link-pagination/blob/main/components/ui/pagination-with-links.tsx) and paste it into your project.
2. Use the code

## Example

Simple Example

```tsx
<PaginationWithLinks page={1} pageSize={20} totalCount={500} />
```

Example with Nextjs Server Components

```tsx
export default async function Example({ searchParams }) {
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");

  const [data, count] = await getDataWithCount();

  return (
    <div>
      {/* Other code */}
      <PaginationWithLinks page={page} pageSize={pageSize} totalCount={count} />
    </div>
  );
}
```
