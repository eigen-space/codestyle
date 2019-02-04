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