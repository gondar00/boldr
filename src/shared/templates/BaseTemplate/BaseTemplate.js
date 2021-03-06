/* @flow */
import React, { PureComponent } from 'react';
// $FlowIssue
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Footer } from 'boldr-ui';

import {
  fetchMainMenuIfNeeded,
  selectSettings,
  logout,
  selectSettingFromList,
  selectMe,
} from '../../state';
import SiteHeader from '../../components/SiteHeader';
import type { ReactElement, ReactChildren } from '../../types/react';

type Props = {
  header: ReactElement,
  helmetMeta?: ReactElement,
  hero?: ReactElement,
  children: ReactChildren,
  fetchMainMenuIfNeeded: () => void,
  footer?: ReactElement,
  navigate: Function,
  dispatch: Function,
  siteName: string,
  actions: Object,
  me: ?Object,
  isMobile: Boolean,
  ui: Object,
  menu: Object,
  logo: Object,
  auth: Object,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const ContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
  padding-bottom: 250px;
  background-color: #e5eaed;
`;

const FooterWrapper = styled.div`
  margin-top: auto;
`;

class BaseTemplate extends PureComponent {
  static defaultProps: {
    fetchMainMenuIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.actions.fetchMainMenuIfNeeded();
  }

  handleProfileClick = () => {
    this.props.navigate(`/profiles/${this.props.me.username}`);
  };
  handleLogoutClick = () => {
    this.props.actions.logout();
  };
  props: Props;
  render() {
    return (
      <Wrapper {...this.props}>
        {this.props.helmetMeta}

        <SiteHeader
          auth={this.props.auth}
          logo={this.props.logo}
          siteName={this.props.siteName}
          me={this.props.me}
          menu={this.props.menu.details}
          items={this.props.menu.items}
          isMobile={this.props.isMobile}
          handleProfileClick={this.handleProfileClick}
          handleLogoutClick={this.handleLogoutClick}
        />
        {this.props.hero || null}

        <ContentWrapper>
          {this.props.children}
        </ContentWrapper>

        <FooterWrapper>
          {this.props.footer || <Footer />}
        </FooterWrapper>
      </Wrapper>
    );
  }
}
const mapStateToProps = (state: Object) => {
  return {
    me: selectMe(state),
    auth: state.auth,
    settings: selectSettings(state),
    logo: selectSettingFromList(state, 3),
    siteName: selectSettingFromList(state, 1),
    menu: state.boldr.menus.main,
    isMobile: state.boldr.ui.isMobile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        logout,
        fetchMainMenuIfNeeded,
      },
      dispatch,
    ),
    navigate: url => dispatch(push(url)),
    dispatch,
  };
};

export { Wrapper, FooterWrapper };
export default connect(mapStateToProps, mapDispatchToProps)(BaseTemplate);
