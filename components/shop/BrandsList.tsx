import {BRANDS_QUERYResult} from "@/sanity.types";
import {Title} from "../ui/text";
import {RadioGroup, RadioGroupItem} from "../ui/radio-group";
import {Label} from "../ui/label";

interface Props {
  brands: BRANDS_QUERYResult;
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandsList = ({brands, selectedBrand, setSelectedBrand}: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base md:text-base font-black">Brands</Title>
      <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
        {brands?.map((brand) => (
          <div
            onClick={() => {
              setSelectedBrand(brand?.slug?.current as string);
            }}
            key={brand?._id}
            className="flex items-center space-x-2 hover:cursor-pointer">
            <RadioGroupItem
              value={brand?.slug?.current as string}
              id={brand?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={`${brand?.slug?.current}`}
              className={`${selectedBrand === brand?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}>
              {brand?.title}
            </Label>
          </div>
        ))}
        {selectedBrand && (
          <button
            onClick={() => setSelectedBrand(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-1 hover:text-shop_dark_green hoverEffect text-left">
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default BrandsList;
