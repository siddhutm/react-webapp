import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import FileOFolder from './FileOFolder';

describe('FileOFOlder component', () => {
    it('by default renders folder', () => {
        var callback = sinon.fake();
        const props = {
            name: 'folder1',
            onClick: callback
        }
        const wrapper = mount(<FileOFolder { ...props } />);
        expect(wrapper.find('.folder')).to.have.lengthOf(1)
        expect(wrapper.find('.fname').text()).to.equal('folder1');
    });

    it('on folder click', () => {
        var callback = sinon.fake();
        const props = {
            name: 'folder1',
            onClick: callback
        }
        const wrapper = mount(<FileOFolder { ...props } />);
        wrapper.find('.folder').simulate('click');
        assert(callback.calledWith('folder'));
    });

    it('renders file', () => {
        var callback = sinon.fake();
        const props = {
            name: 'File1',
            onClick: callback,
            type:'file'
        }
        const wrapper = mount(<FileOFolder { ...props } />);
        expect(wrapper.find('.file')).to.have.lengthOf(1);
        expect(wrapper.find('.fname').text()).to.equal('File1');
    });

    it('on file click', () => {
        var callback = sinon.fake();
        const props = {
            name: 'File1',
            onClick: callback,
            type: 'file'
        }
        const wrapper = mount(<FileOFolder { ...props } />);
        wrapper.find('.file').simulate('click');
        assert(callback.calledWith(props.type));
    })

})