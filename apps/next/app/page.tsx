import Header from "./global/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {/* nav */}
        <Header />
        <div id="hero">PASSPORTER</div>
        <div id="body">
          View high-level international travel information for U.S. Citizens
          <div>SEARCHABLE TABLE of countries</div>
          {/* data fed from strapi */}
        </div>
      </div>
    </main>
  );
}
