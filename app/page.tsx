import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import React from "react";

function Home() {
  return (
    <div className="p-10 bg-shop_light_pink">
      <h2 className="text-xl font-semibold">Welcome to the Home Page</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
        voluptatibus consequatur veritatis quae expedita asperiores nulla ad
        natus dolorum. Consectetur id repellendus ducimus neque minus sunt
        eveniet eos, sit quae fuga aliquam sapiente perspiciatis deserunt
        laborum distinctio, reprehenderit non rem iusto architecto dignissimos
        vel voluptatem dolores, debitis repellat? Delectus, a?
      </p>
      <Button>check out</Button>
    </div>
  );
}

export default Home;
