import React from 'react';
import { Button } from 'react-bootstrap';
import QuantityInput from '../quantity-input';

interface SpecifyAddToCartProps {
  productSpecifyId: string;
  quantity?: number;
  disableButton?: boolean;
  onAddToCart: (id: string, quantity: number) => void;
}

function SpecifyAddToCart(props: SpecifyAddToCartProps) {
  const [quantity, setQuantity] = React.useState<number>(props.quantity || 0);

  const changeQuantity = React.useCallback(
    (q: number) => {
      setQuantity(q);
      if (props.disableButton) {
        props.onAddToCart(props.productSpecifyId, q);
      }
    },
    [props],
  );
  const addToCart = React.useCallback(() => {
    if (quantity > 0) {
      props.onAddToCart(props.productSpecifyId, quantity);
    }
  }, [props, quantity]);

  return (
    <div className="specify-add-to-cart-input-wrapper d-flex flex-column justify-content-center">
      <QuantityInput min={0} max={10} quantity={quantity} onChange={changeQuantity} />
      {!props.disableButton && (
        <Button className="mt-1" onClick={addToCart}>
          Sepete Ekle
        </Button>
      )}
    </div>
  );
}

export default SpecifyAddToCart;
