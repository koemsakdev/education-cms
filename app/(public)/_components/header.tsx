import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-bold tracking-tight text-gray-900">
            EduCMS
          </span>
        </div>
        <nav className="hidden space-x-6 md:flex">
          {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button size="sm">Get Started Free</Button>
        </div>
      </div>
    </header>
  );
};
