# React Dynamic Import Loader

flexible to custom your dynamic import component

## Install

```
> yarn add dynamic-import-loader-react
```

## Uses

with default `loading...` component

```tsx
<DynamicImportLoader
  fileImport={() => import('../__fixtures__/dynamicComponent')}
/>
```

with custom jsxElement loading component

```tsx
const Hello: JSX.Element = <div>Custom Loader</div>;
const tree: ReactWrapper = mount(
  <DynamicImportLoaderj
    fileImport={() => import('../__fixtures__/dynamicComponent')}
    jsxElement={Hello}
  />
);
```

with custom render element

```tsx
const statelessRenderElement: React.StatelessComponent = () => <p>Yo</p>
<DynamicImportLoader
  fileImport={() => import('../__fixtures__/dynamicComponent')}
  renderElement={statelessRenderElement}
/>
```

with custom render function

- It will give you `Dynamic Component`
- Can add custom component wit `Dynamic Component`

```tsx
<DynamicImportLoader
  fileImport={() => import('../__fixtures__/dynamicComponent')}
>
  {Component => (
    <div>
      <button>Click Me</button>
      <Component />
    </div>
  )}
</DynamicImportLoader>
```

# License

MIT
