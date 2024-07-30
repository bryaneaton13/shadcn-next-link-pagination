import { Button } from "@/components/ui/button";
import Link from "next/link";
import Item from "./_components/item";
import Code from "./_components/code";

export default function Page() {
  return (
    <div className="flex min-h-screen place-items-center justify-center bg-white p-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mt-28 mb-20">
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl mb-4">Pagination with Nextjs Links</h1>
          <h2 className="leading-loose">
            Uses{" "}
            <a
              href="https://nextjs.org/docs/app/api-reference/components/link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Nextjs Link
            </a>{" "}
            component for pagination.
            <br />
            Applies search parameters for <pre className="inline">page</pre> and <pre className="inline">limit</pre> to
            the current URL.
            <br />
            <Code code="https://example.com?page=1&limit=20" lang="html" />
            <strong>Click around and watch the URL change!</strong>
          </h2>

          <div className="my-8">
            <Item />
          </div>

          <div className="flex justify-center mb-4">
            <Link href="https://github.com/bryaneaton13/shadcn-next-link-pagination" target="_blank">
              <Button variant="secondary" className="border border-foreground hover:shadow-lg transition-all">
                <GithubIcon className="mr-2" /> View on Github
              </Button>
            </Link>
          </div>

          <br />

          <br />
          <br />
          <br />
          <br />

          <div className="flex flex-col gap-16 border border-foreground/20 rounded p-3 md:w-[70vw]">
            <div>
              <h2 className="text-2xl font-bold mb-2">Try it out</h2>

              <Link href="/">
                <Button variant="default">Reset all pagination</Button>
              </Link>
            </div>

            <div>
              <h4>With many pages</h4>
              <Item totalCount={500} pageSize={5} />
            </div>

            <div>
              <h4>With page size options</h4>
              <Item
                pageSizeSelectOptions={{
                  pageSizeOptions: [10, 25, 50, 100],
                }}
              />
            </div>

            <div>
              <h4>With 1 item</h4>
              <Item
                totalCount={1}
                pageSizeSelectOptions={{
                  pageSizeOptions: [10, 25, 50, 100],
                }}
              />
            </div>
          </div>

          <br />
          <br />
          <br />

          <br />

          <h2 className="text-2xl font-bold mb-2">Simple Example</h2>

          <div className="text-left mx-auto w-fit border border-foreground/20 p-3 rounded">
            <Code
              code={`<PaginationWithLinks
  page={1}
  pageSize={20}
  totalCount={500}
/>`}
            />
          </div>
          <br />

          <h2 className="text-2xl font-bold mb-2">Real Example</h2>

          <div className="text-left mx-auto w-fit border border-foreground/20 p-3 rounded">
            <Code
              code={`export default async function Example({ searchParams }) {
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");
  
  const [data, count] = await getDataWithCount();

  return (
    <div>
      {/* Other code */}
      <PaginationWithLinks
        page={page}
        pageSize={pageSize}
        totalCount={count}
      />
    </div>
  );
}
`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg width={16} height={16} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/**
 *
 * Example code
 *
 */

// export default async function Example() {
//   const searchParams = useSearchParams();
//   const page = parseInt(searchParams.get("page") || "1");
//   const pageSize = parseInt(searchParams.get("pageSize") || "20");
//   const [data, count] = await getDataWithCount();
//   return (
//     <div>
//       {/* Other code */}
//       <PaginationWithLinks page={page} pageSize={pageSize} totalCount={count} />
//     </div>
//   );
// }
