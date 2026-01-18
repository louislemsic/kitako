import Link from "next/link";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bc-1 text-bc-2 flex items-center justify-center">
      <div className="text-center px-5">
        <Ghost className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-6xl font-bold mb-4">Oops! Sorry.</h1>
        <p className="text-xl mb-8">
          It's either you're lost or we made a mistake. Syempre ikaw may
          kasalanan, bakit kami mag so-sorry? Hinahanap-hanap mo parin yung wala
          naman talaga.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-bc-2 text-bc-1 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
