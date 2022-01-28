import * as React from 'react';
import { AnnouncementComponent, UIContainer } from '@zblash/op-web-fronted';
import { useGetAnnouncements } from '@/queries/use-get-announcements';
import { Row, Col } from 'react-bootstrap';
import { useGetCustomerCreditSummary } from '@/queries/use-get-customer-credit-summary';
import CreditsSummary from '@/components/page-components/credits-summary';

/* CustomerHome Helpers */
interface CustomerHomeProps {}

/* CustomerHome Constants */

/* CustomerHome Styles */

/* CustomerHome Component  */
function CustomerHome(props: React.PropsWithChildren<CustomerHomeProps>) {
  /* CustomerHome Variables */

  const {
    data: customerCreditSummary,
    isLoading: customerCreditSummaryLoading,
    error: customerCreditSummaryError,
  } = useGetCustomerCreditSummary();

  const { data: announcements, isLoading: announcementsLoading, error: announcementsError } = useGetAnnouncements();

  /* CustomerHome Callbacks */

  /* CustomerHome Lifecycle  */

  return (
    <UIContainer>
      {!customerCreditSummaryError && !customerCreditSummaryLoading && (
        <Row className="mt-3">
          <Col lg={12} md={12} xl={12} sm={12} xs={12} className="mb-3 pr-0"></Col>
        </Row>
      )}
      <Row className="mt-3">
        {!customerCreditSummaryError && !customerCreditSummaryLoading && (
          <Col lg={4} md={4} xl={4} sm={12} xs={12} className="float-md-right order-md-3">
            <CreditsSummary creditSummary={customerCreditSummary} />
          </Col>
        )}
        {!announcementsError && !announcementsLoading && (
          <>
            <Col lg={8} md={8} xl={8} sm={12} xs={12}>
              <AnnouncementComponent announcements={announcements} />
            </Col>
          </>
        )}
      </Row>

      {!announcementsError && !announcementsLoading && (
        <Row className="mt-3">
          <Col lg={12} md={12} xl={12} sm={12} xs={12} className="mb-3"></Col>
        </Row>
      )}
    </UIContainer>
  );
}
const PureCustomerHome = React.memo(CustomerHome);

export { PureCustomerHome as CustomerHome };
