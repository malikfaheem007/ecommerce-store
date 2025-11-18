import {productType} from "@/constants/data";
import Link from "next/link";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}
const HomeTabBar = ({selectedTab, onTabSelect}: Props) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {productType?.map((item) => (
          <button
            onClick={() => onTabSelect(item?.value)}
            key={item?.title}
            className={`border border-shop_light_green px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_bg hover:text-white hoverEffect ${selectedTab === item?.value ? "bg-shop_light_green text-white border-shop_light_green" : "bg-shop_light_green/20"}`}>
            {item?.title}
          </button>
        ))}
      </div>
      <Link href={"/shop"}>See all</Link>
    </div>
  );
};

export default HomeTabBar;
