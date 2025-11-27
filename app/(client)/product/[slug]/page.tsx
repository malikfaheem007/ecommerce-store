import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import {getProductBySlug} from "@/sanity/queries";
import {StarIcon} from "lucide-react";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{slug: string}>;
}) => {
  const {slug} = await params;
  const product = await getProductBySlug(slug);
  return (
    <Container className="flex flex-col md:flex-row py-10 gap-10">
      {product?.images && (
        <ImageView images={product?.images} isStock={product?.stock} />
      )}
      <div className="w-full md:w-1/2 flex flex-col gap-5 ">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <p className="text-sm text-gray-600 tracking-wide">
            {product?.description}
          </p>
          <div className="flex items-center gap-0.5 text-xs">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                className="text-shop_light_green"
                fill={"#3b9c3c"}
              />
            ))}
            <p className="font-semibold">{`(120)`}</p>
          </div>
        </div>
        <div>
          <p>
            {
              <PriceView
                price={product?.price}
                discount={product?.discount}
                className="text-lg font-bold"
              />
            }
          </p>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
