# React

## 0. Введение

### 0.1. Термины и определения

### 0.2. Использованные источники

## 1. Правила именования файлов

## 2. Форматирование

## 3. Использование технологии

### 3.1. Styled Components

#### 3.1.1. \[Не автоматизировано\] Использовать для обращения к компоненту класс в качестве селектора

Использовать для обращения к компоненту класс в качестве селектора вместо названия тега.

```typescript
    // Плохо
    const burger = navbar.find('input');

    // Хорошо
    const burger = navbar.find(BurgerWrapper);
```

#### 3.1.2. \[Не автоматизировано\] Выносить определение атрибутов тэга в отдельную константу

Выносить определение атрибутов тэга в отделюную константу для более лучшего форматирования

`````typescript jsx // Плохо export const ButtonRoot = styled.button.attrs<Props>({ type: (props: Props) => props.isSubmit && 'submit' })<Props>``` padding: 0.44rem 1.72rem; \`;

```text
// Хорошо
const attrs = {
    type: (props: Props) => props.isSubmit && 'submit'
};

export const ButtonRoot = styled.button.attrs<Props>(attrs)<Props>`
    padding: 0.44rem 1.72rem;
`;
```

```text
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

#### 3.2.2. \[Не автоматизировано\] Правила именования для обработчиков

Использовать следующий формат для описания обработчика в комментарии: `Handler for <действие> on [что-то] [дополнительное описание]`

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

Если у нас есть условие для отрисовки блока и блок занимает больше одной строки, то его необходимо вынести в отдельную функцию.

\`\`\`typescript jsx // Плохо

 {this.props.children} { hasContent && {this.props.title &&{this.props.title}} {this.props.subtitle &&{this.props.subtitle}}{this.props.description} {this.props.icon &&{this.props.icon}} }

```text
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

```text
#### 3.3.2. \[Не автоматизировано\] Для jsx использовать общие правила оформления шаблонов

Если правило явно не переопределяется специальным правилом для оформления шаблонов (jsx)
в react-приложении, то использовать [общие правила оформления шаблонов](../templates.md).

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

b. Не делать дополнительных переносов внутри фигурных скобок для фрагмента, где выводятся вложенные компоненты.

\`\`\`typescript jsx // Плохо  { this.props.items.map\(item =&gt; \( \)\) }

```text
// Хорошо
<CardListRoot>
    {this.props.items.map(item => (
        <CardContainer key={item.title}>
            <Card {...item} onEdit={this.props.onCardEdit} onAction={this.props.onAction}/>
        </CardContainer>
    ))}
</CardListRoot>
```

```text
### 3.4. Redux

### 3.4.1. \[Автоматизировано: prefer-separate-component-file\] Помещать redux `connect`, `mapStateToProps` и `mapDispatchToProps` в отдельный файл

Необходимо размещать компонент-контейнер и связанные с ним функции 
(`mapStateToProps` и `mapDispatchToProps`) в отдельном файле. Этим мы достигаем
разделения представления и логики, подготавливающей для него данные.

Мы также можем проверять представление и логику отдельно.

```typescript
    // Плохо

    // result-check.ts
    const mapStateToProps = (state, ownProps) => {
        //... 
    };

    const mapDispatchToProps = dispatch => ({
        // ...
    });

    class ResultCheckRaw extends PureComponent {
        // ...
    }

    export const ResultCheck = connect(mapStateToProps, mapDispatchToProps)(ResultCheckRaw);

    // Хорошо

    // result-check.presentation.ts
    export class ResultCheckRaw extends PureComponent {
        // ...
    }

    // result-check.container.ts
    import {ResultCheckRaw} from '../presentation';

    const mapStateToProps = (state, ownProps) => {
        //... 
    };

    const mapDispatchToProps = dispatch => ({
        // ...
    });

    export const ResultCheck = connect(mapStateToProps, mapDispatchToProps)(ResultCheckRaw);
```

## 4. Правила именования

### 4.1. \[Не автоматизировано\] Правила именования презентационных компонентов и компонентов контейнеров

Основная идея в том, чтобы публичные компоненты, которые используются в проекте, имели семантически значимые имена. В данном случае мы имеем в виду, что мы хотим подчеркнуть именно смысл, нежели технические детали, стоящие за реализацией компонента. Как следствие, мы не хотим менять код-потребитель \(например, код компонента, который представляет собой конечный экран\), если мы изменили технические детали реализации. К техническим деталям относится и привязка компонента к redux или отсутствие таковой.

#### 4.1.1. \[Не автоматизировано\] У компонента должно быть обычное имя, если мы используем его в коде-потребителе

a. Если компонент не связан с redux, мы должны называть его так, как мы обычно и поступаем в случае именования компонентов, т.е. без дополнительных префиксов и суффиксов:

```typescript
    // Хорошо
    export class ImageSlider extends PureComponent {
        // ...
    }
```

b. Если компонент использует redux и это компонент, который мы получаем в результате вызова `connect` redux'а, используется другими компонентами как семантически значимый, мы должны называть его так, как мы обычно и поступаем в случае именования компонентов, т.е. без дополнительных префиксов и суффиксов:

```typescript
    // Good
    export const ResultCheck = connect(mapStateToProps, mapDispatchToProps)(ResultCheckRaw);
```

#### 4.1.2. \[Не автоматизировано\] Добавлять суффикс для оборачиваемого в `connect` компонента

Если мы используем компонент-контейнер в качестве компонента для кода-потребителя, мы должны называть презентационный компонент, т.е. компонент, который оборачивается в `connect`, с суффиксом `Raw`.

```typescript
    class ResultCheckRaw extends PureComponent {
        // ...
    }

    export const ResultCheck = connect(mapStateToProps, mapDispatchToProps)(ResultCheckRaw);
```

#### 4.2. \[Не автоматизировано\] Не использовать множественное число в названии компонентов

Имя компонента должно всегда быть в единственном числе, не должно быть множественного.

```typescript
    // Плохо
    class Panels extends PureComponent { 
        // ... 
    }

    // Хорошо
    class PanelList extends PureComponent { 
        // ... 
    }
```

