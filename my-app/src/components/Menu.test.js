import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Menu from './Menu';


describe('Menu Component', () => {
    it('by default menu is empty', () => {
        const wrapper = mount(<Menu/>);
        expect(wrapper.find('.menuItem')).to.have.length(0)
    })

    it('render menu items', () => {
        const menuProps = {
            items: [{ name: 'Item1', value:'item1' }, { name: 'Item2', value:'item2' }],
            selectedMenuItem: 'item1'
        };
        const wrapper = mount(<Menu { ...menuProps }/>);
        expect(wrapper.find('.menuItem')).to.have.length(2);
        expect(wrapper.find('.selected').text()).to.equal('Item1');
    })

    it('click on menu item', () => {
        const callBack = sinon.fake();
        const menuProps = {
            items: [{ name: 'Item1', value:'item1' }, { name: 'Item2', value:'item2' }],
            selectedMenuItem: 'item1',
            onSelect: callBack
        };
        const wrapper = mount(<Menu { ...menuProps }/>);
        wrapper.find('.menuItem').at(1).simulate('click');
        assert(callBack.calledWith('item2'));
    })

})