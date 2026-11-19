import { ArrowUp } from "lucide-react";
import { Logo } from "./ui";

export function Footer() {
  return (
    <footer className="pb-8 pt-16 md:pt-20">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-12 md:grid-cols-12 md:gap-8">
          <div className="col-span-2 md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-[18rem] text-[15px] leading-relaxed text-muted">
              A small, native home for your containers. Free and open source.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-line pt-6 text-[13.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>Nookat is free software under the Apache-2.0 license.</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-medium text-muted transition-colors hover:text-ink"
          >
            Back to top
            <span className="grid size-8 place-items-center rounded-md border border-line-2">
              <ArrowUp className="size-3.5" strokeWidth={2} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
