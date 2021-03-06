/* @flow */

import React from 'react';
import classNames from 'classnames/bind';
import NavLink from 'react-router-dom/NavLink';
import { FontIcon } from 'boldr-ui';
import styles from './dropdown-list-item.scss';

const cx = classNames.bind(styles);

type Props = {
  item: Object,
  closeDropdowns: () => void,
};
const DropdownListItem = ({ item, closeDropdowns }: Props) => (
  <li className={cx('boldrui-sh__menu-dropdown-listitem')} role="menuitem">
    <NavLink className="dropdown-link" to={item.href} onClick={closeDropdowns}>
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

export default DropdownListItem;
