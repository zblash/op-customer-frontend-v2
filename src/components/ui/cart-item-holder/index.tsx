import React from 'react';
import {
  ICreditResponse,
  IPaymentMethodsResponse,
  ICartItemDetailResponse,
  ICardItemResponse,
} from '@/utils/api/api-models';
import { Row, Col, Button } from 'react-bootstrap';
import { UIContainer } from '../container';
import { UICheckbox } from '../checkbox';
import { UITableComponent } from '../table';
import SpecifyAddToCart from '../product-speficies-modal/specify-add-to-cart';
import { UISelect } from '../select';

interface CartItemHolderProps {
  cartItem: ICartItemDetailResponse;
  paymentMethods: Array<IPaymentMethodsResponse>;
  creditSummary: ICreditResponse;
  cartItemCount: number;
  onSelectedChanged: (cartItemId, isSelected) => void;
  allSelected: boolean;
  addToCart: (id: string, quantity: number) => void;
  removeItemHandler: (cartItemId: string) => void;
  onPaymentMethodChanged: (id: string, paymentMethod: string) => void;
}

function CartItemHolder(props: CartItemHolderProps) {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  const onSelectedChanged = React.useCallback(
    (_selected: boolean) => {
      setIsSelected(_selected);
      props.onSelectedChanged(props.cartItem.id, _selected);
    },
    [props],
  );

  const onPaymentMethodChanged = React.useCallback(
    (e: { value: string; label: string }) => {
      props.onPaymentMethodChanged(props.cartItem.id, e.value);
    },
    [props],
  );

  React.useEffect(() => {
    setIsSelected(props.allSelected);
  }, [props.allSelected]);

  return (
    <UIContainer className="border rounded py-5">
      <Row>
        <Col lg={12} md={12} xl={12} sm={12} xs={12}>
          <Row>
            <Col lg={4} md={4} xl={4} sm={4} xs={4}>
              {props.cartItemCount > 0 ? (
                <UICheckbox
                  label={props.cartItem.sellerName}
                  id={props.cartItem.id}
                  value={isSelected}
                  onChange={onSelectedChanged}
                />
              ) : (
                <strong>{props.cartItem.sellerName}</strong>
              )}
            </Col>
            <Col lg={4} md={4} xl={4} sm={4} xs={4}>
              <UISelect
                isSearchable
                onChange={(e: { value: string; label: string }) => onPaymentMethodChanged(e)}
                options={props.paymentMethods
                  .filter(
                    paymentMethod =>
                      !(
                        paymentMethod.paymentOption === 'SYSTEM_CREDIT' &&
                        props.creditSummary.creditLimit < props.creditSummary.totalDebt + props.cartItem.totalPrice
                      ),
                  )
                  .map(paymentMethod => {
                    return {
                      label: paymentMethod.displayName,
                      value: paymentMethod.paymentOption,
                    };
                  })}
                labelKey=""
                placeholderKey="Odeme Yontemi"
              />
            </Col>
            <Col lg={4} md={4} xl={4} sm={4} xs={4} className="text-right">
              <p className="">
                Toplam Fiyat:{' '}
                {props.cartItem.discountedTotalPrice < props.cartItem.totalPrice && (
                  <span> {props.cartItem.totalPrice} TL </span>
                )}
                {props.cartItem.discountedTotalPrice.toFixed(2)} TL ({props.cartItem.quantity} Adet)
              </p>
            </Col>
          </Row>
        </Col>
        <Col lg={12} md={12} xl={12} sm={12} xs={12}>
          <UITableComponent
            columns={[
              {
                Header: 'Urun Ismi',
                accessor: 'productName',
              },
              {
                Header: 'S.Birimi',
                accessor: 'unitType',
              },
              {
                Header: 'B. Icerigi',
                accessor: 'unitContents',
              },
              {
                Header: 'KDV',
                accessor: 'fixedUnitPrice',
                customRenderer: (productSpecify: ICardItemResponse) => `${productSpecify.unitPrice.toFixed(2)} TL`,
              },
              {
                Header: 'KDV Dhl. Birim Fiyat',
                accessor: 'totalPrice',
                customRenderer: (productSpecify: ICardItemResponse) =>
                  productSpecify.unitType === 'AD' || productSpecify.unitType === 'KL'
                    ? `${(productSpecify.unitPrice * productSpecify.unitContents).toFixed(2)} TL`
                    : '',
              },
              {
                Header: 'K. Fiyati',
                accessor: 'unitPrice',
                customRenderer: (productSpecify: ICardItemResponse) => {
                  return (
                    <>
                      {productSpecify.discountedTotalPrice < productSpecify.totalPrice && (
                        <p>{productSpecify.totalPrice.toFixed(2)} TL</p>
                      )}
                      <p>{productSpecify.discountedTotalPrice.toFixed(2)} TL</p>
                    </>
                  );
                },
              },
              {
                Header: 'Siparis Adedi',
                accessor: 'transactionCart',
                customRenderer: (productSpecify: ICardItemResponse) => (
                  <SpecifyAddToCart
                    productSpecifyId={productSpecify.productId}
                    quantity={productSpecify.quantity}
                    onAddToCart={props.addToCart}
                    disableButton
                  />
                ),
              },
              {
                Header: '',
                accessor: 'transactionRemove',
                customRenderer: (productSpecify: ICardItemResponse) => (
                  <Button
                    onClick={() => {
                      props.removeItemHandler(productSpecify.productId);
                    }}
                  >
                    Sil
                  </Button>
                ),
              },
            ]}
            data={props.cartItem.details}
            pagination={false}
          />
        </Col>
      </Row>
    </UIContainer>
  );
}

export default CartItemHolder;
