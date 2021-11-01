import React from 'react';
import { SwiperSlide } from 'swiper/react';
import Carousel from '@/components/ui/carousel';
import { ICategoryResponse } from '@/utils/api/api-models';
import { UILink } from '@/components/ui';

interface CategoriesSliderProps {
  mainCategories: ICategoryResponse[];
}

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

export default function CategoriesSlider(props: CategoriesSliderProps) {
  return (
    <>
      <Carousel breakpoints={breakpoints} buttonClassName="-mt-8 md:-mt-10" withLoop={false} autoplay={false}>
        {props.mainCategories &&
          props.mainCategories.map(category => (
            <SwiperSlide key={`category-swiper-${category.id}`}>
              <div className="category-slider-card-wrapper">
                <div className="category-slider-card-img-wrapper">
                  <UILink to={`/category-products/${category.id}`}>
                    <img className="category-slider-card-img" alt="asdas" src={category.photoUrl} />
                  </UILink>
                </div>
                <div className="category-slider-card-title-wrapper">
                  <span>{category.name}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Carousel>
    </>
  );
}
