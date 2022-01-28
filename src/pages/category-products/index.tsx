import * as React from 'react';
import { useParams } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '@/components/page-components/product-card';
import { useGetAllProductsByCategoryId } from '@/queries/paginated/use-get-all-products-by-category-id';
import SubCategoriesFilter from '@/components/page-components/product-filters/sub-categories-filter';
import { useGetSubCategoriesByParent } from '@/queries/use-get-sub-categories-by-parent';
import { Pagination, UIContainer, IProductResponse, useLocationQueryParams } from '@zblash/op-web-fronted';
import { useAddToCartMutation } from '@/queries/mutations/use-add-to-cart';
import ProductSpecifyModal from '@/components/page-components/product-speficies-modal';
import { useGetProductSpecifies } from '@/queries/paginated/use-get-product-specifies';

/* CategoryProducts Helpers */
interface CategoryProductsProps {}

interface RouteParams {
  categoryId: string;
}
/* CategoryProducts Constants */

/* CategoryProducts Styles */

/* CategoryProducts Component  */
function CategoryProducts(props: React.PropsWithChildren<CategoryProductsProps>) {
  /* CategoryProducts Variables */
  const locationQueryParams = useLocationQueryParams();

  const [productPageNumber, setProductPageNumber] = React.useState<number>(
    locationQueryParams && locationQueryParams.getParam('pageNumber')
      ? parseInt(locationQueryParams.getParam('pageNumber'), 10)
      : 1,
  );

  const [selectedProduct, setSelectedProduct] = React.useState<IProductResponse>();

  const [productSpecifyPage, setProductSpecifyPage] = React.useState<number>(1);
  const [productSpecifyOpened, setProductSpecifyOpened] = React.useState<boolean>(false);

  const { categoryId } = useParams<RouteParams>();

  const {
    data: subCategories,
    isLoading: isSubCategoriesLoading,
    error: subCategoriesError,
  } = useGetSubCategoriesByParent(categoryId, true);
  const { data: products, isLoading, error } = useGetAllProductsByCategoryId({
    categoryId,
    pageNumber: productPageNumber,
  });

  const { data: productSpecifiesData } = useGetProductSpecifies({
    isEnabled: !!selectedProduct,
    pageNumber: productSpecifyPage,
    productId: selectedProduct?.id,
  });

  const { mutate: addToCart } = useAddToCartMutation();
  /* CategoryProducts Callbacks */

  const onPageChange = React.useCallback(
    _pageNumber => {
      setProductPageNumber(_pageNumber);
      locationQueryParams.setParam('pageNumber', _pageNumber);
    },
    [locationQueryParams],
  );

  const productSpecifyPageChanged = React.useCallback((pageNumber: number) => {
    setProductSpecifyPage(pageNumber);
  }, []);

  const selectedProductChanged = React.useCallback((product: IProductResponse) => {
    setSelectedProduct(product);
    setProductSpecifyOpened(true);
  }, []);
  /* CategoryProducts Lifecycle  */

  return (
    <UIContainer>
      {!isLoading && !error && (
        <>
          <Row>
            <Col xl="3" lg="3" md="3">
              {!isSubCategoriesLoading && !subCategoriesError && subCategories && (
                <SubCategoriesFilter categories={subCategories} />
              )}
            </Col>
            <Col xl="9" lg="9" md="9">
              <Row>
                {products.values.length > 0 && (
                  <>
                    {products.values.map(product => (
                      <Col key={`category-product-${product.id}`} xl="3" lg="3" md="4" xs="6" className="mb-3">
                        <ProductCard product={product} onProductClicked={selectedProductChanged} />
                      </Col>
                    ))}

                    <ProductSpecifyModal
                      onPageChanged={productSpecifyPageChanged}
                      product={selectedProduct}
                      productSpecifies={productSpecifiesData?.values}
                      elementCountOfPage={productSpecifiesData?.totalPage}
                      currentPage={productSpecifiesData?.pageNumber}
                      isOpened={productSpecifyOpened}
                      onShowingChanged={(showing: boolean) => {
                        setProductSpecifyOpened(showing);
                      }}
                      addToCart={(id: string, quantity: number) => addToCart({ id, quantity })}
                    />

                    <Pagination
                      currentPage={products.pageNumber}
                      onChange={onPageChange}
                      showLastOrFirstPage
                      totalPages={products.totalPage}
                      showPageSize={7}
                    />
                  </>
                )}
                {products.values.length === 0 && <h3>Kategoride urun bulunamadi.</h3>}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </UIContainer>
  );
}
const PureCategoryProducts = React.memo(CategoryProducts);

export { PureCategoryProducts as CategoryProducts };
