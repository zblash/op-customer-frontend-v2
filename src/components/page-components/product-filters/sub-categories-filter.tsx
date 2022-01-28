import React from 'react';
import { UILink, ICategoryResponse } from '@zblash/op-web-fronted';

interface SubCategoriesFilterProps {
  categories: ICategoryResponse[];
}

function SubCategoriesFilter(props: SubCategoriesFilterProps) {
  return (
    <div className="product-filter-wrapper">
      {props.categories.map(category => (
        <div className="product-filter m-2" key={`product-filter-cats-${category.id}`}>
          <UILink to={`/category-products/${category.id}`}>{category.name}</UILink>
        </div>
      ))}
    </div>
  );
}

export default SubCategoriesFilter;
