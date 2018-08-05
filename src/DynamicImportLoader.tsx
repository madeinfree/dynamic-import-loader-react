import * as React from 'react';
import {
  DynamicImportProps,
  DynamicImportState
} from './DynamicImportLoader.d';

class DynamicImportLoader extends React.Component<
  DynamicImportProps,
  DynamicImportState
> {
  constructor(props: DynamicImportProps) {
    super(props);
    this.state = {
      BaseInstance: null
    };
  }
  componentDidMount() {
    const { fileImport }: DynamicImportProps = this.props;
    fileImport().then((file: any) => {
      this.setState(state => ({
        BaseInstance: file.default
      }));
    });
  }
  render() {
    const { BaseInstance } = this.state;
    const { jsxElement, renderElement: RenderElement } = this.props;
    const children = this.props.children;
    if (BaseInstance) {
      if (children) {
        return children(BaseInstance);
      } else {
        return <BaseInstance />;
      }
    } else {
      if (jsxElement) {
        return jsxElement;
      } else if (RenderElement) {
        return <RenderElement />;
      }
    }
    return <div>Loading...</div>;
  }
}

export default DynamicImportLoader;
