import Dashboard from "./_dashboard";
import Header from "./_header";
import Footer from "./_footer";

export default function Main() {
  return(
    <main id="section-main" className="bg-slate-100 relative sm:mx-auto w-full h-full max-w-200 overflow-auto">
      <div className="flex h-full container flex-col p-8 mb-6">
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </main>
  );
};