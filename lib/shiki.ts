import { type BundledLanguage, getSingletonHighlighter } from "shiki";

const SHIKI_THEME = "github-light-default";
const DEFAULT_LANGS: BundledLanguage[] = ["jsx", "html"];

export async function getShikiHighlighter(langs: BundledLanguage[] = []) {
  return getSingletonHighlighter({
    themes: [SHIKI_THEME],
    langs: [...new Set([...DEFAULT_LANGS, ...langs])],
  });
}

export { SHIKI_THEME };
