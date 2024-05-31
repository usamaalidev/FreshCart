import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  async function getProducts() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );

    return data;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <>
      <HomeSlider />
      <CategorySlider />
      <section className="min-h-screen flex justify-center items-center">
        {!isLoading ? (
          <div className="grid grid-cols-12 gap-4">
            {data.data.map((product) => (
              <ProductCard productInfo={product} key={product.id} />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}
