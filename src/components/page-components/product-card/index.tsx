import React from 'react';
import { IProductResponse } from '@zblash/op-web-fronted';
import { Button } from 'react-bootstrap';
import placeholderImage from '@/assets/placeholder/products/product-listSmall.svg';

interface ProductCardProps {
  product: IProductResponse;
  onProductClicked: (product: IProductResponse) => void;
}

function ProductCard(props: ProductCardProps) {
  const handleClick = React.useCallback(() => {
    props.onProductClicked(props.product);
  }, [props]);

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={props.product.photoUrl ? props.product.photoUrl : placeholderImage}
        className="card-img-top"
        alt={props.product.name}
      />
      <div className="card-body">
        <div className="clearfix mb-3">
          <span className="float-left">En dusuk fiyat</span>
          <span className="float-right">12354.00€</span>
        </div>
        <h5 className="card-title">{props.product.name}</h5>
        <div className="text-center my-4">
          <Button type="button" onClick={handleClick}>
            Fiyatlari Gor
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
