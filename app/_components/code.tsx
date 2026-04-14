import { type BundledLanguage, createHighlighter } from "shiki";

export default async function Code({ code, lang = "jsx" }: { code: string; lang?: BundledLanguage }) {
  const highlighter = await createHighlighter({
    themes: ["github-light-default"],
    langs: [lang],
  });

  const html = highlighter.codeToHtml(code, {
    lang: lang,
    theme: "github-light-default",
  });

  // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates trusted syntax-highlighted HTML for local demo snippets.
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
