import * as React from 'react';

interface CategorySliderCardProps {
  title: string;
  imgSrc: string;
}

function CategorySliderCard(props: React.PropsWithChildren<CategorySliderCardProps>) {
  return (
    <div className="category-slider-card-wrapper">
      <div className="category-slider-card-img-wrapper">
        <img className="category-slider-card-img" alt={props.title} src={props.imgSrc} />
      </div>
      <div className="category-slider-card-title-wrapper">
        <span>{props.title}</span>
      </div>
    </div>
  );
}
const PureCategorySliderCard = React.memo(CategorySliderCard);

export { PureCategorySliderCard as CategorySliderCard };
