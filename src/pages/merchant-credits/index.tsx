import * as React from 'react';
import { UIContainer, UITableComponent, UILink, IUserCreditResponse } from '@onlineplasiyer/op-web-fronted';
import { useGetAllUserCredits } from '@/queries/paginated/use-get-all-user-credits';
import { Row, Col } from 'react-bootstrap';
/* MerchantCreditsPage Helpers */
interface MerchantCreditsPageProps {}

/* MerchantCreditsPage Constants */

/* MerchantCreditsPage Styles */

/* MerchantCreditsPage Component  */
function MerchantCreditsPage(props: React.PropsWithChildren<MerchantCreditsPageProps>) {
  /* MerchantCreditsPage Variables */

  const [sortBy, setSortBy] = React.useState<string>();
  const [sortType, setSortType] = React.useState<string>();
  const [username, setUsername] = React.useState<string>();
  const [pageNumber, setPageNumber] = React.useState(1);

  const { data: creditsValues, isLoading, error } = useGetAllUserCredits({
    pageNumber,
    sortBy,
    sortType,
    userName: username,
  });

  /* MerchantCreditsPage Callbacks */

  /* MerchantCreditsPage Lifecycle  */

  return (
    <UIContainer>
      {!isLoading && !error && (
        <Row>
          <Col xl={12} lg={12} sm={12} md={12}>
            <h3>Krediler</h3>
          </Col>
          <Col xl={12} lg={12} sm={12} md={12}>
            <UITableComponent
              columns={[
                {
                  Header: 'Satici No',
                  customRenderer: (item: IUserCreditResponse) => item.customerId.slice(0, 10),
                  accessor: 'merchantId',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Satici',
                  accessor: 'merchantName',
                  sort: true,
                  sortType: 'desc',
                  customRenderer: (item: IUserCreditResponse) => (
                    <UILink to={`/credit-activities/${item.customerId}`}>{item.customerName}</UILink>
                  ),
                },
                {
                  Header: 'Toplam Borc',
                  accessor: 'totalDebt',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Kredi Limiti',
                  accessor: 'creditLimit',
                  sort: true,
                  sortType: 'desc',
                },
              ]}
              data={creditsValues.values}
              currentPage={pageNumber}
              onPageChange={(gPageNumber: number) => {
                setPageNumber(gPageNumber);
              }}
              pagination
              showLastOrFirstPage
              showPageSize={7}
              totalPages={creditsValues.totalPage}
              onSortChange={(e: string) => {
                setSortBy(e);
              }}
              onSortTypeChange={value => {
                setSortType(value);
              }}
            />
          </Col>
        </Row>
      )}
    </UIContainer>
  );
}
const PureMerchantCreditsPage = React.memo(MerchantCreditsPage);

export { PureMerchantCreditsPage as MerchantCreditsPage };
