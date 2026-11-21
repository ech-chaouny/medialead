import { NextResponse, type NextRequest } from 'next/server';

/* Langue du site. Le français reste à la racine (/contact), servi en interne par /fr ; l'anglais vit sous /en.
   1. Choix mémorisé (cookie ml_lang, posé par le bouton FR / EN) ;
   2. sinon, navigateur réglé en anglais → version anglaise ; toute autre langue → français. */
const COOKIE = 'ml_lang';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const url = request.nextUrl.clone();

  // /fr/... n'est jamais une adresse publique : on renvoie vers l'adresse sans préfixe.
  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url);
  }
  if (pathname === '/en' || pathname.startsWith('/en/')) return NextResponse.next();

  const saved = request.cookies.get(COOKIE)?.value;
  const browser = (request.headers.get('accept-language') ?? '').split(',')[0].trim().toLowerCase();
  if (saved === 'en' || (!saved && browser.startsWith('en'))) {
    url.pathname = pathname === '/' ? '/en' : `/en${pathname}`;
    url.search = search;
    return NextResponse.redirect(url);
  }

  url.pathname = `/fr${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages seulement : pas l'API, ni les fichiers Next, ni les fichiers statiques (images, vidéos, polices…).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
