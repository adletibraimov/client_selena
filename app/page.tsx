import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PageBuilder } from "@/components/sections/PageBuilder";
import type { PageData } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";


export const dynamic = "force-dynamic";

async function getPageData(): Promise<PageData | null> {
  try {
    return await sanityFetch<PageData | null>({
      query: HOME_PAGE_QUERY,
      tags: ["page", "homePage"],
    });
  } catch (error) {
    console.error("[home] Failed to fetch Sanity page", error);
    return null;
  }
}

export default async function HomePage() {
  const page = await getPageData();

  if (!page) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-24 text-cocoa">
        <h1 className="font-serif text-4xl">CMS içeriği bulunamadı</h1>
        <p className="mt-4 text-taupe">
          `/studio` üzerinden <strong>Ana Sayfa</strong> belgesini oluşturup
          Publish edin. Header, footer ve page sections alanlarını doldurun.
        </p>
        <a
          href="/studio"
          className="mt-8 inline-flex w-fit rounded-full bg-cocoa px-6 py-3 text-sm text-ivory"
        >
          Studio&apos;yu Aç
        </a>
      </main>
    );
  }

  return (
    <>
      <Header config={page.headerConfig} />
      <PageBuilder
        sections={page.pageSections}
        brandName={page.headerConfig?.brandName}
      />
      <Footer config={page.footerConfig} />
      <WhatsAppButton phoneNumber={page.footerConfig?.whatsappNumber} />

    </>
  );
}
