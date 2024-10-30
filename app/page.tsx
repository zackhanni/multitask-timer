import Footer from "@/components/Footer";
import Stopwatches from "@/components/Stopwatches";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="space-y-10 py-10">
        <div className="container flex flex-col space-y-8 items-center sm:items-start">
          <h1 className="text-4xl font-bold dark:invert text-accent">
            Multitask Timer
          </h1>
          <ol className="list-inside list-decimal text-center sm:text-left font-[family-name:var(--font-geist-mono)] space-y-2">
            <li>Name and create your timer.</li>
            <li>When 1 timer starts, others stop.</li>
            <li>You can rename, reset or delete your timers.</li>
          </ol>
        </div>
        <Stopwatches />
      </main>
      <Footer />
    </div>
  );
}
