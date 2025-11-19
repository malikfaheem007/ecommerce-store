interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}
const PriceView = ({price, discount, className}: Props) => {
  return (
    <div>
      <div>{price}</div>
    </div>
  );
};

export default PriceView;
