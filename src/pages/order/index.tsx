import * as React from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { UIContainer, UITableComponent, IOrderItems } from '@zblash/op-web-fronted';
import { useGetOrder } from '@/queries/use-get-order';
import { Row, Col } from 'react-bootstrap';
/* OrderPage Helpers */
interface OrderPageProps {}

interface RouteParams {
  orderId: string;
}

interface OrderItem extends IOrderItems {
  isRemoved: boolean;
}
/* OrderPage Constants */

/* OrderPage Styles */

/* OrderPage Component  */
function OrderPage(props: React.PropsWithChildren<OrderPageProps>) {
  /* OrderPage Variables */
  const { t } = useTranslation();
  const firstRender = React.useRef(true);
  const [orderItems, setOrderItems] = React.useState<Array<OrderItem>>([]);
  const { orderId } = useParams<RouteParams>();
  const { data: order, isLoading: orderLoading, error } = useGetOrder(orderId);

  /* OrderPage Callbacks */

  /* OrderPage Lifecycle  */

  React.useEffect(() => {
    if (!orderLoading && order.orderItems && firstRender) {
      firstRender.current = false;
      setOrderItems(
        order.orderItems.map(item => {
          return { ...item, isRemoved: false };
        }),
      );
    }
  }, [orderLoading, order]);

  return (
    <UIContainer className="order_details">
      {order && !orderLoading && !error && (
        <>
          <Row className="buyer_details">
            <Col className="order_detail_text_wrapper my-4" xl={12} lg={12} sm={12} md={12}>
              <h5>Siparis Detayi</h5>
            </Col>
            <Col xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Satici</h5>
                <p>{order.merchant?.merchantName}</p>
              </div>
            </Col>
            <Col className="d-flex justify-content-end" xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Sehir / Ilce</h5>
                <p>
                  {order.buyerAddress.cityName} / {order.buyerAddress.stateName}
                </p>
              </div>
            </Col>
            <Col xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Siparis Tarihi</h5>
                <p>{order.orderDate}</p>
              </div>
            </Col>
            <Col className="d-flex justify-content-end" xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Siparis No</h5>
                <p>{order.id.slice(0, 10)}</p>
              </div>
            </Col>
            <Col xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Siparis Durumu</h5>
                <p>{t(`order.status.${order.status.toString().toLowerCase()}`)}</p>
              </div>
            </Col>
            <Col className="d-flex justify-content-end" xl={6} lg={6} sm={12} md={6}>
              <div>
                <h5>Odeme Yontemi</h5>
                <p>{t(`order.payment.${order.paymentType.toString().toLowerCase()}`)}</p>
              </div>
            </Col>
            <Col xl={12} lg={12} sm={12} md={12}>
              <div>
                <h5>Adres Detayi</h5>
                <p>{order.buyerAddress.details}</p>
              </div>
            </Col>
            <Col xl={12} lg={12} sm={12} md={12}>
              <div className="d-flex justify-content-between">
                <h5>Toplam Fiyat</h5>
                <h5>{order.totalPrice} TL</h5>
              </div>
            </Col>
          </Row>

          <UITableComponent
            columns={[
              {
                Header: 'Urun Ismi',
                accessor: 'productName',
              },
              {
                Header: 'Promosyon',
                accessor: 'promotion',
                customRenderer: (orderItem: IOrderItems) =>
                  orderItem.promotionText !== undefined ? orderItem.promotionText : 'Yok',
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
                accessor: 'KDV',
                customRenderer: (orderItem: IOrderItems) => `%${orderItem.productTax}`,
              },
              {
                Header: 'KDV Dhl. Birim Fiyat',
                accessor: 'unitPrice',
              },
              {
                Header: 'K. Fiyati',
                accessor: 'price',
              },
              {
                Header: 'Indirim Tutari',
                accessor: 'dPrice',
                customRenderer: (orderItem: IOrderItems) =>
                  `${orderItem.totalPrice - orderItem.discountedTotalPrice} TL`,
              },
              {
                Header: 'Indirimli Toplam Fiyat',
                accessor: 'discountedTotalPrice',
              },
              {
                Header: 'Talep Edilen Adet',
                accessor: 'requestedQuantity',
              },
              {
                Header: 'Toplam Siparis',
                accessor: 'quantity',
              },
            ]}
            data={orderItems}
            pagination={false}
          />
        </>
      )}
    </UIContainer>
  );
}
const PureOrderPage = React.memo(OrderPage);

export { PureOrderPage as OrderPage };
