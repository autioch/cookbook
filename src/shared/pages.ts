/**
 * The site map: every page but the home page, the recipes and Not found, in menu order
 * (docs/vision.md § Site map). The header, the footer and the sitemap read it, so a page is added
 * in one place.
 */
export interface SitePage {
  path: `/${string}/`;
  title: string;
  /** What the page holds, in a sentence: the meta description. */
  about: string;
  /** Where it's linked: the main menu, or the footer. */
  menu: 'main' | 'footer';
}

export const PAGES: readonly SitePage[] = [
  {
    path: '/przepisy/',
    title: 'Przepisy',
    about:
      'Wszystkie nasze przepisy: obiady, zupy, śniadania, desery i przekąski. Wyszukiwarka po tym, co masz w domu.',
    menu: 'main',
  },
  {
    path: '/o-stronie/',
    title: 'O stronie',
    about: 'Czyje to przepisy i skąd się wzięły.',
    menu: 'footer',
  },
  {
    path: '/prywatnosc/',
    title: 'Prywatność',
    about: 'Co widzi serwer, gdy otwierasz tę stronę, i czego strona nie zbiera.',
    menu: 'footer',
  },
];

/** A page of the site map by its path; the build fails on a path that isn't there. */
export function page(path: SitePage['path']): SitePage {
  const found = PAGES.find((p) => p.path === path);
  if (!found) {
    throw new Error(`No page at ${path} in src/shared/pages.ts`);
  }
  return found;
}
