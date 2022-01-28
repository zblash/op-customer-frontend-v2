/* eslint-disable dot-notation */
import * as React from 'react';
import { useParams, useLocation } from 'react-router';
import { UIContainer, UITableComponent, ICreditActivityResponse, twoDigit } from '@zblash/op-web-fronted';
import { Row, Col } from 'react-bootstrap';
import CreditActivitiesFilterComponent from '@/components/page-components/credit-activities-filter';
import { useGetAllUsersCreditActivities } from '@/queries/paginated/use-get-all-users-credit-activities';

/* CreditActivitiesPage Helpers */
interface CreditActivitiesPageProps {}
interface RouteParams {
  creditId?: string;
}
/* CreditActivitiesPage Constants */

/* CreditActivitiesPage Styles */

/* CreditActivitiesPage Component  */
function CreditActivitiesPage(props: React.PropsWithChildren<CreditActivitiesPageProps>) {
  /* CreditActivitiesPage Variables */
  const locationState = useLocation().state;
  const [activityType, setActivityType] = React.useState(
    locationState && locationState['activityType'] ? locationState['activityType'] : undefined,
  );
  const { creditId } = useParams<RouteParams>();

  const [sortBy, setSortBy] = React.useState<string>();
  const [sortType, setSortType] = React.useState<string>();
  const [lastDate, setLastDate] = React.useState<string>();
  const [startDate, setStartDate] = React.useState<string>();
  const [pageNumber, setPageNumber] = React.useState(1);

  const { data: creditsValues, isLoading, error } = useGetAllUsersCreditActivities({
    sortBy,
    sortType,
    startDate,
    lastDate,
    userId: creditId,
    activityType,
    pageNumber,
  });

  /* CreditActivitiesPage Callbacks */

  const handleLastDateFilterChange = React.useCallback((e: Date) => {
    setLastDate(`${twoDigit(e.getDate())}-${twoDigit(e.getMonth() + 1)}-${e.getFullYear()}`);
  }, []);
  const handleStartDateFilterChange = React.useCallback((e: Date) => {
    setStartDate(`${twoDigit(e.getDate())}-${twoDigit(e.getMonth() + 1)}-${e.getFullYear()}`);
  }, []);

  /* CreditActivitiesPage Lifecycle  */

  return (
    <UIContainer>
      {!isLoading && !error && (
        <Row>
          <Col xl={12} lg={12} sm={12} md={12}>
            <h3>Cari Ekstralar</h3>

            <Col xl={12} lg={12} sm={12} md={12}>
              <CreditActivitiesFilterComponent
                setLastDate={handleLastDateFilterChange}
                setStartDate={handleStartDateFilterChange}
              />
            </Col>
          </Col>
          <Col xl={12} lg={12} sm={12} md={12}>
            <UITableComponent
              columns={[
                {
                  Header: 'No',
                  customRenderer: (item: ICreditActivityResponse) => item.id.slice(0, 10),
                  accessor: 'id',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Satici',
                  accessor: 'merchant',
                  customRenderer: (item: ICreditActivityResponse) => item.merchantName,
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Belge No',
                  accessor: 'documentNo',
                  sort: true,
                  sortType: 'desc',
                },

                {
                  Header: 'Tarih',
                  accessor: 'date',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Islem Tipi',
                  accessor: 'activityType',
                },
                {
                  Header: 'Odeme Yontemi',
                  accessor: 'paymentType',
                },
                {
                  Header: 'Fatura Tutari',
                  accessor: 'price',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Odenen Tutar',
                  accessor: 'paidPrice',
                  sort: true,
                  sortType: 'desc',
                },
                {
                  Header: 'Kalan Borc',
                  accessor: 'currentDebt',
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
              totalPages={creditsValues.elementCountOfPage}
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
const PureCreditActivitiesPage = React.memo(CreditActivitiesPage);

export { PureCreditActivitiesPage as CreditActivitiesPage };
