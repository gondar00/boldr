/* @flow */
// $FlowIssue
import React, {Component} from 'react';
import classNames from 'classnames/bind';
import NavLink from 'react-router-dom/NavLink';
import {FontIcon} from 'boldr-ui';
import styles from './dropdown-list-item.scss';

const cx = classNames.bind(styles);

type Props = {
  item: Object,
  closeDropdowns: () => void,
};
class DropdownListItem extends Component {
  props: Props;
  render() {
    const {item, closeDropdowns} = this.props;

    return (
      <li className={cx('boldr-menu__dropdown-listitem')} role="menuitem">
        <NavLink
          className="dropdown-link"
          to={item.href}
          onClick={closeDropdowns}
        >
          <FontIcon
            className={cx('dropdown-link__icon')}
            role="presentation"
            alt=""
          >
            {item.icon}
          </FontIcon>
          <span className={cx('dropdown-link__text')}>
            {item.name}
          </span>
        </NavLink>
      </li>
    );
  }
}

export default DropdownListItem;