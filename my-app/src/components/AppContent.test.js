import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import AppContent from './AppContent';

describe('AppContent Component behavior', () => {
    it('should render the menu items with dashboard being defaulted', () => {
        const appContentWrapper = mount(<AppContent />);
        expect(appContentWrapper.state().selectedMenuItem).to.equal('dashboard');
    });

    it('on click on menu item, state changes', () => {
        const wrapper = mount(<AppContent/>);
        expect(wrapper.find('.menuItem')).to.have.lengthOf(3);
        wrapper.find('.menuItem').at(1).simulate('click');
        expect(wrapper.state().selectedMenuItem).to.equal('itemOne');
    });
})