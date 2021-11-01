import React from 'react';

interface QuantityInputProps {
  quantity: number;
  onChange: (q: number) => void;
  disableIncrement?: boolean;
  disableDecrement?: boolean;
  min?: number;
  max?: number;
}

function QuantityInput(props: QuantityInputProps) {
  const [quantity, setQuantity] = React.useState<number>(props.quantity || 0);

  const changeQuantity = React.useCallback(
    (q: number) => {
      if (q >= props.min && q <= props.max) {
        setQuantity(q);
        props.onChange(q);
      }
    },
    [props],
  );

  const handleQuantityChange = React.useCallback(
    (e: any) => {
      changeQuantity(parseInt(e.target.value, 10));
    },
    [changeQuantity],
  );

  const decrementQuantity = React.useCallback(() => {
    const lQuantity = quantity - 1;
    changeQuantity(lQuantity);
  }, [changeQuantity, quantity]);

  const incrementQuantity = React.useCallback(() => {
    const lQuantity = quantity + 1;
    changeQuantity(lQuantity);
  }, [quantity, changeQuantity]);

  return (
    <div className="quantity-input-wrapper">
      <button type="button" onClick={decrementQuantity} disabled={props.disableDecrement}>
        -
      </button>
      <input className="mx-1" type="number" value={quantity} onChange={handleQuantityChange} />
      <button type="button" onClick={incrementQuantity} disabled={props.disableIncrement}>
        +
      </button>
    </div>
  );
}

export default QuantityInput;
