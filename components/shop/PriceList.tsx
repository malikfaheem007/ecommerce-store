import {Label} from "../ui/label";
import {RadioGroup, RadioGroupItem} from "../ui/radio-group";
import {Title} from "../ui/text";

const priceArray = [
  {title: "Under $100", value: "0-100"},
  {title: "100 - $200", value: "100-200"},
  {title: "200 - $300", value: "200-300"},
  {title: "300 - $500", value: "300-500"},
  {title: "Over - $500", value: "500-10000"},
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}
const PriceList = ({selectedPrice, setSelectedPrice}: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base md:text-base font-black">Price</Title>
      <RadioGroup value={selectedPrice || ""} className="mt-2 space-y-1">
        {priceArray?.map((Price, index) => (
          <div
            onClick={() => {
              setSelectedPrice(Price?.value);
            }}
            key={index}
            className="flex items-center space-x-2 hover:cursor-pointer">
            <RadioGroupItem
              value={Price?.title}
              id={Price?.value}
              className="rounded-md"
            />
            <Label
              htmlFor={priceArray[0]?.value}
              //   className={`${selectedBrand === brand?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {Price?.title}
            </Label>
          </div>
        ))}
        {selectedPrice && (
          <button
            onClick={() => setSelectedPrice(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-1 hover:text-shop_dark_green hoverEffect text-left">
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default PriceList;
