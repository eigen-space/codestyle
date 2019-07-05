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

#### 3.1.2. \[Не автоматизировано\] Выносить определение атрибутов тэга в отдельную константу

Выносить определение атрибутов тэга в отделюную константу для более лучшего форматирования

```typescript jsx
// Плохо
export const ButtonRoot = styled.button.attrs<Props>({
    type: (props: Props) => props.isSubmit && 'submit'
})<Props>`
    padding: 0.44rem 1.72rem;
    `;

// Хорошо
const attrs = {
    type: (props: Props) => props.isSubmit && 'submit'
};

export const ButtonRoot = styled.button.attrs<Props>(attrs)<Props>`
    padding: 0.44rem 1.72rem;
    `;
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

#### 3.2.3. \[Не автоматизировано\] Порядок в определении свойств 

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

#### 3.3.2. \[Не автоматизировано\] Для jsx использовать общие правила оформления шаблонов

Если правило явно не переопределяется специальным правилом для оформления шаблонов (jsx)
в react-приложении, то использовать [общие правила оформления шаблонов](../templates/README.md).

#### 3.3.3. \[Не автоматизировано\] Списки

a. Не выносить список в отдельную функцию или компонент, если компонент условно небольшой.
В качестве ориентира для "небольшой" использовать те же критерии, что для декомпозиции
любого фрагмента кода.

```typescript jsx
// Плохо
class Component {
    render() {
        return (
            <CardListRoot>{this.getCards()}</CardListRoot>
        )
    }
    
    private getCards(): ReactNode[] {
        return this.props.items.map(item => (
            <CardContainer key={item.title}>
               <Card {...item} onEdit={this.props.onCardEdit} onAction={this.props.onAction}/>
            </CardContainer>
        ));
    }
}

// Хорошо
class Component {
    render() {
        return (
            <CardListRoot>
                {this.props.items.map(item => (
                    <CardContainer key={item.title}>
                        <Card {...item} onEdit={this.props.onCardEdit} onAction={this.props.onAction}/>
                    </CardContainer>
                ))}
            </CardListRoot>
        )
    }
}
```

b. Не делать дополнительных переносов внутри фигурных скобок для фрагмента, где выводятся
вложенные компоненты.

```typescript jsx
// Плохо
<CardListRoot>
    {
        this.props.items.map(item => (
            <CardContainer key={item.title}>
                <Card {...item} onEdit={this.props.onCardEdit} onAction={this.props.onAction}/>
            </CardContainer>
        ))
    }
</CardListRoot>

// Хорошо
<CardListRoot>
    {this.props.items.map(item => (
        <CardContainer key={item.title}>
            <Card {...item} onEdit={this.props.onCardEdit} onAction={this.props.onAction}/>
        </CardContainer>
    ))}
</CardListRoot>
```
