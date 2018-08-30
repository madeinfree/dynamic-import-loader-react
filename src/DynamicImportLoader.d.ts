import { Component } from 'react';

export type DynamicImportProps = {
  fileImport: () => Promise<any>;
  jsxElement?: JSX.Element;
  renderElement?: React.StatelessComponent | React.ComponentClass | undefined;
  children?: (
    instance: React.StatelessComponent | React.ComponentClass | null
  ) => React.ReactNode;
  useLoading?: boolean;
};
export type DynamicImportState = {
  BaseInstance: React.ComponentClass | React.StatelessComponent | null;
};

export default class DynamicImportLoader extends Component<
  DynamicImportProps,
  DynamicImportState
> {}
