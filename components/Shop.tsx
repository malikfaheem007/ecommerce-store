"use client";
import {BRANDS_QUERYResult, Category} from "@/sanity.types";
import Container from "./Container";
import {Title} from "./ui/text";
import {cn} from "@/lib/utils";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}
const Shop = ({categories, brands}: Props) => {
  return (
    <div className="border-t ">
      <Container>
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the products as your needs
            </Title>
            <button className="text-shop_dark_green underline text-sm mt-2 font-medium hover:text-shop_orange hoverEffect">
              Reset Filters
            </button>
          </div>
        </div>
        <div></div>
      </Container>
    </div>
  );
};

export default Shop;
