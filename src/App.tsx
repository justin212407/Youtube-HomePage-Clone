import { useState } from "react";
import { CategoryPills } from "./components/CategoryPills";
import { categories } from "./data/home";
import { PageHeader } from "./layouts/PageHeader";
import { VideoGridItem } from "./components/VideoGridItem";
import { videos } from "./data/home";
import { SideBar } from "./layouts/SideBar";
import { SideBarProvider } from "./contexts/SidebarContext";

export default function App() {
  const [selectedCategory, setSelctedCategory] = useState(categories[0]);
  return (
    <SideBarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <SideBar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelctedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SideBarProvider>
  );
}
