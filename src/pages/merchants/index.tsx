/* eslint-disable dot-notation */
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { UIContainer, UITableComponent, UILink, ICommonMerchantResponse } from '@zblash/op-web-fronted';
import { useGetAllMerchants } from '@/queries/paginated/use-get-all-merchants';
/*
  OrdersPage Helpers
*/
interface MerchantsPageProps {}

/*
  OrdersPage Colors // TODO : move theme.json
*/
/*
  OrdersPage Strings
*/

/*
  OrdersPage Styles
*/

const MerchantsPage: React.SFC<MerchantsPageProps> = props => {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const { data: merchants, isLoading, error } = useGetAllMerchants({ pageNumber, sortBy, sortType });

  const __ = (
    <UIContainer>
      {!isLoading && !error && (
        <Row>
          <Col xl={12} lg={12} sm={12} md={12}>
            <h3>{t('Sistemde Kayitli Saticilar')}</h3>
          </Col>
          <Col xl={12} lg={12} sm={12} md={12}>
            <UITableComponent
              columns={[
                {
                  Header: 'Satici No',
                  accessor: 'merchantId',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Satici',
                  accessor: 'merchantName',
                  sort: true,
                  sortType: 'desc',
                  customRenderer: (item: ICommonMerchantResponse) => (
                    <UILink to={`/merchant/${item.merchantId}`}>
                      {item.merchantName} ({item.merchantScore})
                    </UILink>
                  ),
                },
              ]}
              data={merchants.values}
              currentPage={1}
              onPageChange={setPageNumber}
              pagination
              showLastOrFirstPage
              onSortChange={setSortBy}
              onSortTypeChange={setSortType}
              showPageSize={7}
              totalPages={merchants.totalPage}
            />
          </Col>
        </Row>
      )}
    </UIContainer>
  );

  /*
  OrdersPage Lifecycle
  */

  /*
  OrdersPage Functions
  */

  return __;
};

const _MerchantsPage = MerchantsPage;

export { _MerchantsPage as MerchantsPage };
