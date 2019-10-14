# Angular

## 0. Введение

### 0.1. Термины и определения

### 0.2. Использованные источники

0. [AngularJs Naming](http://bguiz.github.io/js-standards/angularjs/naming/)

## 1. Правила именования файлов

### 1.1. Типы файлов

Допустимо использовать следующие типы (в терминологии, используемой в п.1.1), 
определяющие категорию, к которой относится класс:

1. service - сервис;
2. module - модуль;
3. controller - контроллер;
4. component - компонент;
5. filter/pipe - фильтр;
6. directive - директива;
7. routes - маршрутизация (url'ы приложения)
8. config - конфигурация.

```
    // Плохо
    tag-service.js
    tag-controller.js
    tag-component.js
    format-date-filter.js
    dashboard-directive.js
    app-routes.js
    app-module.js
    app-config.js

    // Хорошо
    tag.service.js
    tag.controller.js
    tag.component.js
    format-date.filter.js
    dashboard.directive.js
    app.routes.js
    app.module.js
    app.config.js
```

## 2. Форматирование

### 2.1. Классы

#### 2.1.1. Порядок полей

В дополнение к общему правилу, определяющему порядок полей в файлах на языке 
[typescript](dev/guidelines/guidelines_web_typescript), необходимо придерживаться 
следующего порядка размещения полей:

1. `@Input`
2. `@Output`
3. `@ViewChild` / `@ViewChildren`
4. `@ContenChild` / `@ContenChildren`
5. Остальные поля в группе полей (например, другие публичные поля)

Группы должны быть разделены между собой одни вертикальным отступом, т.е. пустой строкой.

```typescript
    class SomeComponent {
        @Input() prop1;
        @Input() prop2;
        
        @Output() emitter1;
        @Output() emitter2;
        
        @ViewChild('content') content;
        @ViewChildren('button') buttons;
        
        @ContentChild(PopupComponent) popup;
        @ContentChildren(AttributeBaseComponent) attributes;

        // ... other public fields
                
        // ... other private fields
    }
```

#### 2.1.2. Порядок размещения методов жизненного цикла angular-компонентов

Методы жизненного цикла angular-компонентов должны предшествовать других методам 
в рамках их группы. Например, реализуя интерфейс `OnInit`, мы должны реализовать
публичный метод `ngOnInit()`. Соответственно в группе публичных методов он должен
предшествовать другим методам. Методы же жизненного цикла должны быть расположены
сверху вниз в порядке прохождения [жизненного цикла](https://angular.io/guide/lifecycle-hooks), 
начиная от инициализации и заканчивая разрушением компонента:

```typescript
    class SomeComponent {
    
        // ...
        
        ngOnChanges() {}
        
        ngOnInit() {}
        
        ngDoCheck() {}
        
        ngAfterContentInit() {}
        
        ngAfterContentChecked() {}
        
        ngAfterViewInit() {}
        
        ngAfterViewChecked() {}
        
        ngOnDestroy() {}
        
        // ... other public methods
    }
```

#### 2.1.3. Порядок аннотаций @Input

Аннотация `@Input` проставляется на getter, если он есть, в ином случае на setter, если он есть.
Если же свойство объявлено через публичное поле, то `@Input` проставляется на это поле.

```typescript
    class SomeClass {
        
        // Плохо
        get someProp() {}
        
        @Input()
        set someProp(value) {}
        
        // Хорошо
        @Input()
        get someProp() {}
        
        set someProp(value) {}
    }
```

#### 2.1.4. Поля с аннтотациями

Поля с аннотациями, например `@Input`, всегда записываем в одну строку, не оставляя аннотацию на отдельной строке.
Это относится и к аннотациям типа `@ContentChildren`, и к аннотациями `@Input('someSelector')` с параметрами внутри. 
Если аннотация превышает установленный лимит на длину строки (см. 
[Общие стандарты web-разработки, 3.1. Длина строк](dev/guidelines/guidelines_web_common?id=_31-Длина-строк)), 
то она должна разбиваться на две строки: аннотация и поле, которому она принадлежит.

```typescript
    class SomeClass {
        // Плохо

        @Input()
        someProp1;
        
        @Input('someProp2Alias')
        someProp2;
        
        @ContentChildren(ResourceListRowComponent) 
        items = new QueryList<ResourceListRowComponent>();
        
        @ContentChildren(forwardRef(() => CheckboxComponent), { descendants: true }) checkboxes: QueryList<CheckboxComponent>;
        
        // Хорошо

        @Input() someProp1; 
        @Input('someProp2Alias') someProp2Alias;
        
        @ContentChildren(ResourceListRowComponent) items = new QueryList<ResourceListRowComponent>();
        
        @ContentChildren(forwardRef(() => CheckboxComponent), { descendants: true }) 
        checkboxes: QueryList<CheckboxComponent>;
    }
```

#### 2.1.5. Аксессоры (get/set) и методы с аннотациями

Аннотации для аксессоров (get/set) и методов записываются всегда на отдельной строке.

```typescript
    class SomeClass {
        // Плохо

        @HostListener('document:keydown.escape') onEscPressed() {
            this.close();
        }
        
        @Input() get title(): string {
            return this._title;
        }
        
        // Хорошо
        
        @HostListener('document:keydown.escape') 
        onEscPressed() {
            this.close();
        }
        
        @Input() 
        get title(): string {
            return this._title;
        }
    }    
```

#### 2.1.6. Поля с аннтотациями @ViewChild, @ViewChildren, @ContentChild, @ContentChildren

Поля с аннотациями `@ViewChild, @ViewChildren, @ContentChild, @ContentChildren` всегда объявляем публичными.
Пришли к такому варианту, т.к. в этом случае без особо ущерба получаем:
 
* больше возможностей и удобств при написании спецификаций на компоненты;
* лучшую читаемость этих полей с точки зрения чтения кода;
* более однородно с точки зрения работы с angular, т.к. все поля и методы, что мы хотим использовать в шаблоне
должны быть публичными. Таким образом, выглядит более последовательным иметь публичными поля, которые забирают данные
с шаблона компонента. 

В этом случае решили пренебречь инкапсуляцией этих полей.

```typescript
    class SomeClass {
        // Плохо
        @ContentChildren(ResourceListRowComponent)
        private items = new QueryList<ResourceListRowComponent>();

        // Хорошо
        @ContentChildren(ResourceListRowComponent) items = new QueryList<ResourceListRowComponent>();
    }
```

#### 2.1.7. Порядок полей в аннтотациях директив и компонентов

Придерживаться следующего порядка полей в аннотациях директив и компонентов:

```
@Component / @Directive ({
    selector,
    templateUrl,
    styleUrls / styles,
    providers,
    encapsulation,
    changeDetection
})
```

### 2.2. Шаблоны

#### 2.2.1. Порядок атрибутов

##### 2.2.1.1. Порядок групп (типов) атрибутов

Размещать группы (типы) атрибутов в следующем порядке:
   1. Директивы (`*ngFor`)
   2. Ссылки (`#tab`)
   3. Атрибуты без значений (`content-tab`)
   4. Двунаправленные атрибуты (`[(value)]='value'`)
   5. Атрибуты-входы (`[id]='groupId'`)
   5. Входящие атрибуты
   5. Исходящие атрибуты

```
   vrt-component-example(
        *ngFor='let tab of tabs',
        #tab,
        content-tab,
        [(value)]='value',
        [id]='groupId',
        [title]='groupTitle'
        [hasBorder]='true',
        placeholder='IDS_SOME_PLACEHOLDER',
        (click)='onSelectTab(tab)'
   )
```

##### 2.2.1.2. Порядок атрибутов внутри групп 

Придерживаться порядка атрибутов внутри каждой группы по правилу: от более важного к менее неважному.
При этом внутри группы придерживаться порядка атрибутов: 
[Шаблоны (Html, Pug), 2.2. Порядок атрибутов](dev/guidelines/guidelines_web_templates?id=_22-Порядок-атрибутов)

```
   vrt-component-example(
        [id]='groupId',
        [title]='groupTitle'
        [hasBorder]='true'
   )
```

#### 2.2.2. Отступы

##### 2.2.2.1. Внутри интерполяции ({{...}})

Не должно быть отступов внутри фигурных скобок интерполяции в шаблонах:

```
    // Плохо
    {{ item.title }}
    
    // Хорошо
    {{item.title}}
```

Плохо/хорошо в данном правилее довольно условное, просто выбран один вариант, которого следует придерживаться.
Мог быть выбран любой из них.

## 3. Правила именования

### 3.1. Общие

### 3.2. Поля с аннотациями

#### 3.2.1. Поля с аннтотациями @ViewChild, @ViewChildren и переменные шаблона

Если для получения DOM-элемента с шаблона используется `@ViewChild`/`@ViewChildren`, а также переменная шаблона
`#<templatVariable>`, то следует избегать совпадения названия переменной класса-компонента и переменной шаблона,
что может приводить к проблемам со значением этих переменных при использовании в шаблоне. 

Для этого следует:

1. Переменную в шаблоне называть с суффиксом `El`, т.е. `<elementName>El`, например `popupEl`:

```angular2html
    +b.popup(#popupEl)
```

2. В компоненте переменную называть без суффиксов и префиксов по имени элемента `<elementName>`:

```typescript
    @ViewChild('popupEl') popup: ElementRef;
```
  
### 3.3. Выходы компонентов (Output, Emitter)

Инициатор события именуется в формате: `<...существительные><глагол настоящего времени>`.
 
Обработчик события же называется в виде `on<...существительные><глагол в прошедшем времени>`, 
если название обработчика является парой для события: `(click) -> onClicked(), (select) -> onItemSelected()`, 
или в виде семантически значимого действия `<глагол [+ существвительное, описывающие действие]>`
(в квадратных скобках указана необязательная часть): `close(), finalizeTrip(), ...`.

```
vrt-popup((categorySelect)='onCategorySelected($event)')
vrt-dropdown-menu-item-attribute((actionPerform)='finalizeTrip(entity, $event)')
```
  
## 4. Директивы

### 4.1. `[ngClass]`, `[class.*]`

1. Предпочтительно использовать `[class.*]`, где это возможно. По сути это относится ко 
всем классам, названия которых не вычисляются. Например,

```
    // Плохо
    vrt-main-panel([title]='"План"', [ngClass]='{ "main-panel--size_sm": minimized, "main-panel--size_lg": !minimized }')

    // Хорошо
    vrt-main-panel([title]='"План"', [class.main-panel--size_sm]='minimized', [class.main-panel--size_lg]='!minimized')
```

2. `[ngClass]` использовать только в тех случаях, когда присваиваемый класс вычисляется. Например, вычисляется его
имя или набор классов.

```
    +b.BUTTON.btn(#btn,
                  [ngClass]="[" +
                    "'btn--state_' + state, " +
                    "'btn--size_' + size, " +
                    "'btn--type_' + type, " +
                    "'btn--order_' + order, " +
                    "'btn--mode_' + mode" +
                  "]")
```
   
## 5. TODO

1. Стиль для написания с использованием angular: компоненты, сервисы. 
   Какие файлы создаются?
   Как называются?
2. Названия файлов (для контроллеров, сервисов, сущностей, перечислений)
3. Angular функция или чистый javascript 
4. Использование `@ng-inject`
5. В шаблонах должно быть минимум логики.
6. В шаблонах не переносить атрибуты на новую строку, если они помещаются в лимит по строке
7. Ловить зависимости в конструкторе через переменные в правильном регистре.
8. Присваивать зависимости в приватные поля класса.
9. Добавить про именование классов
