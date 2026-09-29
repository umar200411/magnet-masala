"use client";

export default function StoreError() {
  return <main id="main" className="wrap page information"><h1>Something went wrong.</h1><p>Please reload the page to try again. Your saved basket will still be here.</p><button className="button" onClick={() => window.location.reload()}>Reload page</button></main>;
}
