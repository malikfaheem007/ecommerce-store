"use client";
import {BRANDS_QUERYResult, Category, Product} from "@/sanity.types";
import Container from "./Container";
import {Title} from "./ui/text";
import {cn} from "@/lib/utils";
import CategoryList from "./shop/CategoryList";
import BrandsList from "./shop/BrandsList";
import PriceList from "./shop/PriceList";
import {useSearchParams} from "next/navigation";
import {use, useEffect, useState} from "react";
import {client} from "@/sanity/lib/client";
import {Loader2} from "lucide-react";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

const Shop = ({categories, brands}: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = `*[_type == "product" && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id)) && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id)) && price >= $minPrice && price <= $maxPrice] | order(name asc){
      ...,"categories":categories[]->title
      }`;
      const data = await client.fetch(
        query,
        {
          selectedCategory,
          selectedBrand,
          minPrice,
          maxPrice,
        },
        {next: {revalidate: 0}}
      );
      setProducts(data);
    } catch (error) {
      console.log("Shop products fetching Error :", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);
  return (
    <div className="border-t ">
      <Container>
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-base md:text-base uppercase">
              Get the products as your needs
            </Title>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_green underline text-sm mt-2 font-medium hover:text-shop_orange hoverEffect">
                Reset Filters
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto scrollbar-hide md:min-w-64 pb-5 md:border-r border-r-shop_dark_green/50">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandsList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>
          <div className="flex-1 pt-5">
            <div>
              {loading ?
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading . . .
                  </p>
                </div>
              : products?.length > 0 ?
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              : <div>
                  <NoProductsAvailable className="bg-white mt-0" />
                </div>
              }
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
