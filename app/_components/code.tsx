import { SHIKI_THEME, getShikiHighlighter } from "@/lib/shiki";
import type { BundledLanguage } from "shiki";

export default async function Code({ code, lang = "jsx" }: { code: string; lang?: BundledLanguage }) {
  const highlighter = await getShikiHighlighter([lang]);

  const html = highlighter.codeToHtml(code, {
    lang,
    theme: SHIKI_THEME,
  });

  // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates trusted syntax-highlighted HTML for local demo snippets.
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
