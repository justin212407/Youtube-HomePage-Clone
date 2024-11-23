import { Menu } from "lucide-react";
import logo from "../assets/Logo.png";
import { Button } from "../components/Button";

export function PageHeader() {
  return (
    <div className="flex gap-10 lg:gap-10 justify-between">
      <div className="flex gap-4 items-center flex-shrink-0">
        <Button>
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} alt="Company Logo" className="h-6"></img>
        </a>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
