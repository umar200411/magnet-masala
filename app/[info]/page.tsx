import Link from "@/components/store-link";
import { notFound } from "next/navigation";
import { information } from "@/lib/information";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(information).map(info => ({ info }));
}

export async function generateMetadata({ params }: { params: Promise<{ info: string }> }) {
  const { info } = await params;
  return { title: (Object.hasOwn(information, info) ? information[info].title : undefined) || "Not found" };
}

export default async function Page({ params }: { params: Promise<{ info: string }> }) {
  const { info } = await params;
  const content = Object.hasOwn(information, info) ? information[info] : undefined;
  if (!content) notFound();
  return <main id="main" className="wrap page information"><p className="eyebrow red">MAGNET MASALA</p><h1>{content.title}</h1><p className="intro">{content.intro}</p>{content.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}<Link className="button" href="/shop">Explore the masalas</Link></main>;
}
