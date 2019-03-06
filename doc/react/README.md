# React

## 0. Введение

### 0.1. Термины и определения

### 0.2. Использованные источники

## 1. Правила именования файлов

## 2. Форматирование

## 3. Использование технологии

### 3.1. Styled Components

#### 3.1.1. Использовать для обращения к компоненту класс в качестве селектора

Использовать для обращения к компоненту класс в качестве селектора вместо 
названия тега.

```typescript
// Плохо
const burger = navbar.find('input');

// Хорошо
const burger = navbar.find(BurgerWrapper);
```

### 3.2. Props

#### 3.2.1. Обработчики по умолчанию

Использовать обработчик по умолчанию в `defaultProps` вместо проверки 
существования обработчика:

```typescript
// Плохо
private onBurgerBtnClicked(): void {
    if (this.props.onBurgerBtnClicked) {
        this.props.onBurgerBtnClicked();
    }
}

// Хорошо
static defaultProps = {
    onBurgerBtnClicked: () => {}
};
```

#### 3.2.2. \[Не автоматизировано\] Правила именования для обработчков

Использовать следующий формат для описания обработчика в комментарии:
`Handler for <действие> on [что-то] [дополнительное описание]`

```typescript
// Плохо

/**
* Callback is invoked when user presses burger button.
*/
onBurgerBtnClick?: () => void;

/**
* Invoked after user presses burger button.
*/
onBurgerBtnClick?: () => void;

// Хорошо

/**
 * Handler for click on burger button.
 */
onBurgerBtnClick?: () => void;
```

#### 3.2.3. \[Не автоматизировано\] Порядок в опредлении свойств 

Использовать следующие приоритеты:

1. Обязательные свойства
2. Необязательные свойства
3. Обязательные свойства с callback
4. Необязательные свойства с callback

В каждом пункте приоритеризация в зависимости от значимости свойства.

```typescript
export interface Props {
    title: string;
    mode: SomeComponentMode;
    fluent?: boolean;
    onValueChange: (value: string) => void;
    onFocus?: () => void;
}
```

### 3.3. Template

#### 3.3.1. \[Не автоматизировано\] Вынесение частей шаблона, которая показывается по условию в отдельную функцию

Если у нас есть условие для отрисовки блока и блок занимает больше одной строки, 
то его необходимо вынести в отдельную функцию.

```typescript jsx
// Плохо

<CardRoot {...this.props}>
    {this.props.children}
    {
        hasContent &&
        <Content>
            {this.props.title && <Title {...this.props}>{this.props.title}</Title>}
            {this.props.subtitle && <Subtitle>{this.props.subtitle}</Subtitle>}

            <Description>{this.props.description}</Description>

            {this.props.icon && <Icon>{this.props.icon}</Icon>}
        </Content>
    }
</CardRoot>

// Хорошо

render(): ReactNode {
    const hasContent = this.props.title || this.props.subtitle || this.props.icon || this.props.description;
    return (
        <CardRoot {...this.props}>
            {this.props.children}
            {hasContent && this.getContent()}
        </CardRoot>
    );
}

private getContent(): ReactNode {
    return <Content>
        {this.props.title && <Title {...this.props}>{this.props.title}</Title>}
        {this.props.subtitle && <Subtitle>{this.props.subtitle}</Subtitle>}

        <Description>{this.props.description}</Description>

        {this.props.icon && <Icon>{this.props.icon}</Icon>}
    </Content>;
}
```
