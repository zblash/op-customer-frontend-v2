import React from 'react';
import { UIShoppingCartIcon, UILink } from '@onlineplasiyer/op-web-fronted';

interface ShoppingCartProps {
  cartCount: number;
}

function ShoppingCart(props: ShoppingCartProps) {
  return (
    <div className="shopping-cart-wrapper">
      <UILink to="/cart">
        <UIShoppingCartIcon size={24} />
        <span>{props.cartCount}</span>
      </UILink>
    </div>
  );
}

export default ShoppingCart;
