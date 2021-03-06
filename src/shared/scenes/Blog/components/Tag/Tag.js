/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Avatar from 'boldr-ui/lib/components/Avatar';
import { FontIcon, Chip, StyleClasses } from 'boldr-ui';

import { selectTag } from '../../state/tags/actions';

type Props = {
  className: ?string,
  tag: Tag,
  dispatch: Function,
};
const BASE_ELEMENT = StyleClasses.TAG;

const Tag = (props: Props) => {
  const { tag, className } = props;
  const classes = classnames(BASE_ELEMENT, className);
  function transitionTag() {
    props.dispatch(selectTag(tag));
  }
  return (
    <div className={classes}>
      <Link to={`/blog/tags/${tag.name}`}>
        <Chip
          onClick={transitionTag}
          label={tag.name}
          avatar={<Avatar icon={<FontIcon>local_offer</FontIcon>} />}
        />
      </Link>
    </div>
  );
};

export default connect()(Tag);
