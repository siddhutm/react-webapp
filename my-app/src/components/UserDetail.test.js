import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import UserDetail from './UserDetail';

describe('User Detail', () => {
    it('has user detail info and back button', () => {
        const wrapper = mount(<UserDetail/>);
        expect(wrapper.find('.folderList')).to.have.length(1);
        expect(wrapper.find('.back')).to.have.length(1);
    });

    it('on back click, call back is called', () => {
        const callBack = sinon.fake();
        const props = {
            onBack: callBack,
            userId: '2',
            userName: 'Sid'
        }
        const wrapper = mount(<UserDetail { ...props }/>);
        wrapper.find('.back').simulate('click');
        assert(callBack.called)
    })

    it('on folder select, do not show access logs', () => {
        const wrapper = mount(<UserDetail/>);
        expect(wrapper.find('.accessLogTitle')).to.have.length(0);
    })

    it('show access logs for file select', () => {
        const wrapper = mount(<UserDetail/>);
        wrapper.setState({
            showAccessLogs: true,
            currentFile: {
                name:'Sid',
                size: '2mb'
            }
        })
        expect(wrapper.find('.accessLogTitle')).to.have.length(1);
    })
});