import React from 'react';
import createMockComponentContext from 'fluxible/utils/createMockComponentContext';
import provideContext from 'fluxible-addons-react/provideContext';
import connectToStores from 'fluxible-addons-react/connectToStores';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import ContentModuleStore from '../../stores/ContentModulesStore';

import createStore from 'fluxible/addons/createStore';


describe('ContentModulesStore', function(){
  var component = null;


  beforeEach('render and locate element', function(done){

    let testStores = [ContentModuleStore];
    let context = createMockComponentContext({
      stores : testStores
    });

    let testComponent = provideContext(connectToStores(component, testStores, function(){
      return {};
    }));
    let x = 42;
    component = TestUtils.renderIntoDocument(<testComponent context={context} abc={x} />);

    done();

  });

  it('should render', function(){
    expect(component).to.exist;
  });
});
