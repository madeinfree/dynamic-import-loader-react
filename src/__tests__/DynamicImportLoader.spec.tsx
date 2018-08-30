import * as React from 'react';
import DynamicImportLoader from '../DynamicImportLoader';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';
import * as jsdom from 'jsdom';
import dynamicComponent from '../__fixtures__/dynamicComponent';

declare var global: NodeJS.Global & {
  document: Document;
};

const doc: Document = new jsdom.JSDOM(
  '<!doctype html><html><body></body></html>'
).window.document;
global.document = doc;

Enzyme.configure({ adapter: new Adapter() });

describe('Dynamic Import Loader', () => {
  it('dynamicImportLoader snapshot', () => {
    const dynamicComponent = renderer.create(
      <DynamicImportLoader
        jsxElement={<div>Loading...</div>}
        fileImport={() => import('../__fixtures__/dynamicComponent')}
      />
    );
    const tree = dynamicComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('dynamicImportLoader loading throw error without loading props', () => {
    try {
      shallow(
        <DynamicImportLoader
          fileImport={() => import('../__fixtures__/dynamicComponent')}
        />
      );
    } catch (err) {
      expect(err.message).toEqual(
        '[Dynamic Import Loder] should specified loading component when useLoading is not true.'
      );
    }
  });

  it('dynamicImportLoader props with jsxElement', done => {
    const Hello: JSX.Element = <div>Custom Loader</div>;
    const tree: ReactWrapper = mount(
      <DynamicImportLoader
        jsxElement={Hello}
        fileImport={() => import('../__fixtures__/dynamicComponent')}
      />
    );
    expect(tree.find('div').text()).toEqual('Custom Loader');

    process.nextTick(() => {
      tree.update();
      expect(tree.find(dynamicComponent).text()).toEqual('Hello World');
      done();
    });
  });

  it('dynamicImportLoader props with renderElement ', done => {
    const tree: ReactWrapper = mount(
      <DynamicImportLoader
        fileImport={() => import('../__fixtures__/dynamicComponent')}
        renderElement={() => <p>Yo</p>}
      />
    );
    expect(tree.find('p').text()).toEqual('Yo');

    process.nextTick(() => {
      tree.update();
      expect(tree.find(dynamicComponent).text()).toEqual('Hello World');
      done();
    });
  });

  it('Dynamic Import Loader render function 使用', done => {
    let tree: ReactWrapper = mount(
      <DynamicImportLoader
        jsxElement={<div>Loading</div>}
        fileImport={() => import('../__fixtures__/dynamicComponent')}
      >
        {Component => (
          <div>
            <button>Click Me</button>
            <Component />
          </div>
        )}
      </DynamicImportLoader>
    );

    process.nextTick(() => {
      tree.update();
      expect(tree.find('button').text()).toEqual('Click Me');
      done();
    });
  });
});
