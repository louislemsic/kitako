import Image from "next/image";
import path from "path";
import fs from "fs";
import ReactMarkdown from "react-markdown";
import { BackButton } from "@/components/back-button";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";

// Configurable metadata that can be easily adjusted per project
export const metadata = {
  title: "Privacy Policy",
  description: "Our commitment to protecting your privacy and personal data.",
  bgColor: "bg-bc-1", // Include bg-[color-name]
  textColor: "text-bc-2", // Include text-[color-name]
  logo: {
    src: "/svgs/logo.svg",
    alt: "Kitako Logo",
    width: 1000,
    height: 1000,
  },
  filePath: path.join(process.cwd(), "public", "md", "privacy.md"),
};

export default async function PrivacyPolicy() {
  const fileContent = fs.readFileSync(metadata.filePath, "utf8");

  return (
    <main className={`min-h-screen ${metadata.bgColor} ${metadata.textColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Back Button - only visible on mobile */}
        <div className="lg:hidden fixed top-6 left-6 z-10">
          <BackButton />
        </div>

        {/* Scroll to Top Button - fixed position */}
        <div className="fixed bottom-6 right-6 z-10">
          <ScrollToTopButton />
        </div>

        <div className="lg:flex lg:gap-8">
          {/* Left column - fixed on desktop */}
          <div className="hidden lg:block lg:w-1/3 pt-12">
            <div className="sticky top-56">
              <Image
                src={metadata.logo.src}
                alt={metadata.logo.alt}
                width={metadata.logo.width}
                height={metadata.logo.height}
                className="w-80 h-80 object-contain -ml-15"
              />
              <h1 className={`mt-1 text-4xl font-extrabold`}>
                {metadata.title}
              </h1>
              <p className={`mt-2 text-md leading-tight`}>
                {metadata.description}
              </p>
            </div>
          </div>

          {/* Right column - scrollable content */}
          <div className="lg:w-2/3 py-44">
            {/* Mobile/Tablet header */}
            <div className="lg:hidden mb-8 pl-6">
              <Image
                src={metadata.logo.src}
                alt={metadata.logo.alt}
                width={metadata.logo.width}
                height={metadata.logo.height}
                className="w-72 h-72 object-contain -ml-15"
              />
              <h1 className={`mt-1 text-4xl font-extrabold`}>
                {metadata.title}
              </h1>
              <p className={`mt-2 text-lg leading-tight`}>
                {metadata.description}
              </p>
            </div>

            {/* Content */}
            <div className="overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <ReactMarkdown
                  components={{
                    h2: ({ ...props }) => (
                      <h2
                        className={`text-2xl font-bold mt-8 mb-4 ${metadata.textColor}`}
                        {...props}
                      />
                    ),
                    h3: ({ ...props }) => (
                      <h3
                        className={`text-xl font-semibold mt-6 mb-3 pl-5 ${metadata.textColor}`}
                        {...props}
                      />
                    ),
                    p: ({ ...props }) => (
                      <p className="text-base mb-4 pl-10" {...props} />
                    ),
                    ul: ({ ...props }) => (
                      <ul className="list-disc mb-4 pl-20" {...props} />
                    ),
                    li: ({ ...props }) => <li className="mb-2" {...props} />,
                    a: ({ ...props }) => (
                      <a className={`hover:underline`} {...props} />
                    ),
                  }}
                >
                  {fileContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
