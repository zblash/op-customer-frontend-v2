import React from 'react';
import { Row, Col } from 'react-bootstrap';
import placeholderImage from '@/assets/placeholder/products/product-listSmall.svg';
import {
  UIContainer,
  UITableComponent,
  ModalComponent,
  ISpecifyProductResponse,
  IProductResponse,
} from '@zblash/op-web-fronted';
import SpecifyAddToCart from './specify-add-to-cart';

interface ProductSpecifyModalProps {
  product: IProductResponse | undefined;
  productSpecifies: ISpecifyProductResponse[] | undefined;
  currentPage: number;
  elementCountOfPage: number;
  onPageChanged: (pageNumber: number) => void;
  isOpened?: boolean;
  onShowingChanged: (showing: boolean) => void;
  addToCart: (id: string, quantity: number) => void;
}

function ProductSpecifyModal(props: ProductSpecifyModalProps) {
  return (
    <>
      {props.productSpecifies && props.product && (
        <ModalComponent
          isShowing={props.isOpened}
          showAcceptButton={false}
          onClose={() => props.onShowingChanged(false)}
          fullScreen
          header="Urun Detaylari"
        >
          <UIContainer>
            <Row className="mb-5">
              <Col xs={12} lg={3} xl={3} md={3}>
                <img
                  src={props.product.photoUrl ? props.product.photoUrl : placeholderImage}
                  className="product-specify-modal-img-top"
                  alt={props.product.name}
                />
              </Col>
              <Col xs={12} lg={9} xl={9} md={9}>
                <p>Urun Ismi: {props?.product.name}</p>
                <p>Barkod: {props.product?.barcodeList.join(',')}</p>
                <p>Vergi Tutari: {props.product?.tax}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <UITableComponent
                  columns={[
                    {
                      Header: 'Satici',
                      accessor: 'merchantName',
                      customRenderer: (
                        productSpecify: ISpecifyProductResponse,
                      ) => `${productSpecify.merchant.merchantName}(
                    ${productSpecify.merchant.merchantScore} )`,
                    },
                    {
                      Header: 'Promosyon',
                      accessor: 'promotion',
                      customRenderer: (productSpecify: ISpecifyProductResponse) =>
                        productSpecify.discount ? `${productSpecify.promotion.promotionText}` : 'Yok',
                    },
                    {
                      Header: 'Icerik',
                      accessor: 'contents',
                      customRenderer: (productSpecify: ISpecifyProductResponse) => `${productSpecify.contents}`,
                    },
                    {
                      Header: 'T.E.S.F',
                      accessor: 'tesf',
                      customRenderer: (productSpecify: ISpecifyProductResponse) =>
                        `${productSpecify.recommendedRetailPrice}`,
                    },
                    {
                      Header: 'Toplam Fiyat',
                      accessor: 'totalPrice',
                      customRenderer: (productSpecify: ISpecifyProductResponse) => `${productSpecify.totalPrice}`,
                    },
                    {
                      Header: 'Birim Fiyati',
                      accessor: 'unitPrice',
                      customRenderer: (productSpecify: ISpecifyProductResponse) => `${productSpecify.unitPrice}`,
                    },
                    {
                      Header: 'Birim',
                      accessor: 'unit',
                      customRenderer: (productSpecify: ISpecifyProductResponse) => `${productSpecify.unitType}`,
                    },
                    {
                      Header: 'Promosyon',
                      accessor: 'promotionText',
                      customRenderer: (productSpecify: ISpecifyProductResponse) =>
                        productSpecify.discount ? `${productSpecify.promotion.promotionText}` : 'Yok',
                    },
                    {
                      Header: '',
                      accessor: 'transaction',
                      customRenderer: (productSpecify: ISpecifyProductResponse) => (
                        <SpecifyAddToCart productSpecifyId={productSpecify.id} onAddToCart={props.addToCart} />
                      ),
                    },
                  ]}
                  data={props.productSpecifies}
                  currentPage={props.currentPage}
                  onPageChange={props.onPageChanged}
                  pagination
                  showLastOrFirstPage
                  showPageSize={7}
                  totalPages={props.elementCountOfPage}
                />
              </Col>
            </Row>
          </UIContainer>
        </ModalComponent>
      )}
    </>
  );
}

export default ProductSpecifyModal;
