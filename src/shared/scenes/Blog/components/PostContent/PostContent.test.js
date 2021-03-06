import React from 'react';
import {createStore} from 'redux';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import PostContent from './PostContent';

describe('<PostContent />', () => {
  it('renders <PostContent /> without breaking', () => {
    const wrapper = shallow(<PostContent />);
    expect(wrapper.find('article').length).toBe(1);
  });

  it('accepts props and renders them.', () => {
    const wrapper = shallow(
      <PostContent
        feature_image="http://boldr.io/images/logo.png"
        title="Test Post"
      />,
    );
    expect(wrapper.instance().props.feature_image).toBe(
      'http://boldr.io/images/logo.png',
    );
    expect(wrapper.instance().props.title).toBe('Test Post');
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<PostContent />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
