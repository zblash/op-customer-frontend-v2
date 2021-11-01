import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { UILink } from '..';

interface ShoppingCartProps {
  cartCount: number;
}

function ShoppingCart(props: ShoppingCartProps) {
  return (
    <div className="shopping-cart-wrapper">
      <UILink to="/cart">
        <FaShoppingCart size={24} />
        <span>{props.cartCount}</span>
      </UILink>
    </div>
  );
}

export default ShoppingCart;
