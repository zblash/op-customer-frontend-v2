import * as React from 'react';
import { UIOutlineDownIcon, UILink, ICategoryResponse } from '@zblash/op-web-fronted';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '@/assets/images/logo/flogo.png';
import CategoriesSlider from '../categories-slider';
/* HeaderMenu Helpers */

/* HeaderMenu Constants */
interface HeaderMenuProps {
  mainCategories: ICategoryResponse[];
}
/* HeaderMenu Styles */

/* HeaderMenu Component  */
function HeaderMenu(props: HeaderMenuProps) {
  /* HeaderMenu Variables */

  /* HeaderMenu Callbacks */

  /* HeaderMenu Lifecycle  */

  return (
    <>
      <Container fluid className="header__menu">
        <Row>
          <Col xl={2} lg={2} md={2}>
            <div className="logo">
              <img src={Logo} alt="OnlinePlasiyer" />
            </div>
          </Col>
          <Col xl={10} lg={10} md={10}>
            <div className="header__menu__box">
              <ul>
                <li>
                  <UILink to="/customer/home">ANASAYFA</UILink>
                </li>
                <li>
                  <UILink to="/merchants">SATICILAR</UILink>
                </li>
                <li>
                  <UILink to="/orders">SİPARİŞLERİ GÖR</UILink>
                </li>
                <li>
                  <UILink to="">
                    CARİ İŞLEMLER <UIOutlineDownIcon color="#9e9e9e" />
                  </UILink>
                  <div className="menu_option">
                    <ul>
                      <li>
                        <UILink to="/credits">Cariler</UILink>
                      </li>
                      <li>
                        <UILink to="/credit-activities">Cari Ekstreleri</UILink>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <UILink to="">
                    DESTEK İŞLEMLERİ <UIOutlineDownIcon color="#9e9e9e" />
                  </UILink>

                  <div className="menu_option">
                    <ul>
                      <li>
                        <UILink to="/create-ticket">Destek Talebi Olustur</UILink>
                      </li>
                      <li>
                        <UILink to="/my-tickets">Destek Taleplerim</UILink>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className="mt-5">
        <Row>
          <Col>
            <CategoriesSlider mainCategories={props.mainCategories} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
const PureHeaderMenu = React.memo(HeaderMenu);

export { PureHeaderMenu as HeaderMenu };
