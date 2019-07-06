import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import User from './User';


describe('User Component', () => {
    it('should render user info', () => {
        const props = {
            name:'Siddhu',
            org:'someOrg',
            os: 'mac'
        };

        const wrapper = mount(<User { ...props } />);
        expect(wrapper.find('.name').text()).to.equal('Siddhu');
        expect(wrapper.find('.org').text()).to.equal('someOrg');
        expect(wrapper.find('.os').text()).to.equal('mac');
    });

    it('on card click, callback is to be called', () => {
        const callBack = sinon.fake();
        const props = {
            id:'2',
            name:'Siddhu',
            org:'someOrg',
            os: 'mac',
            onClick: callBack
        };

        const wrapper = mount(<User { ...props } />);
        wrapper.find('.user').simulate('click');
        assert(callBack.calledWith('2', 'Siddhu'));
    });
})