[ru](./README.ru.md)

# Component architecture

In our projects we follow this architecture:
![Architecture](./architecture.png)

Each file with code should be named as:
1. For container: `header.tsx`
2. For presenter: `header.presenter.tsx`
3. For view `header.view.tsx`

And each class should be exported as:
1. For container: `Header`
2. For presenter: `HeaderPresenter`
3. For view: `HeaderView`

If component doesn't have container layer, name `<Component>` without 
prefixes should be assigned to the last existing layer. For instance, 
component `Button` has only view, styles and animation. We export it 
as `Button`. If presenter layer doesn't exist, container should just 
returns view layer.
