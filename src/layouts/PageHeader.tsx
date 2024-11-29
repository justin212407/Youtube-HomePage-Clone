import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/Logo.png";
import { Button } from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const { toggle } = useSidebarContext;

  return (
    <div className="flex items-center justify-between pt-2 mb-6 mx-4">
      {!showFullWidthSearch && (
        <div className="flex items-center gap-4">
          <Button onClick={toggle} variant="ghost" size="icon">
            <Menu />
          </Button>
          <a href="/">
            <img src={logo} alt="Company Logo" className="h-8" />
          </a>
        </div>
      )}

      <form
        className={`flex items-center gap-4 flex-grow justify-center ${
          showFullWidthSearch
            ? "absolute left-0 right-0 mx-4"
            : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="flex-grow rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full outline-none focus:border-blue-500"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="ml-2">
          <Mic />
        </Button>
      </form>

      {!showFullWidthSearch && (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowFullWidthSearch(true)}
            size="icon"
            variant="ghost"
            className="md:hidden"
          >
            <Search />
          </Button>
          <Button size="icon" variant="ghost" className="md:hidden">
            <Mic />
          </Button>
          <Button size="icon" variant="ghost">
            <Upload />
          </Button>
          <Button size="icon" variant="ghost">
            <Bell />
          </Button>
          <Button size="icon" variant="ghost">
            <User />
          </Button>
        </div>
      )}
    </div>
  );
}
