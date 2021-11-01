import React from 'react';
import { Swiper } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { NavigationOptions } from 'swiper/types/components/navigation';

SwiperCore.use([Navigation, Pagination, Autoplay]);

type CarouselPropsType = {
  className?: string;
  buttonClassName?: string;
  buttonSize?: 'default' | 'small';
  paginationVariant?: 'default' | 'circle';
  centeredSlides?: boolean;
  breakpoints?: {} | any;
  pagination?: {} | any;
  navigation?: {} | any;
  withLoop?: boolean;
  autoplay?: {} | any;
};

const Carousel: React.FunctionComponent<CarouselPropsType> = ({
  children,
  className = '',
  buttonClassName = '',
  buttonSize = 'default',
  paginationVariant = 'default',
  breakpoints,
  withLoop,
  autoplay = {
    delay: 4000,
  },
  ...props
}) => {
  const prevRef = React.useRef<HTMLButtonElement>(null);
  const nextRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div
      className={`carouselWrapper position-relative ${className} ${paginationVariant === 'circle' ? 'dotsCircle' : ''}`}
    >
      <Swiper
        loop={withLoop}
        autoplay={autoplay}
        breakpoints={breakpoints}
        dir="ltr"
        navigation={{
          prevEl: prevRef.current ? prevRef.current : undefined,
          nextEl: nextRef.current ? nextRef.current : undefined,
        }}
        onInit={(swiper: SwiperCore): void => {
          const navigation = swiper.params.navigation as NavigationOptions;
          navigation.prevEl = prevRef.current;
          navigation.nextEl = nextRef.current;
          swiper.navigation.update();
        }}
        {...props}
      >
        {children}
        <div className="navigation-buttons-wrapper">
          <button
            type="button"
            ref={prevRef}
            aria-label="prev-button"
            className={`left-button-navigation  ${buttonClassName}`}
          >
            <IoIosArrowBack />
          </button>
          <button
            type="button"
            ref={nextRef}
            aria-label="next-button"
            className={`right-button-navigation ${buttonClassName}`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
