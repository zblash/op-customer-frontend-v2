import { ICategoryResponse } from '@/services/helpers/backend-models';
import * as React from 'react';
import { Carousel } from '@/components/ui/carousel/carousel';
import { Container } from 'react-bootstrap';
import { SwiperSlide } from 'swiper/react';
import { CategorySliderCard } from './category-slider-card';

interface CategoriesSliderProps {
  mainCategories: ICategoryResponse[];
  routeBase: string;
}

function CategoriesSlider(props: React.PropsWithChildren<CategoriesSliderProps>) {
  const breakpoints = {
    '1720': {
      slidesPerView: 8,
      spaceBetween: 28,
    },
    '1400': {
      slidesPerView: 7,
      spaceBetween: 28,
    },
    '1025': {
      slidesPerView: 6,
      spaceBetween: 28,
    },
    '768': {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    '500 ': {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    '0': {
      slidesPerView: 3,
      spaceBetween: 12,
    },
  };

  return (
    <>
      {props.mainCategories && props.mainCategories.length > 0 && (
        <div className="lg:mt-14 xl:mt-14 mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-14 xl:pb-14">
          <Container fluid>
            <Carousel breakpoints={breakpoints} buttonClassName="-mt-8 md:-mt-10">
              {props.mainCategories?.map((category: ICategoryResponse) => (
                <SwiperSlide key={`category--key-${category.id}`}>
                  <CategorySliderCard title={category.name} imgSrc={category.photoUrl} />
                </SwiperSlide>
              ))}
            </Carousel>
          </Container>
        </div>
      )}
    </>
  );
}
const PureCategoriesSlider = React.memo(CategoriesSlider);

export { PureCategoriesSlider as CategoriesSlider };
