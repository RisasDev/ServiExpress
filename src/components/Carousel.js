import React from 'react';
import Slider from 'react-slick';

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
      imageUrl: 'https://via.placeholder.com/800x400/FFBF00/000000?text=Cambio+de+Aceite',
      title: 'Cambio de Aceite',
      description: 'Mantén tu vehículo en óptimas condiciones con nuestro servicio de cambio de aceite.',
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/800x400/00BFFF/000000?text=Alineación+y+Balanceo',
      title: 'Alineación y Balanceo',
      description: 'Servicio completo de alineación y balanceo para un viaje seguro y cómodo.',
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/800x400/DC143C/FFFFFF?text=Revisión+de+Frenos',
      title: 'Revisión de Frenos',
      description: 'Asegúrate de que tus frenos estén en perfectas condiciones con nuestro servicio.',
    },
  ];

  return (
    <section className="py-8 bg-gray-100">
      <Slider {...settings}>
        {carouselItems.map((item) => (
          <div key={item.id} className="relative">
            <img src={item.imageUrl} alt={item.title} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-3xl font-bold text-white mb-2">{item.title}</h2>
              <p className="text-lg text-white">{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Carousel;
