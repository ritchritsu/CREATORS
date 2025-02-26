import Image from "next/image";
import QuoteButton from "@/components/ui/QuoteButton";

const products = [
  {
    category: "Category 1",
    items: [
      { name: "Product 1", image: "/IMAGES/1.jpg" },
      { name: "Product 2", image: "/IMAGES/2.jpg" },
      { name: "Product 3", image: "/IMAGES/3.jpg" },
    ],
  },
  {
    category: "Category 2",
    items: [
      { name: "Product 1", image: "/IMAGES/4.jpg" },
      { name: "Product 2", image: "/IMAGES/5.jpg" },
      { name: "Product 3", image: "/IMAGES/6.jpg" },
    ],
  },
  {
    category: "Category 3",
    items: [
      { name: "Product 1", image: "/IMAGES/7.jpg" },
      { name: "Product 2", image: "/IMAGES/8.jpg" },
      { name: "Product 3", image: "/IMAGES/9.jpg" },
    ],
  },
  {
    category: "Category 4",
    items: [
      { name: "Product 1", image: "/IMAGES/10.jpg" },
      { name: "Product 2", image: "/IMAGES/11.jpg" },
      { name: "Product 3", image: "/IMAGES/12.jpg" },
    ],
  },
  {
    category: "Category 5",
    items: [
      { name: "Product 1", image: "/IMAGES/13.jpg" },
      { name: "Product 2", image: "/IMAGES/14.jpg" },
      { name: "Product 3", image: "/IMAGES/15.jpg" },
    ],
  },
  {
    category: "Category 6",
    items: [
      { name: "Product 1", image: "/IMAGES/16.jpg" },
      { name: "Product 2", image: "/IMAGES/17.jpg" },
      { name: "Product 3", image: "/IMAGES/18.jpg" },
    ],
  },
  {
    category: "Category 7",
    items: [
      { name: "Product 1", image: "/IMAGES/19.jpg" },
      { name: "Product 2", image: "/IMAGES/20.jpg" },
      { name: "Product 3", image: "/IMAGES/21.jpg" },
    ],
  },
  {
    category: "Category 8",
    items: [
      { name: "Product 1", image: "/IMAGES/22.jpg" },
      { name: "Product 2", image: "/IMAGES/23.jpg" },
      { name: "Product 3", image: "/IMAGES/24.jpg" },
    ],
  },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen">
      <section className="section bg-gray-900">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Our Products & Services
          </h1>
          <p className="text-xl text-center mb-12 text-gray-300">
            Discover our range of high-quality industrial machinery and custom
            fabrication services.
          </p>
          {products.map((category, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-[#b7922c]">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-[#0f0f19] rounded-lg overflow-hidden shadow-lg"
                  >
                    <Image
                      src={item.image || "/IMAGES/placeholder.jpg"}
                      alt={item.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-[#0f0f19]">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Additional Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#b7922c]">
                HVAC & Plumbing
              </h3>
              <p className="text-gray-300">
                We offer comprehensive HVAC and plumbing solutions for
                industrial and commercial applications.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#b7922c]">
                Construction & Fabrication
              </h3>
              <p className="text-gray-300">
                Our team provides custom fabrication and construction services
                tailored to your specific needs.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#b7922c]">
                Networking & Demolition
              </h3>
              <p className="text-gray-300">
                We offer networking solutions and professional demolition
                services for industrial projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Custom Solutions
          </h2>
          <p className="text-xl text-center mb-12 text-gray-300">
            Can't find exactly what you need? We specialize in custom
            fabrication to meet your unique requirements.
          </p>
          <div className="text-center">
            <QuoteButton />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
