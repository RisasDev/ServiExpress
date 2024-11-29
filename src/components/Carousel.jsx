import React from "react";
import Slider from "react-slick";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const carouselItems = [
    {
      id: 1,
      imageUrl:
        "https://ruizhealytimes.com/wp-content/uploads/2015/04/cambio-aceite-scaled.jpg",
      title: "Cambio de Aceite",
      description:
        "Mantén tu vehículo en óptimas condiciones con nuestro servicio de cambio de aceite.",
    },
    {
      id: 2,
      imageUrl:
        "https://neumax.cl/wp-content/uploads/2020/11/alineacion.jpg",
      title: "Alineación y Balanceo",
      description:
        "Servicio completo de alineación y balanceo para un viaje seguro y cómodo.",
    },
    {
      id: 3,
      imageUrl:
        "https://dercocenter-api.s3.us-east-1.amazonaws.com/images/contents/2022-04-05-frenos.jpg",
      title: "Revisión de Frenos",
      description:
        "Asegúrate de que tus frenos estén en perfectas condiciones con nuestro servicio.",
    },
  ];

  return (
    <section className="py-8 bg-gray-100 relative z-0">
      {" "}
      <Slider {...settings}>
        {carouselItems.map((item) => (
          <div key={item.id} className="relative">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-3xl font-bold text-white mb-2">
                {item.title}
              </h2>
              <p className="text-lg text-white">{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Carousel;
