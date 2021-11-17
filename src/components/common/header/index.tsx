/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Container } from 'react-bootstrap';
import {
  UIUserIcon,
  UIMapIcon,
  UIFacebookIcon,
  UITwitterIcon,
  UIInstagramIcon,
  UILinkedInIcon,
  UISignOutIcon,
  UINotificationHornIcon,
  UINotificationIcon,
  UIDownChevronIcon,
  UILink,
  useWindowSize,
  IUserInfoResponse,
  ICategoryResponse,
} from '@onlineplasiyer/op-web-fronted';
import ShoppingCart from '@/components/page-components/shopping-cart';
import { HeaderMenu } from '../header-menu/desktop';
import { MobileHeaderMenu } from '../header-menu/mobile';
import { TabletHeaderMenu } from '../header-menu/tablet';
/*
  Header Helpers
*/

export interface HeaderProps {
  isAuthenticated: boolean;
  userDetails: IUserInfoResponse | undefined;
  logout: (redirectLocation?: string) => void;
}

interface MHeaderProps extends HeaderProps {
  mainCategories: ICategoryResponse[];
  cartCount: number;
}

/*
  Header Styles
*/

const _Header: React.SFC<MHeaderProps> = props => {
  const { width } = useWindowSize();

  return (
    <>
      <MobileHeaderMenu isAuthenticated={props.isAuthenticated} userDetails={props.userDetails} logout={props.logout} />

      <Container fluid className="header__top">
        {width > 1180 && (
          <div className="header__top__left">
            {props.isAuthenticated && props.userDetails && (
              <>
                <ul>
                  <li>
                    <UIUserIcon color="#8CBC43" /> Sn: {props.userDetails.name}
                    <div className="user_box">
                      <ul>
                        <li>
                          <UILink to="/profile">Profili Gör</UILink>
                        </li>
                        <li onClick={() => props.logout()}>
                          Çıkış Yap <UISignOutIcon />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <UIMapIcon color="#8CBC43" /> Şube: {props.userDetails.address.stateName}
                  </li>
                  <li>
                    <UINotificationIcon color="#8CBC43" /> Bildirimler
                    <div className="user_box notification_box scrollbar" id="style-15">
                      <ul>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span> Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span> Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span>Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span> Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span> Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span>Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span>Lorem Ipsum, masaüstü </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </>
            )}
          </div>
        )}
        <div className="header__top__right">
          {width > 1180 && (
            <ul>
              <li>
                <a href="https://facebook.com/">
                  <UIFacebookIcon />
                </a>
              </li>
              <li>
                <a href="https://facebook.com/">
                  <UITwitterIcon />
                </a>
              </li>
              <li>
                <a href="https://facebook.com/">
                  <UIInstagramIcon />
                </a>
              </li>
              <li>
                <a href="https://facebook.com/">
                  <UILinkedInIcon />
                </a>
              </li>
            </ul>
          )}
          <div className="language_box">
            TÜRKÇE <UIDownChevronIcon />
            <div className="language_option">
              <ul>
                <li>
                  <a href="#">TÜRKÇE</a>
                </li>
                <li>
                  <a href="#">İNGİLİZCE</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      {props.isAuthenticated && <ShoppingCart cartCount={props.cartCount} />}
      {props.isAuthenticated && <HeaderMenu mainCategories={props.mainCategories} />}
      {props.isAuthenticated && (
        <TabletHeaderMenu
          isAuthenticated={props.isAuthenticated}
          userDetails={props.userDetails}
          logout={props.logout}
        />
      )}
    </>
  );
};

const Header = _Header;

export { Header };
