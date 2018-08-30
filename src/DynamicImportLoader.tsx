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
      this.setState(() => ({
        BaseInstance: file.default
      }));
    });
  }
  render() {
    const { BaseInstance } = this.state;
    const {
      jsxElement,
      renderElement: RenderElement,
      useLoading = true
    } = this.props;
    const children = this.props.children;
    if (BaseInstance) {
      if (children) {
        return children(BaseInstance);
      } else {
        return <BaseInstance />;
      }
    } else {
      if (!useLoading) {
        return null;
      } else {
        if (jsxElement) {
          return jsxElement;
        } else if (RenderElement) {
          return <RenderElement />;
        }
        throw new Error(
          '[Dynamic Import Loder] should specified loading component when useLoading is not true.'
        );
      }
    }
  }
}

export default DynamicImportLoader;
