import {twMerge} from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}
const PriceFormatter = ({amount, className}: Props) => {
  const PriceFormatter = new Number(amount).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });
  return (
    <span
      className={twMerge("text-sm font-semibold text-darkColor", className)}>
      {PriceFormatter}
    </span>
  );
};
export default PriceFormatter;
