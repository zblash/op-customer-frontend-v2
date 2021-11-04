import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { UIContainer, UICheckbox } from '@/components/ui';
import { useGetCustomerCreditSummary } from '@/queries/use-get-customer-credit-summary';
import CreditsSummary from '@/components/ui/credits-summary';
import { useAddToCartMutation } from '@/queries/mutations/use-add-to-cart';
import { useCartCheckoutMutation } from '@/queries/mutations/use-cart-checkout';
import { useCartSetPaymentMutation } from '@/queries/mutations/use-set-payment';
import { useRemoveCartItemMutation } from '@/queries/mutations/use-remove-cart';
import CartItemHolder from '@/components/ui/cart-item-holder';
import { useGetPaymentMethods } from '@/queries/use-get-payment-methods';
import { useCartContext } from '@/contexts/cart-context';

/* CartPage Helpers */

interface CartPageProps {}

/* CartPage Constants */

/* CartPage Styles */

/* CartPage Component  */
function CartPage(props: React.PropsWithChildren<CartPageProps>) {
  /* CartPage Variables */
  const history = useHistory();
  const { cart, setCart, removeCart, refetch: refetchCart, cartLoading, cartError } = useCartContext();
  const [allChecked, setAllChecked] = React.useState<boolean>(true);
  const [selectedSellerIds, setSelectedSellerIds] = React.useState<Array<string>>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = React.useState<
    Array<{ id: string; paymentMethod: string }>
  >([]);

  const {
    data: customerCreditSummary,
    isLoading: customerCreditSummaryLoading,
    error: customerCreditSummaryError,
  } = useGetCustomerCreditSummary();

  const { data: paymentMethods, isLoading: paymentMethodsLoading, error: paymentMethdosError } = useGetPaymentMethods();

  const { mutateAsync: removeItemMutation } = useRemoveCartItemMutation();

  const { mutateAsync: addToCart } = useAddToCartMutation();

  const { mutateAsync: setPaymentMutation } = useCartSetPaymentMutation();

  const { mutateAsync: checkoutCart } = useCartCheckoutMutation();

  /* CartPage Callbacks */
  const onSelectedSellersChanged = React.useCallback(
    (id: string, isSelected: boolean) => {
      if (!isSelected) {
        setSelectedSellerIds(selectedSellerIds.filter(ids => ids !== id));
        setAllChecked(false);
      } else {
        setSelectedSellerIds([...selectedSellerIds, id]);
        setAllChecked([...selectedSellerIds, id].length === cart.items.length);
      }
    },
    [cart, selectedSellerIds],
  );

  const onSelectAll = React.useCallback(() => {
    if (!allChecked) {
      setAllChecked(true);
      setSelectedSellerIds(cart.items.map(cartItem => cartItem.id));
    } else {
      setAllChecked(false);
      setSelectedSellerIds([]);
    }
  }, [allChecked, cart]);
  /* CartPage Lifecycle  */
  React.useEffect(() => {
    refetchCart();
  }, [refetchCart]);
  React.useEffect(() => {
    if (cart && cart.items && cart.items.length > 0 && !cartError && !cartLoading) {
      setSelectedSellerIds(cart.items.map(cartItem => cartItem.id));
    }
  }, [cart, cartError, cartLoading]);

  const handleCartCheckout = React.useCallback(() => {
    checkoutCart({
      sellerIdList: selectedSellerIds,
    }).then(() => {
      removeCart();
      history.push('/orders');
    });
  }, [checkoutCart, history, removeCart, selectedSellerIds]);

  return (
    <UIContainer>
      <Row className="mt-3">
        {!customerCreditSummaryError && !customerCreditSummaryLoading && (
          <Col lg={12} md={12} xl={12} sm={12} xs={12}>
            <CreditsSummary creditSummary={customerCreditSummary} />
          </Col>
        )}
      </Row>
      {!cartLoading &&
        !paymentMethdosError &&
        !paymentMethodsLoading &&
        !cartError &&
        cart &&
        cart.items &&
        cart.items.length > 0 &&
        !customerCreditSummaryError &&
        !customerCreditSummaryLoading && (
          <Row className="mt-3 mb-5">
            <Col lg={9} md={9} xl={9} sm={12} xs={12} className="border rounded">
              <UIContainer>
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <UICheckbox label="Tumunu Sec" id="checkAllSellers" value={allChecked} onChange={onSelectAll} />
                </Col>
                {cart.items.map(cartItem => (
                  <Col lg={12} md={12} xl={12} sm={12} xs={12} key={`cart-item-holder-${cartItem.id}`}>
                    <CartItemHolder
                      cartItem={cartItem}
                      paymentMethods={paymentMethods}
                      creditSummary={customerCreditSummary}
                      cartItemCount={cart.items.length}
                      onSelectedChanged={onSelectedSellersChanged}
                      allSelected={selectedSellerIds.some(ids => cartItem.id === ids)}
                      addToCart={(id: string, quantity: number) => {
                        addToCart({ id, quantity }).then(data => {
                          setCart(data);
                        });
                      }}
                      removeItemHandler={(_cartItemId: string) => {
                        removeItemMutation({ id: _cartItemId }).then(data => {
                          setCart(data);
                        });
                      }}
                      onPaymentMethodChanged={(id: string, paymentMethod: string) => {
                        setPaymentMutation({ paymentOption: paymentMethod, holderId: id }).then(() => {
                          setSelectedPaymentMethods([...selectedPaymentMethods, { id, paymentMethod }]);
                        });
                      }}
                    />
                  </Col>
                ))}
              </UIContainer>
            </Col>
            <Col lg={3} md={3} xl={3} sm={12} xs={12}>
              <div className="border rounded p-4 text-center">
                <h4 className="mb-4">
                  Secili Urunler(
                  {cart.items
                    .filter(item => selectedSellerIds.includes(item.id))
                    .map(item => item.quantity)
                    .reduce((a, c) => {
                      return a + c;
                    }, 0)}
                  )
                </h4>

                <h5 className="mb-4">
                  {cart.items
                    .filter(item => selectedSellerIds.includes(item.id))
                    .map(item => item.discountedTotalPrice)
                    .reduce((a, c) => {
                      return a + c;
                    }, 0)
                    .toFixed(2)}
                  TL
                </h5>

                <Button
                  className="mb-4 btn-secondary"
                  disabled={selectedSellerIds.length <= 0 || selectedSellerIds.length !== selectedPaymentMethods.length}
                  onClick={handleCartCheckout}
                >
                  Sepeti Onayla
                </Button>
                <p>*Secili siparislerde odeme yontemini secmeyi unutmayin*</p>
              </div>
            </Col>
          </Row>
        )}
    </UIContainer>
  );
}
const PureCartPage = React.memo(CartPage);

export { PureCartPage as CartPage };
