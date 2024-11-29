import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat2,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import React, { Children, ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions, videos } from "../data/home";
import { useSidebarContext } from "../contexts/SidebarContext";

export function SideBar() {
  const { isLargeOpen, isSmallOpen } = useSidebarContext();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat2} title="Shorts" url="/" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scollbar-hidden pb-4 flex-col gap-2 px-2 lg:flex hidden">
        <LargeSideBarSection visibleItemCount={1}>
          <LargeSideBarItem isActive Icon={Home} title="Home" url="/" />
          <LargeSideBarItem
            Icon={Clapperboard}
            title="Subscriptions"
            url="subscriptions"
          />
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItemCount={5}>
          <LargeSideBarItem Icon={Library} title="Library" url="/library" />
          <LargeSideBarItem Icon={History} title="History" url="/history" />
          <LargeSideBarItem
            Icon={PlaySquare}
            title="Subscriptions"
            url="/your-videos"
          />
          <LargeSideBarItem
            Icon={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSideBarItem
              key={playlist.id}
              Icon={ListVideo}
              title={playlist.name}
              url={`playlisy?list=${playlist.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection>
          {subscriptions.map((subscription) => (
            <LargeSideBarItem
              key={subscription.id}
              Icon={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Explore">
          <LargeSideBarItem Icon={Flame} title="Trending" url="/trending" />
          <LargeSideBarItem
            Icon={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSideBarItem Icon={Music2} title="Music" url="/music" />
          <LargeSideBarItem Icon={Radio} title="Live" url="/live" />
          <LargeSideBarItem Icon={Film} title="Movies & Tv" url="/movies-tv" />
          <LargeSideBarItem Icon={Gamepad2} title="Gaming" url="/gaming" />
          <LargeSideBarItem Icon={Trophy} title="Sports" url="/sports" />
          <LargeSideBarItem Icon={Newspaper} title="News" url="/news" />
          <LargeSideBarItem Icon={Lightbulb} title="Learning" url="/learning" />
          <LargeSideBarItem
            Icon={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSideBarItem Icon={Podcast} title="Podcasts" url="/podcasts" />
        </LargeSideBarSection>
      </aside>
    </>
  );
}

type SmallSideBarItemProps = {
  Icon: ElementType | string;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 items-center flex flex-col rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSideBarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="w-full flex items-center rounded lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"} </div>
        </Button>
      )}
    </div>
  );
}

type LargeSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSideBarItem({
  Icon,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof Icon === "string" ? (
        <img src={Icon} className="w-6 h-6 rounded-full" />
      ) : (
        <Icon className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
