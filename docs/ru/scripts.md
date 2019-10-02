# Scripts (TypeScript / JavaScript)

## 0. Введение

### 0.1. Термины и определения

|Термин|Определение|
|--|--|
|Блок|Любая часть кода, ограниченная двумя фигурными скобками `{}`, за исключением определения объекта.|
|Блокоподобные конструкции|Конструкции, которые по способу записи похожи на запись блоков в управляющих конструкциях или функциях/методах. Например, объекты или массивы, записанные с переносом строки.|

### 0.2. Использованные источники

При подготовке документа были использованы следующие материалы:

a. [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

b. Макконнелл С. - Совершенный код. Мастер-класс, «Русская редакция», 2010. — 896 стр. : ил.

c. Ревью в Gitlab в рамках проекта [workspace-web](https://lab.veeroute.com/development/workspace-web).

d. [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/blob/master/README.md)

e. [Принципы написания консистентного, идиоматического кода на JavaScript](https://github.com/rwaldron/idiomatic.js/tree/master/translations/ru_RU)

f. [C++ Guideline](https://lab.veeroute.com/development/docs-internal/blob/master/docs/internal/dev/guidelines/guidelines_cpp.md)

g. Intellij IDEA. File | Settings | Editor | Code Style | TypeScript

h. Мартин Роберт К. - Чистый код. Создание, анализ и рефакторинг: Издательство «Питер», 2010.

## 1. Файлы с исходным кодом

### 1.1. \[Не автоматизировано\] Правила именования

a. Допустимые группы в имени файла:
    1. Название (основная часть имени файла), которое описывает суть содержимого файла. 
       Должно совпадать с названием класса, который содержится в файле, приведенным 
       в соответствие с правилами именования файлов. В некоторых случаях часть 
       имени класса должна рассматривать как содержимое группы Тип.
    2. Тип, который определяет категорию, к которой относится класс. Допустимые типы:
        1. enum - перечисление/псевдо-перечисление (map с константами);
        2. constants - константы.

```
    // Плохо
    tag-type-enum.ts

    // Хорошо
    tag-type.enum.ts
```

b. Файлы с тестами дополняются ещё одним суффиксом `spec`.

```
    tag.service.spec.ts
```

### 1.2. \[Не автоматизировано\] Файлы с перечислениями

Использовать один файл перечисления под группу перечислений, объединенных общей идеей.
Например, использовать один файл перечислений под перечисления, связанные с компонентом.
При этом файл перечисления называть: `<grouping>.enums.ts`

```
    // Плохо
    /button
        /enums
            button-mode.enum.ts
            button-type.enum.ts
            buttom-state.enum.ts
            
    // Хорошо
    /button
        button.enums // Содержит все перечисления: mode, type, state
```

### 1.3. \[Не автоматизировано\] JSDoc в начале файла

Каждый файл после секции `import`'ов, если таковая имеется, должен содержать JSDoc 
с информацией:

a. Для чего предназначен файл/класс.

b. Автор

c. Дата создания

## 2. Форматирование

### 2.1. Скобки

#### 2.1.1. \[Автоматизировано: curly\] Скобки для управляющих конструкций

Скобки необходимо писать для всех управляющих конструкций (таких как `if`, 
`else`, `for`, `do`, `while`, а также других), даже если тело конструкции 
содержит всего один оператор. 

```typescript
    // Плохо
    if (condition)
        action();
    // Плохо
    for (let i = 0; i < arr.length; i++) action(arr[i]);

    // Хорошо
    if (condition) {
        action();
    }
    // Хорошо
    for (let i = 0; i < arr.length; i++) {
        action(arr[i]);
    }
```

#### 2.1.2. \[Автоматизировано: brace-style\] Непустые блоки

Скобки для непустых блоков должны проставляться следующим образом:

*  Открывающая фигурная скобка должна быть на той же строке, что и управляющая конструкция.
*  Перед открывающей скобкой должен быть пробел.
*  Закрывающая фигурная скобка должна быть на отдельной строке после тела управляющей 
  конструкции. 
*  Для составных управляющих конструкций следующая часть конструкции располагается 
  на той же строке, что и закрывающая скобка.

```typescript
    // Плохо
    if (condition)
    {
        // ...
    }
    else if (condition)
    {
        // ...
    }
    else
    {
        // ...
    }
    
    // Плохо
    if (condition){
        // ...
    }
    else {
        // ...
    }
    
    // Хорошо
    if (condition) {
        // ...
    } else if (condition) {
        // ...
    } else {
        // ...
    }
```

### 2.2. Отступы

#### 2.2.1. \[Автоматизировано: indent\] Величина отступа

Величина отступа должна составлять **4 пробела**. Не допускается использовать табуляцию.

#### 2.2.2. \[Автоматизировано: indent\] Блоки и блокоподобные конструкции

Для каждого нового блока или тела блока, содержимого объектов или массивов, 
которые записаны в несколько строк подобно блокам, должен применяться дополнительный 
отступ. По завершению блока отступ должен возвращаться на предыдущий уровень. 

Отступ должен применяться как для кода, так и для комментариев к коду.

```typescript
    // Плохо
    if (condition) {
    action();
    }
    
    // Плохо
    const obj = {
      prop1: 'value' // Отступ менее 4 пробелов
    }

    // Хорошо
    if (condition) {
        action();
    }

    // Хорошо
    const obj = {
        prop1: 'value'
    }
```

#### 2.2.3. \[Автоматизировано: newline-per-chained-call\] Цепочки вызовов

Все вызовы цепочки вызовов, кроме первого, должны располагаться на новой строке. 
При этом эти вызовы должны иметь отступ аналогичный отступу для блоков.

```typescript
    // Плохо
    obj.firstMethod().secondMethod().thirdMethod();

    // Хорошо
    obj.firstMethod()
        .secondMethod()
        .thirdMethod();
```

#### 2.2.4. \[Автоматизировано: indent, IDEA code format\] Конструкция switch-case

Секции `case` (`default`) должны иметь такой же отступ, что и блоки. Тело секции `case` 
(`default`) должно иметь дополнительный отступ равный стандартному для блоков.

```typescript
    // Плохо
    switch (state) {
    // Нет отступа для case
    case StateType.NORMAL:
        action1();
        break;
      // Уменьшенные отступы для case и тела case
      case StateType.WARNING:
        action2();
        break;
      default:
        action3();    
    }
    
    // Хорошо
    switch (state) {
        case StateType.NORMAL:
            action1();
            break;
        case StateType.WARNING:
            action2();
            break;
        default:
            action3();
    }
``` 

### 2.3. Выражения

#### 2.3.1. \[Автоматизировано: max-statements-per-line, IDEA code format\] В одной строке должно быть не более одного выражения

 1. Каждое выражение должно располагаться на своей строке. Не должно быть несколько 
    выражений на одной и той же строке. Выражением называется совокупность переменных, 
    констант, знаков операций, имен функций, скобок, которая может быть вычислена 
    в соответствии с синтаксисом языка программирования. Результатом вычисления 
    выражения является величина определенного типа. Признаком завершения выражения 
    является `;`.

```typescript
    // Плохо
    resultX = orderPoint.x + shiftPoint.x; resultY = orderPoint.y + shiftPoint.y;
    calculate(min(a, b), max(a, b)); buildDataForGraph();
    
    // Хорошо
    resultX = orderPoint.x + shiftPoint.x; 
    resultY = orderPoint.y + shiftPoint.y;
    calculate(min(a, b), max(a, b)); 
    buildDataForGraph();
```

 2. Это же правило относится и к объявлению переменных.

```typescript
    // Плохо
    let name, width, height;
    
    // Хорошо
    let name;
    let width;
    let height;
```

#### 2.3.2. \[Автоматизировано: @typescript-eslint/semi\] Выражение обязательно завершается точкой с запятой (";")

Каждое выражение должно завершаться знаком точка с запятой ";". Не следует полагаться 
на автоматическую простановку этого знака или умолчания для некоторых случаев типа 
последней строки.

### 2.4. Перенос выражений

Под переносом выражений следует понимать правила переноса выражения на несколько строк.

Правила могут покрывать не все случаи, однако ключевым моментом, который преследует 
перенос выражений - это повышение читаемости кода.

Ограничение на длину даёт преимущества, например, при ревью кода или при параллельной 
работе с двумя файлами. Два файла в 120 символов как раз хорошо умещаются на мониторе с 
разрешением 1920 px без горизонтальной прокрутки, а вот строки длиннее приводят к её появлению. 
При работе с одним файлом длинные строки также могут доставлять неудобства, если помимо файла 
открыты дополнительные панели в IDE.

#### 2.4.1. \[Не автоматизировано\] В каком месте разрывать выражение

При переносе выражения в скобках открывающая скобка должна остаться на строке 
с именем функции, объекта, массива, закрывающая скобка - на отдельной строке. 
Если объект, массив, параметры функции начинают переноситься, то переносятся все. 
Перенос функций, переданных в качестве параметра, рассматривается в отдельном правиле.

```typescript
    // Исходная строка
    let obj = { name: 'IDS_DASHBOARD_CONTROL_SCRIPT_OPTIMIZE_TRANSPORTS', planning_settings: Object.assign({}, DEFAULT_PLANNING_SETTINGS, { planning_settings: { planning_settings: { control_script: CONTROL_SCRIPTS_NAMES.OPTIMIZE_TRANSPORTS } } }) };

    // Плохо
    let obj = {
        name: 'IDS_DASHBOARD_CONTROL_SCRIPT_OPTIMIZE_TRANSPORTS',
        planning_settings: Object.assign({}, DEFAULT_PLANNING_SETTINGS, { planning_settings: {
            planning_settings: { control_script: CONTROL_SCRIPTS_NAMES.OPTIMIZE_TRANSPORTS } } })
    };

    // Хорошо
    let obj = {
        name: 'IDS_DASHBOARD_CONTROL_SCRIPT_OPTIMIZE_TRANSPORTS',
        planning_settings: Object.assign(
            {}, 
            DEFAULT_PLANNING_SETTINGS, 
            { 
                planning_settings: {
                    planning_settings: { 
                        control_script: CONTROL_SCRIPTS_NAMES.OPTIMIZE_TRANSPORTS 
                    } 
                } 
            }
        )
    }; 

    // Плохо
    calculateDraft(orders, shifts, 
        trips);

    // Хорошо
    calculateDraft(
        orders,
        shifts,
        trips
    );
```

#### 2.4.2. \[Автоматизировано: indent, IDEA code format\] Отступ при переносе части выражения

Части выражения, которые перенесены на новые строки, т.е. каждая следующая строка 
после исходной (первой), должны иметь дополнительный отступ относительно неё. 
При этом должно учитываться правило переноса блоков, что может добавлять 
дополнительные отступы.

```typescript
   // Плохо
   let result = builder.append('first')
   .append('second')
   .append('third');
   
   // Плохо
   let result = builder.append('first')
     .append('second')
     .append('third');

   // Хорошо
   let result = builder.append('first')
       .append('second')
       .append('third');
```

#### 2.4.3. \[Не автоматизировано\] Параметры функции

a. Предпочтительно размещать параметры функции на той же строке, что и имя функции. 

```typescript
    function someFunction(param1, param2, param3) {
        // ...
    }
```

b. Если при способе записи п.1 будет превышен лимит на длину строки, то необходимо 
   перенести все параметры по одному на каждую строку, сделав для них один горизонтальный
   отступ.

```typescript
    function someFunction(
        param1,
        param2,
        // ...,
        paramK,
        ...
        paramN
    ) {
        // ...
    }
```

#### 2.4.4. \[Не автоматизировано\] Тернарный оператор

a. Допустимо использовать тернарный оператор только в выражениях, в ином случае использовать
`if`. 

```typescript
    // Плохо
    entity.transportType === TransportType.PLANE ? this.onActionPerformed(action) : this.finalizeTrip(action);
    

    // Хорошо
    if (entity.transportType === TransportType.PLANE) {
        this.onActionPerformed(action);
        return;
    }
    
    this.finalizeTrip(action);
    
    // Хорошо
    return entity.transportType === TransportType.PLANE ? this.onActionPerformed(action) : this.finalizeTrip(action);
```

b. Недопустимо переносить тернарный оператор на несколько строк. Если возникает такая 
необходимость, то нужно переписать тернарный оператор на оператор `if` с учётом 
правил **4.9.5**.

```typescript
    // Плохо
    count = action.hasIndex
        ? action.index : action.type.icon;
    // Плохо    
    action.timeTo.prepared.time = action.timeTo.raw
        ? formatTime(action.time_to.raw, 'time') : null;
    

    // Хорошо
    count = action.hasIndex ? action.index : action.type.icon;
    // Хорошо
    action.timeTo.prepared.time = null;
    if (action.timeTo.raw) {
        action.timeTo.prepared.time = formatTime(action.time_to.raw, 'time');
    }
```

#### 2.4.5. \[Не автоматизировано\] Перенос длинных математических выражений

Если имеем дело с длинным математическим выражением, то необходимо разбить его 
на несколько, выделив логические части. Математические выражения не должны 
переноситься на несколько строк.

```typescript
    // Плохо
    const entropy = forceFactor 
        * jobFactor + diffFactor / (directionMultiplier * chaosPortion);

    // Хорошо
    const aggregatedFactor = forceFactor * jobFactor;
    const diffusion = diffFactor / (directionMultiplier * chaosPortion); 
    const entropy = aggregatedFactor + diffusion;
```

#### 2.4.6. \[Не автоматизировано, но есть в IDEA code format\] Перенос массивов

a. Не нужно переносить строку с массивом, если она не превышает лимит. 
   Исключение составляет массив, в котором элементы представлены объектными литералами, 
   количество которых превышает единицу.

```typescript
    // Плохо
    scenarios = [
        'a',
        'b',
        'c'
    ];
    arrWithObjects = [{ id: 1, field: '' }, { id: 2, field: '' }];
    
    // Плохо
    arrWithObject = [
        { id: 1, field: '' }
    ];
    
    // Хорошо
    scenarios = ['a', 'b', 'c'];
    arrWithObjects = [
        { id: 1, field: '' },
        { id: 2, field: '' }
    ];
    
    // Хорошо
    arrWithObject = [{ id: 1, field: '' }];
```

b. При необходимости переноса массива объектов каждый объект начинается и заканчивается 
   на своей строке, т.е. не имеет соседства с массивом или другим объектом.

```typescript
    // Плохо
    const objectInArray = [{
        id: 1,
        field: ''
    }, {
        id: 2,
        field: ''
    }];
    const objectInArray = [
        { id: 1, field: ''}, { id: 2, field: '' }
    ];

    // Хорошо
    const objectInArray = [
        { id: 1, field: '' },
        { id: 2, field: '' }
    ];
```

#### 2.4.7.\[Не автоматизировано\] Перенос полей объектных литералов

Поля объектного литерала переносятся, если:
 
1. Их количество более 3.
2. Поля в качестве значения имеют выражение, функцию (если её длина больше 20 символов и она всего 1 в строке), 
   объект (если он не пустой), массив (с больше, чем 1 объектов).
3. Длина содержимого объекта (все поля + их значения) превышает 70 символов.
4. Длина неперенесённого объекта превышает установленный лимит строки.

```typescript
    // Плохо
    actualScenarioRun = {
        startTime: 0
    };

    // Хорошо
    actualScenarioRun = { startTime: 0 };
    
    // Плохо
    store = { fruits: ['apple', 'orange'], price: 3000 };
    
    // Хорошо
    store = { prices: [2000] };
    
    // Плохо
    store = { fruits: { some: 'value' }, another: 3000 };
    
    // Хорошо
    store = { prices: {} };

    // Плохо
    store = { fruits: resolve(), vegetables: jest.fn(), another: 3000 };
    
    // Плохо
    store = { fruits: some.big.function.for.resolve(), another: 3000 };
    
    // Хорошо
    store = { prices: jest.fn(), another: 3000 };

    // Плохо
    actualScenarioRun = { startTime: 0, endTime: 1, param1: 1,  param1: 2 };

    // Хорошо
    actualScenarioRun = { 
        startTime: 0,
        endTime: 1, 
        param1: 1,
        param1: 2
    };
    
    // Плохо
    return { entityId: data.entityId, fieldsToUpdate: { [data.relatedProperty]: value } };
    
    // Хорошо (предпочтительный вариант)    
    const fieldsToUpdate = { [data.relatedProperty]: value };
    return { entityId: data.entityId, fieldsToUpdate };
    
    // Хорошо (допустимый вариант)
    return { 
        entityId: data.entityId, 
        fieldsToUpdate: { [data.relatedProperty]: value } 
    };
```

#### 2.4.8. \[Не автоматизировано\] Перенос функций, переданных в качестве параметров

a. Если стрелочная функция является единственным параметром функции, но 
   целиком не помещается в строку, то стрелочную функцию нужно записать с 
   использованием блочной конструкции. 
   При этом закрывающая фигурная скобка `}` будет на той же строке, что и 
   закрывающая круглая скобка `)` функции, в которую передаются параметры.

```typescript
    // Плохо
    orders.forEach(order => {
        order.getMapEntities()
            .forEach(
                eventWindow => map.add(new GeoJsonEventFeature(eventWindow))
            );
    });

    // Хорошо, если помещается в строку
    orders.forEach(order => {
        order.getMapEntities()
            .forEach(eventWindow => map.add(new GeoJsonEventFeature(eventWindow)));
    });

    // Хорошо, если не помещается в строку
    orders.forEach(order => {
        order.getMapEntities()
            .forEach(eventWindow => {
                map.add(new GeoJsonEventFeature(eventWindow))
            });
    });
```

b. Если параметры функции переносятся, то должны переноситься все параметры, включая 
   стрелочную функцию. При этом закрывающая круглая скобка `)` функции, в которую 
   передаются параметры, должна быть на отдельной строке.

```typescript
    // Плохо
    calculateDraft(orders, shifts, 
        trips, () => {
            // какой-то обработчик
        });

    // Хорошо
    calculateDraft(
        orders,
        shifts,
        trips,
        () => {
            // какой-то обработчик
        }
    );

    // Плохо
    calculateDraft(orders, shifts, trips, () => {
        // какой-то обработчик
    }, actions);

    // Хорошо
    calculateDraft(
        orders,
        shifts,
        trips,
        () => {
            // какой-то обработчик
        },
        actions
    );
```

c. Если после стрелочной функции есть ещё какие-то параметры, то необходимо переносить 
   все параметры.

```typescript
    // Плохо
    calculateDraft(orders, shifts, trips, () => /*...,*/ actions);

    // Хорошо
    calculateDraft(
        orders,
        shifts,
        trips,
        () => /*...,*/
        actions
    );
```

#### 2.4.9. \[Не автоматизировано\] Перенос цепочек методов

a. \[Автоматизировано: newline-per-chained-call\] Выражение должно переноситься по точке.

```typescript
   // Плохо
   let result = builder.append('first').
       append('second').
       append('third');

   // Хорошо
   let result = builder.append('first')
       .append('second')
       .append('third');
```

b. \[Не автоматизировано\] Если в цепочке вызовов есть метод, параметры которого переносятся на несколько строк, то следует эту цепочку
разбивать на несколько переменных.

```typescript
    // Плохо
    this.routeSubscription = this.router.events.pipe(
        filter(/*...*/),
        map(/*...*/)
    )
        .subscribe(/*...*/);
    
    // Хорошо
    const routerEvents$ = this.router.events.pipe(
        filter(/*...*/),
        map(/*...*/)
    );
    
    this.routeSubscription = routerEvents$.subscribe(/*...*/);
```

#### 2.4.10. \[Автоматизировано: comma-style\] Перенос запятой при переносе выражений

Если выражение переносится по запятой, то запятую на новую строку переносить не нужно.  

```typescript
    // Плохо
    let arr = [
        'one'
        , 'second'
        , 'thrid'
    ];

    // Хорошо
    let arr = [
       'one',
       'second',
       'thrid'
    ];
```

#### 2.4.12. Что если нет правила под ситуацию, с которой столкнулись?

В этом случае избежать длинной строки и соответственно переноса строк следует путём выделения 
части выражения в переменную.

Если ситуация кажется довольно общей, то следует предложить правило, которым можно дополнить
настоящее руководство по стилю кода.

### 2.5. Пробельные места

#### 2.5.1. \[Не автоматизировано\] Пробельные места в вертикальном направлении

Не должно быть множественных пустых строк подряд. Допускается использование только 
одной для логического разделения частей кода.

Одиночная пустая строка **должна быть** использована в следующих случаях:

a. \[Не автоматизировано\] Перед конструктором и любым методом класса.

```typescript
    class SomeClass {
            
        constructor(data) {
            // ...
        }
        
        method1() {
            // ...
        }
        
        method2() {
            // ...
        }
    }
```

b. Внутри тела метода для логической группировки выражений.

```typescript
    // Хорошо
    function drawPicture() {
        subjectPoints = generatePointsForSubject();
        draw(subjectPoints);

        manPoints = generatePointsForMan();
        draw(manPoints);
    }
```

c. \[Не автоматизировано\] После закрывающей фигурной скобки `}`, если за ней не следует строка, 
   на которой только закрывающая фигурная скобка `}`, или эта строка не является
   последней.

```typescript
    // Плохо
    if (condition()) {
    }
    if (condition()) {
    }

    // Плохо
    class SomeClass {
        
        method() {
            // ...
            if (condition()) {
                // ...
            }
            
        }
        
    }

    // Хорошо
    if (condition()) {
    }
    
    if (condition()) {
    }

    // Хорошо
    class SomeClass {
        
        method() {
            // ...
            if (condition()) {
                // ...
            }            
        }        
    }
```

Пустой строки **не должно быть** в следующих случаях:

a. \[Не автоматизировано\] Перед строкой с закрывающей скобкой, завершающей функцию, метод, конструктор, 
   объект, массив, управляющую конструкцию (`if-else`, `for`, `while` и т.д.). 

b. \[Не автоматизировано\] В начале функции (метода). Исключение составляет только добавление пустой строки 
   для вложенной функции, которые встречаются при написании тестов.

c. \[Не автоматизировано\] Между последовательно идущими объявлениями полей класса.

d. Для выделения строк с логированием, которые связаны с предыдущим выполненным действием. 
   Строки с логирование должны быть выделены пустыми строками, если составляют специальную
   логическую группу, например логируют начало выполнения метода и интересующие входных 
   параметры.

```typescript
    // Плохо
    function printResults() {
        // ...
        // Отделено логирование, которое непосредственно 
        // связано с предыдущей строкой кода
        sum = calculate(param1, param2);

        logger.log('sum: ', sum);
    }

    function prepareReportData(rawData) {
        // Логирование не отделено, т.к. следующий 
        // за логированием код не связан с ним
        logger.log('printResults, start');
        logger.log('printResults, raw data:', rawData);
        sum = calculate(param1, param2);
        // ...
    }

    // Хорошо
    function printResults() {
        // ...
        sum = calculate(param1, param2);
        logger.log('sum: ', sum);
    }

    function prepareReportData(rawData) {
        logger.log('printResults, start');
        logger.log('printResults, raw data:', rawData);
        
        sum = calculate(param1, param2);
        // ...
    }
```

#### 2.5.2. \[Автоматизировано\] Пробельные места в горизонтальном направлении

Горизонтальные пробельные места подразделяются на следующие виды:

* в начале строки;
* в середине строки;
* в конце строки.

Пробельные места в начале строки определяются правилами для отступов.

Пробельных мест в конце строки быть не должно. Строка не должна иметь пробелов в конце.

Внутри строки допускается использование только одиночных пробелов. Исключение составляют 
только строковые литералы. 

Одиночный пробел должен использоваться в следующих случаях:

a. [Автоматизировано: keyword-spacing\] Отделение ключевого слова (типа `if`, `for`, `catch`) от открывающей скобки ( `(`, `{`),
   которая после него на этой же строке.

b. [Автоматизировано: keyword-spacing\] Отделение ключевого слова (типа `else`, `catch`) от закрывающей скобки (`}`), 
   которая предшествует ему на этой же строке.

c. [Автоматизировано: space-before-blocks\] Перед открывающей фигурной скобкой (`{`), за исключением
    1. Первого аргумента при вызове функции и первого элемента в массиве: 
       `func({ a: [{ c: d }] })`.
    2. В шаблонных строках: `Some param: ${param}`.

d. [Автоматизировано: space-infix-ops\] По обеим сторонам любого оператора с двумя аргументами `a + b` 
   и тернарного оператора `condition ? statement1 : statement2`

e. [Автоматизировано: comma-spacing\] После запятой `,`, если она не является последним символов строки.

f. [Автоматизировано: key-spacing\] После двоеточия `:` и внутри фигурных скобок в объектных литералах: `{ a: 10 }`.

g. [Автоматизировано: spaced-comment\] После знака одиночного комментария: `// Комментарий`

Пробел не допускается использовать:

a. До запятой `,` или точки с запятой `;`.

b. Внутри литерала массива после `[` и перед `]`: `[1, 20, 4]`.

#### 2.5.3. \[Автоматизировано: key-spacing\] Горизонтальное выравнивание

Горизонтальное выравнивание - это добавление дополнительного количества пробелов, 
чтобы элементы соседних строк были выравнены в логические колонки.

Горизонтальное выравнивание не должно использоваться, т.к. его поддержка требует 
дополнительных усилий.

Например,

```typescript
   // Плохо
   object = {
       short:        10,
       longProperty: 175
   }
 
   // Хорошо
   object = {
       short: 10,
       longProperty: 175
   }
```

### 2.6. \[Автоматизировано: no-extra-parens\] Использование скобок для группировки

Имеет смысл добавлять скобки для группировки частей выражения в том случае, если 
порядок выполнения операторов неочевиден и для правильного прочтения выражения 
нужно обратиться к таблице приоритета операторов.

**Не нужно** использовать скобки:

a. Для выделения условия в тернарном операторе: `condition ? statement1 : statement2`.

b. Вокруг всего выражения при использовании `delete`, `typeof`, `instanceof`, `void`, 
`return`, `throw`, `case`, `in`, `of`, `yield`.

```typescript
    // Плохо
    result = (checkSomeCondition(params) || (checkAnotherCondition(anotherParams)));

    // Хорошо
    result = checkSomeCondition(params) || checkAnotherCondition(anotherParams)
```

### 2.7. Комментарии

Раздел не включает правила для комментариев JSDoc.

#### 2.7.1. \[Не автоматизировано\] Блочные комментарии

Не нужно использовать блочные комментарии для написания комментариев к коду. 
Используются только для JSDoc.

```typescript
   // Плохо
   /*
    * Multiline comment that
    * describes tricky moments of this code
    */
   width = Math.round(data.width);

   // Хорошо
   // Multiline comment that
   // describes tricky moments of this code
   width = Math.round(data.width);
```

#### 2.7.2. \[Не автоматизировано\] Отступы

a. \[Не автоматизировано\] Комментарий должен иметь тот же отступ, что и код, к которому он относится.

```typescript
    // Плохо

// Get maximum price among orders
    for (let order of orders) {
    // Additional comment
        const a = 1;
    }

    // Хорошо
    
    // Get maximum price among orders
    for (let order of orders) {
        // Additional comment
        const a = 1;
    }
```

b. \[Автоматизировано: spaced-comment\] Текст комментария должен быть отделен от знака комментария одиночным пробелом.

```typescript
    //Плохо

    // Хорошо
```

#### 2.7.3. \[Автоматизировано: line-comment-position\] Не использовать комментарии в конце строки

Комментарий должен быть на отдельной строке над тем участком кода, что он поясняет. 
Не допускается использовать комментарий на той же строке, что и строка кода.

#### 2.7.4. \[Автоматизировано: capitalized-comments\] Используемый регистр

Регистр должен соответствовать используемого регистру при написании текстовых документов, 
т.е. любое предложение должно начинаться с заглавной буквы, далее используются строчные.

#### 2.7.5. \[Не автоматизировано\] Используемый язык

При написании комментариев необходимо использовать английский язык.

#### 2.7.6 \[Не автоматизировано\] Сокращения

Недопустимо использовать сленговые сокращения в комментариях, например `bcz, btw`, а
использовать полные формы `because, by the way`.

### 2.8. Классы

#### 2.8.1. \[Автоматизировано: @typescript-eslint/member-ordering\] Порядок полей, методов

Поля и методы должны располагаться в следующем порядке:

a. Статические поля (static fields)

b. Поля экземпляра (instance fields)

c. Конструкторы (constructor)

d. Аксессоры (getter/setter)

e. Статические методы (static methods)

f. Методы экземпляра (instance methods)

Внутри каждой из групп порядок определяется уровнем доступа метода/свойства:

a. Публичные (public)

b. Защищенные (protected)

c. Приватные (private)

Группы полей отделять друг от друга пустой строкой.

```typescript
    class SomeClass {
        static field;
        protected static field;
        private static field;
        
        field;
        protected field;
        private field;
        
        constructor(){
        }
        
        get() {}
        set() {}
        protected get() {}
        protected set() {}
        private get() {}
        private set() {}
        
        static method() {}
        protected static method() {}
        private static method() {}
        
        method() {}
        protected method() {}
        private method() {}
    }
```

#### 2.8.2. \[Не автоматизировано\] Порядок методов одного типа и уровня доступа

a. Код должен читаться сверху вниз. Вызываемый метод должен находиться под вызывающим.  

```typescript
    class SomeClass {
        
        private run(): void {
            // ...
            this.buy();
            // ...
        }
        
        private buy(): void {
            // ...
            const clientInfo = this.getClientInfo();
            // ...
        }
        
        private getClientInfo(): ClientInfo {
            // ...
            return clientInfo;
        }
    }
```

b. Если несколько методов расположены друг за другом, то сначала идёт цепочка 
от первого метода, затем от второго и т.д.

```typescript
    class SomeClass {
        
        private run(): void {
            // ...
            this.buy();
            this.runPostActions();
            // ...
        }
        
        private buy(): void {
            // ...
            const clientInfo = this.getClientInfo();
            // ...
        }
        
        private getClientInfo(): ClientInfo {
            // ...
            return clientInfo;
        }
        
        private runPostActions(): void {
            // ...
            this.removeOrders();
            this.sendNotification();
            // ...
        }
        
        private removeOrders(): void {
            // ...
        }
        
        private sendNotification(): void {
            // ...
        }
    }
```

#### 2.8.3. \[Не автоматизировано\] Группировка аксессоров (get/set)

Объявления getter/setter'ов должны идти друг за другом, если имеется и getter, и setter 
для одного поля/назначения. При этом getter должен предшествовать setter'у.

```typescript
    class User {
        // ...

        get id() {
            // ...
        }        

        get name() {
            // ...
        }

        set name(value) {
            // ...
        }

        get surname() {
            // ...
        }

        set surname(value) {
            // ...
        }
    }
```

### 2.9. Спецификации

#### 2.9.1. \[Не автоматизировано\] Вертикальные отступы

Спецификация по смыслу разбивается на 3 секции:

* `given` - (необязательная) предусловия, подготовка для выполнения проверяемого сценария;
* `when` - вызов проверяемого метода;
* `then` (`expect`) - проверка результата выполнения метода.

Необходимо секции отделять друг от друга одним вертикальным отступом. Внутри каждой из 
секций дополнительные вертикальные отступы запрещены.

Исключение составляет спецификация, в которой не более 3 строк. В этом случае считается, 
что каждая из строк представляет собой отдельную секцию. При этом эти секции не разделяются 
вертикальным отступом.

Допустимо совмещать секции `when` и `then`, если для проверки метода достаточно одной проверки
`expect`.

```typescript
    // Плохо

    // Лишний отступ
    it('should get access to login page if user is not logged in', async () => {
        mockValidate(false);

        expect(await service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)).toBeTruthy();
    });
    
    // Лишний отступ
    it('should redirect to first accessible page if user is logged in', async () => {
        const config = {
            data: { hidden: true },
            reports: {}
        } as Config;
        
        mockConfig(config);

        await service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);

        expect(mockRouter.navigate).toBeCalledWith(['reports']);
    });

    // Хорошо
    
    it('should get access to login page if user is not logged in', async () => {
        mockValidate(false);
        expect(await service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)).toBeTruthy();
    });
    
    it('should redirect to first accessible page if user is logged in', async () => {
        const config = {
            data: { hidden: true },
            reports: {}
        } as Config;
        mockConfig(config);

        await service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);

        expect(mockRouter.navigate).toBeCalledWith(['reports']);
    });
```

## 3. Использование возможностей языка

JavaScript включает в себя множество сомнительных и даже опасных возможностей. 
Этот раздел определяет, какие возможности следует, а какие не следует использовать, 
а также дополнительные правила по их использованию.

### 3.1. Переменные

#### 3.1.1. \[Автоматизировано: no-var\] Использовать `const` и `let`

a. Для объявления переменных не должно использоваться ключевое слово `var`.

b. Константы объявлять ключевым словом `const`.

c. По умолчанию для переменных также использовать ключевое слово `const`, которое 
   указывает что переменная далее не меняется. Использовать `let` только в тех случаях, 
   когда переменная должна изменять своё значение.

d. Если переменной присваивается объект или массив и при этом свойства объекта или 
   элементы массива изменяются, но сама переменная более не переприсваивается, то 
   следует использовать для объявления `const`. Нужно понимать, что при этом сама 
   переменная не меняется, т.к. в ней ссылка на объект, а значения свойств объекта 
   меняются по этой ссылке.

#### 3.1.2. \[Не автоматизировано, но есть в IDEA code format\] Объявлять по одной переменной за один раз

Должно быть не более одного объявления переменной на одной строке, не нужно объявлять 
несколько переменных через запятую.

```typescript
   // Плохо
   let width, height;

   // Хорошо
   let width;
   let height;
```

#### 3.1.3. \[Не автоматизировано\] Объявлять ближе к месту использования

Локальные переменные не должны объявляться в самом начале блока, которым они ограничены 
(например, в начале метода). Они должны объявляться максимально близко к месту их первого 
использования. Это упрощает чтение кода и сужает область использования переменной, 
зачастую включая и область видимости.

```typescript
    // Плохо
    function method() {
        let counter;
        
        // ... код, который не использует переменную counter
        
        counter = getCurrentCount(); 
    }

    // Хорошо
    function method() {
        // ... код, который не использует переменную counter
        
        let counter = getCurrentCount(); 
    }    
```

#### 3.1.4. \[Не автоматизировано\] Не следует объявлять лишние переменные

Не нужно объявлять переменные в следующих случаях:

a. Если имя переменной и свойство используемого объекта один в один определяют имя 
   переменной. В этом случае нужно просто использовать свойство объекта.

```typescript
    // Плохо
    const currentDraftId = currentDraft.id;
    console.log(currentDraftId);
    
    // Хорошо
    console.log(currentDraft.id);
```

b. Строковый литерал используется только в одном месте и сам по себе является говорящим:

```typescript
    // Плохо
    const partStateSolution = 'solution';
    const partStateReports = 'reports';
    const partStateMonitoring = 'monitoring';

    if (state.includes(partStateSolution)) {
        range = getSolutionRange();
    } else if (state.includes(partStateReports)) {
        range = getReportRange();
    } else if (state.includes(partStateMonitoring)) {
        range = getMonitoringRange();
    }

    // Хорошо
    if (state.includes('solution')) {
        range = getSolutionRange();
    } else if (state.includes('reports')) {
        range = getReportRange();
    } else if (state.includes('monitoring')) {
        range = getMonitoringRange();
    }
```

#### 3.1.5. \[Не автоматизировано\] Одна обязанность у переменной

Если значение переменной перезаписывается, она не должна изменять свой смысл, 
т.е. одна переменная должна иметь одну обязанность.

```typescript
    // Плохо
    let width = calculateWidth();
    doActionWithWidth(width);

    width = calculateHeight();
    doActionWithHeigh(width);

    // Хорошо
    const width = calculateWidth();
    doActionWithWidth(width);

    const height = calculateHeight();
    doActionWithHeigh(height);    
```

#### 3.1.6. \[Не автоматизировано\] Объявление переменной с присваиванием ей значения по умолчанию

a. Если нам необходимо объявить переменную, например массива какого-то типа или объекта какого-то интерфейса, 
то в этом случае тип переменной прописывается как в случае с обычным объявлением переменной сразу после неё, 
а не через утверждение типа, использую `as`:

```typescript
    // Плохо
    const allowedEntityTypes = [] as string[];
    const someObject = {} as SomeInterface;
    
    // Хорошо
    const allowedEntityTypes: string[] = [];
    const someObject: SomeInterface = {};
```

b. Если задаём значение переменной, которое однозначно определяет тип переменной, то явно тип указывать не нужно:

```typescript
    // Плохо
    const stringVariable: string = 'some string value';
    const numericVariable: number = 17;
    const map: Map<EntityId, Entity> = new Map<EntityId, Entity>();
    const map: Map<EntityId, Entity> = new Map();
    
    // Хорошо
    const stringVariable = 'some string value';
    const numericVariable = 17;
    const map = new Map<EntityId, Entity>();
```

### 3.2.  Массивы

#### 3.2.1. \[Автоматизировано: comma-dangle\] Использование запятой для последнего элемента

За последним элементом не должно быть запятой.

```typescript
   // Плохо
   const values = [
      'first',
      'second',
   ];

   // Хорошо
   const values = [
      'first',
      'second'
   ];
```

#### 3.2.2. \[Не автоматизировано. Не работает правило no-array-constructor\] Избегать использования конструктора `Array`

Вместо конструктора `Array` следует использовать литерал `[]`, если нужно создать 
массив с конкретными элементами. Это вызвано тем, что, во-первых, короче запись, 
во-вторых, меньше риск ошибиться, т.к. при передаче одного числового аргумента 
в `Array` он создаст массив с указанным количеством элементов, которые будут иметь 
значение `undefined`.  

```typescript
   // Плохо

   const arr1 = new Array(x1, x2, x3);
   // Если x1 типа number, то будет создан массив с количеством элементов x1
   const arr2 = new Array(x1);
   const arr3 = new Array();

   // Хорошо

   const arr1 = [x1, x2, x3];
   const arr2 = [x1];
   const arr3 = [];
```

#### 3.2.3. \[Не автоматизировано\] Оператор "spread"

a. Использовать spread-оператор вместо конструкций с `Array.prototype`. 
   Например, это актуально при работе с коллекцией аргументов функции `arguments`, 
   которая не является массивом и ей недоступны методы массива.

```typescript
    // Плохо
    Array.prototype.splice.call(arguments, 0, 0, basePrefix + prefix);

    // Хорошо
    modifiedArgs = [basePrefix + prefix, ...arguments];
```

b. При копировании массива предпочтение отдавать spread-оператору `[...arr]`, 
   нежели методу `arr.slice()`.
   
c. При объединении массивов предпочтение отдавать методу `arr.concat(arrAnother)`, 
   нежели spread-оператору `[...arr, ...arrAnother]`.
    
d. После spread-оператора не должно быть пробела.

**Примечание**. По производительности spead-оператор примерно в 2 раза уступает  
методам `Array`.

### 3.3. Объекты

#### 3.3.1. \[Автоматизировано: comma-dangle\] Использование запятой после последнего свойства

Не должно быть запятой `,` после последнего свойства, т.е. между свойством и закрывающей 
фигурной скобкой `}`.

```typescript
    // Плохо
    const obj = {
       prop1: 'val',
       prop2: 'val',
    }
    
    // Хорошо
    const obj = {
        prop1: 'val',
        prop2: 'val'
    }
```

#### 3.3.2. \[Не автоматизировано. Не работает правило no-new-object\] Использование конструктора `Object`

Не нужно использовать конструктор `Object` для создания объекта, следует использовать 
литерал `{}`.

```typescript
    // Плохо
    const obj = new Object({ 
        a: 1, 
        b: 2 
    });

    // Хорошо
    const obj = { 
        a: 1, 
        b: 2 
    };
```

#### 3.3.3. \[Не автоматизировано\] Кавычки для свойств объекта

Не нужно использовать кавычки при задании свойств объекта.

```typescript
    // Плохо
    const obj = { 
        'a': 1, 
        'b': 2 
    };

    // Хорошо
    const obj = { 
        a: 1, 
        b: 2 
    };
```

Называть свойства объекта следует так, чтобы не требовалось использовать кавычки 
для обращения к свойству объекта.

#### 3.3.4. \[Не автоматизировано\] Вычисляемые названия свойств объекта

Избегать создания вычисляемых полей у объекта: `{ ['key' + calculateKey()]: 'value' }`.

#### 3.3.5. \[Не автоматизировано\] Объявление методов

В объектных литералах не должны объявляться методы. Вместо этого должен быть написан 
класс, на основе которого уже могут быть созданы конкретные экземпляры с желаемыми 
методами.

```typescript
    // Плохо
    getObject() {
        return {
            prop: 'value',
            method() {
                return this.prop;
            }
        }
    }

    // Хорошо
    class SomeClass {
        
        constructor() {
            this.prop = 'value';
        }

        method() {
            return this.prop;
        }
    }

    // ...
    getObject() {
        return new SomeClass();
    }
```

#### 3.3.6. \[Не автоматизировано\] Короткая запись свойств

Если имя переменной совпадает с именем свойства, которое нужно задать в объекте, 
то следует использовать короткую запись:

```typescript
    // Плохо
    const a = 1;
    const b = 2;
    const obj = { a: a, b: b };

    // Хорошо
    const a = 1;
    const b = 2;
    const obj = { a, b };
```

#### 3.3.7. \[Не автоматизировано\] Использовать Map для динамически формируемых объектов

Вместо объектного литерала `{}` использовать `Map`, когда требуется динамически
сформированная структура `ключ-значение`. `Map` работает быстрее.

```typescript
    // Плохо
    const trackStorage = {};
    tracks.forEach(track => {
        const tracksByTrip = trackStorage[track.owner] || [];
        tracksByTrip.push(track);
        trackStorage[track.owner] = tracksByTrip;
    });
    
    // Хорошо
    const trackStorage = new Map();
    tracks.forEach(track => {
        const tracksByTrip = trackStorage.get(track.owner) || [];
        tracksByTrip.push(track);
        trackStorage.set(track.owner, tracksByTrip);
    });
```

### 3.5. Классы

#### 3.5.1. \[Частично автоматизировано\] Конструктор

a. \[Автоматизировано: no-useless-constructor\] Не нужно объявлять конструктор, если он не используется.

b. \[Автоматизировано: constructor-super\] Для подклассов обязательно вызывать `super()` в самом начале конструктора, 
   до выполнения каких-либо других операций.

c. \[Не автоматизировано\] Инициализация объекта должна производиться в конструкторе, а не в отдельном методе, 
   который выполняет всю процедуру инициализации и вызывается в конструкторе. 
   Инициализация может быть декомпозирована на методы, если она слишком большая. 
   При этом нужно прибегать к правилам декомпозиции методов и функций.

```typescript
    // Плохо
    class Clazz {
        constructor(data) {
            this.prop = {};
            this.createProp(data);
        }
    
        createProp(data) {
            // Операции по подготовке поля к нужному виду 
            ...
            this.prop = 'prop';
        }
    }

    // Хорошо

    class Clazz {
        constructor(data) {
            super(data);
            // Операции по подготовке поля к нужному виду 
            ...
            this.prop = 'prop';
        }
    }
```

d. \[Не автоматизировано\] В конструкторе не нужно использовать `return`.

e. \[Не автоматизировано\] В конструкторе всегда принимать объект, даже если на вход мы ожидаем только одно поле 
   (id или title). Оборачивать это одно поле в объект. При этом параметр называть `data`.

```typescript
    class SomeClass {
    
        constructor(data) {
            // Обработка data
            // ...
        }
    }
```

#### 3.5.2. \[Не автоматизировано\] Поля

a. У приватных полей не нужно добавлять префикс `_`. Исключение составляет только поле, 
имя которого совпадает с getter/setter'ом.

```typescript
    class SomeClass {
        // Плохо
        private _someFieldWithoutAccessor;
        // Хорошо
        private someFieldWithoutAccessor;
        
        // Плохо
        private mSomeFieldWithAccessor;
        private someFieldWithAccessorInner;
        private someFieldWithAccessorValue;
        // Хорошо
        private _someFieldWithAccessor;
        
        get someFieldWithAccessor() {}
        set someFieldWithAccessor(value) {}
    }
```

b. После создания объекта класса свойства не должны ни добавляться, ни удаляться 
из объекта. Это влияет на возможности оптимизации транслятора.

c. Поля должны иметь минимально возможную область видимости. Если поле может быть 
приватным, оно должно быть приватным. Только, если поле должно использоваться извне, 
тогда его стоит объявлять публичным.

#### 3.5.3. \[Не автоматизировано\] Вычисляемые свойства

Запрещено использование свойств класса, имена которых являются вычисляемыми.

#### 3.5.4. \[Не автоматизировано\] Методы

a. Запрещено добавлять методы при создании объекта. Все методы должны быть объявлены 
   на уровне класса, а не добавляться непосредственно объекту при создании.

```typescript
    // Плохо
    class User {
        
        constructor(data) {
            // ...
            this.calculateVotes = () => {
                // ...
            };
        }
    }

    // Хорошо
    class User {
        
        constructor(data) {
            // ...
        }

        calculateVotes() {
            // ...
        }
    }
```

b. Методы должны иметь минимально возможную область видимости. Если метод может быть 
   приватным, он должен быть приватным. Только, если метод должен использоваться извне, 
   тогда его стоит объявлять публичным.

#### 3.5.5. \[Не автоматизировано\] Статические методы

a. Статические методы вызывать непосредственно через имя класса, где он объявлен.

b. Не вызывать статические методы через экземпляр класса.

c. Не вызывать статические методы через производные классы.

```typescript
    class Base {
    
        static staticMethod() {
        }
    }

    class Sub extends Base {
    }

    // Плохо
    const obj = new Base();
    obj.staticMethod();
    Sub.staticMethod();

    // Хорошо
    Base.staticMethod();
```

#### 3.5.6. \[Не автоматизировано. Не работает no-extend-native\] Манипуляции с `prototype`

Не должно быть прямых манипуляций с свойством `prototype`. Необходимо использовать классы,
объявленные через ключевое слово `class`.

#### 3.5.7. \[Не автоматизировано\] Аксессоры (`getter`-ы и `setter`-ы)

a. Не нужно делать `get`-ры и `set`-ры для свойств, которые можно просто использовать 
   в качестве публичных:

```typescript
    // Плохо
    class SomeClass {
    
        constructor() {
            this._prop = 1;
        }

        get prop() {
            return this._prop;
        }

        set prop(value) {
            this._prop = value;
        }
    }
    // Обращение к свойству
    const someObject = new SomeClass();
    const propValue = someObject.prop;
    someObject.prop = 55;

    // Хорошо
    class SomeClass {
    
        constructor() {
            this.prop = 1;
        }
    }
    // Обращение к свойству
    const someObject = new SomeClass();
    const propValue = someObject.prop;
    someObject.prop = 55;
```

b. `get`-ры и `set`-ры следует использовать для тех полей, что предполагают какую-то 
   дополнительную логику поверх простого доступа к полю.

### 3.6. Функции

#### 3.6.1. \[Не автоматизировано\] Использование классов вместо функций

Не должно быть отдельных функций. 

#### 3.6.2. \[Не автоматизировано\] Вложенные функции

У функции (метода) не должно быть вложенных объявлений функций, исключая анонимные 
функции, используемые в качестве функций обратного вызова.

#### 3.6.3. \[Не автоматизировано\] Стрелочные функции

Стрелочные функции предлагают лаконичную запись и решают некоторые трудности 
с использованием `this` внутри них. При использовании стрелочных функций 
`() => { ... }` ключевое слово `this` внутри таких функций не изменяет своего значения, 
т.е. имеет то же значение, что и вне функции.

a. Везде, где это возможно, нужно использовать стрелочные функции вместо обычных функций.

```typescript
    // Плохо
    getNames() {
        return items.map(function(item) {
            return item.name;
        });
    }
    
    // Хорошо
    getNames() {
        return items.map(item => item.name);
    }
```

b. По возможности использовать наиболее короткую запись стрелочной функции без лишних 
переносов и фигурных скобок. В короткой записи стрелочной функции без фигурных скобок 
ключевое слово `return` подразумевается, т.е. функция возвращает результат выражения, 
которое в ней записано. Допустимо использовать более полную запись функций, если это 
позволяет не превышать лимит на длину строки.

```typescript
    // Плохо
    items.map(item => {
        return item.name;
    });

    // Хорошо
    items.map(item => item.name);
```

c. Не нужно оборачивать в скобки единственный аргумент функции.

```typescript
    // Плохо
    items.map((item) => item.name);

    // Хорошо
    items.map(item => item.name);
```

#### 3.6.4. \[Не автоматизировано\] Генераторы

Генераторы при должном их использовании позволяют писать синхронный код, если это нужно.

a. При объявлении генератора символ `*` должен быть написан сразу после ключевого 
   слова `function`, если таковое имеется. Название функции/метода должно быть 
   отделено от символа генератора `*` пробелом.
b. При использовании делегирующего вызова генератора символ `*` должен быть сразу 
   после `yield`.

```typescript
    // Хорошо
    
    const gen = function*() {
        yield* genAnother();
    }

    class SomeClass {
    
        * gen() {
            yield 'value';
        }
    }
```

#### 3.6.5. \[Не автоматизировано\] Параметры функции

a. Параметры по умолчанию должны именоваться по тем же правилам, что и обязательные 
   параметры, не должно быть специальных префиксов или суффиксов для таких параметров.

b. Все необязательные параметры должны иметь значения по умолчанию, даже если оно 
   `undefined`.

c. Знак `=` должен быть отделен от названия параметра по умолчанию и его значения 
   одиночными пробелами.

```typescript
    // Хорошо
    method(requiredParam, anotherParam = {}, yetAnotherParam = undefined) {
        // ...
    }
```

d. В качестве значений для параметров по умолчанию использовать только литералы. 

e. Отдавать предпочтение передаче объекта определенного типа, нежели большого 
   количества параметров.

f. Использовать оператор spread `...` вместо доступа к `arguments`. Параметр 
   с оператором `...` должен быть последним в списке параметров функции.

g. Не должно быть пробела между оператором `...` и именем параметра.

h. Не следует называть параметр с оператором `...` схожим образом: `varArgs`, 
   `arguments`.

#### 3.6.6. \[Не автоматизировано. не работает prefer-spread\] Spread-оператор

Использовать оператор `...` вместо `Function.prototype.apply`, когда требуется 
передать массив параметров.

```typescript
    function func(...items) {
    }
    
    func(...array, ...iterable, ...generator());
```

#### 3.6.7. \[Не автоматизировано\] Декомпозиция функции

Следует придерживаться следующих правил для выделения одной функции из другой, 
т.е. разбиения одной функции на несколько.

Необходимо выделить одну функцию из другой, если выполняется одно из условий:

a. Новая функция используется более чем в одном месте.

b. Исходная функция слишком большая и содержит группы из разных решаемых задач со 
   сложной логикой.

Не следует разбивать функцию на несколько, если выполняется хотя бы одно из условий:

a. Появление новой функции только увеличивает количество кода. При этом не содержит 
   какой-либо сложной логики и используется только в одном месте. Даже если функция 
   может заслужить некоторое название по той операции, что она выполняет, 
   она не заслуживает, чтобы быть отдельной.

b. Новая функция содержит фактически весь код исходной функции.

#### 3.6.8. \[Не автоматизировано\] Выход из функции

a. Как правило, не рекомендуется использовать множественное `return`. Необходимо 
   использовать не более двух. 

b. Допустимо использовать больше `return`, если уровень вложенности структуры, 
   внутри которой вызывается `return` не превышает двух, и они сгруппированы 
   внутри функции.

```typescript
    // Плохо
    method() {
        if (condition()) {
            // ...
            if (anotherCondition()) {
                // ...
                return someValue;
            } else {
                for (...) {
                    if (yetAnotherCondition()) {
                        // ...
                        return anotherValue;
                    }    
                }
            }
        }
    }

    // Хорошо
    method() {
        if (condition()) {
            // ...
            return someValue;
        } else if (anotherCondition()) {
            // ...
            return anotherValue;
        } else {
            // ...
        }
        
        return yetAnotherValue;
    }
```

c. Использовать выход из функции в самом её начале по условию, если это позволяет 
   исключить вложенность.

```typescript
    // Плохо
    getLastRun(draftId) {
        if (draftId) {
            const filter = new ScenarioFilter({ draftId });
            return getByFilter(filter)
                .then(runs => {
                    // ... обработка
                });
        } else {
            throw new AppError('some error');
        }
    }

    // Хорошо
    getLastRun(draftId) {
        if (!draftId) {
            throw new AppError('some error');
        }
        const filter = new ScenarioFilter({ draftId });
        return getByFilter(filter)
            .then(runs => {
                // ... обработка
            });
    }
```

d. Не использовать выход из функции, если при этом функция не становится проще, 
   а только увеличивается в размере.

```typescript
    // Плохо
    params.forEach(item => {
        if (!item.assigned) {
            return;
        }
        assignedIds.push(item.id);
    });

    // Хорошо
    params.forEach(item => {
        if (item.assigned) {
            assignedIds.push(item.id);
        }
    });
```

#### 3.6.9. \[Автоматизировано\] Возвращаемое значение

\[Автоматизировано: no-param-reassign\] a. Возвращать значение из функции с помощью `return`, а не через параметры функции.

```typescript
    // Плохо
    findAll(list, query, result) {
        // ...
        // Подразумевается, что результат формируется 
        // в параметре result и в нём же возвращается
        result.push(...);
        // ...
    }

    // Хорошо
    findAll(list, query) {
        const result = [];
        // ...
        // Результат формируется внутри метода и
        // возвращается через return
        return result;
    }
```

\[Автоматизировано: explicit-function-return-type\] b. Всегда указывать тип возвращаемого значения, даже когда возвращаемого значения нет (void).
Это правило не относится к setter'ам, для которых его указывать нельзя.

```typescript
    // Плохо
    
    finAll(list: string[]) {
        const result: string[] = [];
        // ...
        return result;
    }

    execute(actionType: string) {
        // ...
    }
    
    // Хорошо
    
    finAll(list: string[]): string[] {
        const result: string[] = [];
        // ...
        return result;
    }

    execute(actionType: string): void {
        // ...
    }
```

### 3.7. Строковые литералы

#### 3.7.1. \[Автоматизировано: quotes\] Тип используемых кавычек

a. Должны использоваться одиночные кавычки `'` вместо двойных `"`. Исключение составляют 
   строки, когда они являются шаблонными, т.е. подразумевают вывод переменных. 
   В этом случае используются кавычки шаблонных строк `` ` ``.

b. Если строка включает в себя одиночную кавычку, то следует использовать шаблонную 
   строку для её записи `` ` ``, а не двойную кавычку `"`.

#### 3.7.2. \[Не автоматизировано\] Шаблонные строки

Необходимо использовать шаблонные строки для формирования строки с переменными вместо 
использования конкатенации частей строки с переменными.

```typescript
    const result = param1 + param2;

    // Плохо
    const str = 'Operation "' + param1 + '" + "' + param2 + '" produces result: ' + result;

    // Хорошо
    const str = `Operation "${param1}" + "${param2}" produces result: ${result}`;
```

#### 3.7.3. \[Не автоматизировано. Не работает no-multi-str\] Многострочные литералы

Не следует использовать многострочные строковые литералы ни в случае простой строки, 
ни в случае шаблонной строки. Нужно иметь в виду, что в случае с шаблонной строкой 
в строку будут включены все отступы, что имеются между символами `` ` ` ``.

```typescript
    // Плохо

    const longStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
            Vivamus scelerisque nec lorem ut condimentum. Pellentesque habitant \
            morbi tristique senectus et netus et malesuada fames ac turpis egestas.';

    const longStr = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus scelerisque nec lorem ut condimentum. Pellentesque habitant
            morbi tristique senectus et netus et malesuada fames ac turpis egestas.`;

    // Хорошо

    const longStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            + 'Vivamus scelerisque nec lorem ut condimentum. Pellentesque habitant'
            + 'morbi tristique senectus et netus et malesuada fames ac turpis egestas.';

    const longStr = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
            + `Vivamus scelerisque nec lorem ut condimentum. Pellentesque habitant`
            + `morbi tristique senectus et netus et malesuada fames ac turpis egestas.`;
```

#### 3.7.4. \[Не автоматизировано\] URL, пути к файлам

Если строковый литерал представляет собой URL или путь к файлу (директории), 
то в конце строкового литерала не нужно писать слеш, если предполагается, 
что этот URL или файл является базовым для какого-то подмножества и к нему будет 
добавляться следующая часть пути.

```typescript
    // Плохо
    const basePath = '/opt/app/images/';
    const path = `${basePath}file.jpg`;
    
    // Хорошо
    const basePath = '/opt/app/images';
    const path = `${basePath}/file.jpg`;
```

### 3.8. \[Не автоматизировано\] Числовые литералы

Числа могут быть определены в десятичной, шестнадцатеричной, восьмеричной и 
двоичной системах счисления. При использовании системы счисления отличной 
от десятичной необходимо в префиксе явно задавать тип системы счисления `0x`, `0o`, `0b`,
недопустимо начинать число с `0` без указания системы счисления.

### 3.9. Управляющие конструкции

#### 3.9.1. \[Не автоматизировано\] Цикл `for`

a. Предпочтение отдавать наиболее подходящему перебирающему методу 
   (`forEach`, `map`, `filter`, ...), если возможно их использование.
   
b. Если требуется использование именно цикла `for`, то предпочтение отдавать 
   циклу `for ... of`.
   
c. Для перебора объектов использовать `Object.keys(obj).forEach(...)` вместо 
   цикла `for ... in` и проверки `Object.prototype.hasOwnProperty()` для исключения 
   свойств прототипа. Метод `Object.keys()` возвращает только собственные перечисляемые 
   свойства переданного объекта.

#### 3.9.2. \[Не автоматизировано\] Цикл `while`

Цикл `while` использовать в тех случаях, когда заранее нет возможности определить 
количество итераций. В иных случаях придерживаться правил для цикла `for`.

```typescript
    // Плохо
    let i = 0;
    while (i < arr.length) {
        // ...
        i++;
    }

    // Хорошо
    arr.forEach(item => {/*...*/});

    // Плохо
    // Счётчик не влияет на результат условия в needToWait()
    let counter = 0;
    for (; needToWait();counter++) {
        // ...
    }

    // Хорошо
    counter = 0;
    while (needToWait()) {
        // ...        
        counter++;
    }
```

#### 3.9.3. \[Не автоматизировано\] Исключения

Исключения важная часть языка, и они должны использоваться для обозначения исключительных 
ситуаций. Для этого в рамках приложения необходимо использоваться производный от `Error` 
класс, который содержит необходимую для приложения информацию по ошибке.

a. \[Автоматизировано: no-throw-literal\] Всегда выбрасывать исключение, являющееся экземпляром класса ошибки приложения. 
   Никогда не использовать другие типы.

b. \[Автоматизировано: no-empty\] Не должно быть пустых блоков обработки исключения, т.е. "проглатывания" исключений.

```typescript
    // Плохо
    try {
        return handleNumericResponse(response);
    } catch (e) {
    }
    return handleTextResponse(response);

    // Хорошо
    try {
        return handleNumericResponse(response);
    } catch (e) {
        // 1. Логируем исключительную ситуацию
        // 2. Выполняем дополнительные действия
        // 3. Преобразуем в исключение, специфичное для приложения
        doSomething();
    }
    return handleTextResponse(response);
```

c. \[Не автоматизировано\] Объявлять и использовать переменную, инициализация которой может не выполниться, 
   внутри секции `try`, а не вне неё.

```typescript
    // Плохо
    let value;
    try {
        value = JSON.parse(tag.value);
    } catch (e) {
        throw new Error(`Error when parsing value field ${tag.value}`);
    }
    if (value.trip_id) {
        // ...
    }

    // Хорошо
    try {
        const value = JSON.parse(tag.value);
        if (value.trip_id) {
            // ...
        }
    } catch (e) {
        throw new Error(`Error when parsing value field ${tag.value}`);
    }
```

#### 3.9.4. \[Не автоматизировано\] Оператор `switch-case`

a. \[Не автоматизировано\] Не следует использовать `switch` тогда, когда уместнее использовать `if-else if`. 
   Например, к такой ситуации можно отнести проверку логического условия:

```typescript
    // Плохо
    switch (true) {
        case (a === b):
            action1();
            break;
        case (a < b):
            action2();
            break;
        default:
            action3();
            break;
    }

    // Хорошо
    if (a === b) {
        action1();
    } else if (a < b) {
        action2();
    } else {
        action3();
    }
```

b. \[Автоматизировано: no-fallthrough\] Каждый блок `case` должен завершаться оператором `break`, чтобы не было сквозного 
   выполнения следующего блока `case`. Если требуется именно такое поведение, 
   то обязательно должен быть оставлен подробный комментарий, поясняющий необходимость 
   такого поведения. Комментарий не требуется к группе блоков `case`, для которых 
   должно быть выполнено одно и то же действие.

```typescript
    // Плохо
    switch (someValue) {
        case 'first':
            action1();
        case 'second':
            action2();
            break;
        default:
            defaultAction();
    }

    // Хорошо
    switch (someValue) {
        case 'first':
        case 'someKindOfFirst':
            action1();
            // In this case we should invoke two actions
            // due to ...
        case 'second':
            action2();
            break;
        default:
            defaultAction();
    }
```

c. \[Не автоматизировано\] Не должно быть оператора `break` в секции `default`.

```typescript
    // Плохо
    switch (someValue) {
        case 'first':
            // ...
            break;
        ...
        default:
            // ...
            break;
    }

    // Хорошо
    switch (someValue) {
        case 'first':
            // ...
            break;
        ...
        default:
            // ...
    }
```

d. \[Автоматизировано: default-case\] `switch` обязательно должен включать секцию `default`, даже если она при нормальной 
   логике работы не должна быть задействована. В этом случае мы должны логировать ошибку.

```typescript
    // Плохо
    switch (someValue) {
        case 'first':
            // ...
            break;
        case 'second':
            // ...
            break;
        case 'third':
            // ...
            break;
    }

    // Хорошо
    switch (someValue) {
        case 'first':
            // ...
            break;
        case 'second':
            // ...
            break;
        case 'third':
            // ...
            break;
        default:
            logger.log(`Unexpected value of texture: ${someValue}`);
    }
```

#### 3.9.5. \[Не автоматизировано\] Условия

a. \[Автоматизировано: eqeqeq\] Для сравнения двух операндов нужно использовать строгое равенство `===` (`!==`),  
   не `==` (`!=`), которое выполняет конвертацию типов.

```typescript
    const a = 1;
    const b = '1';

    // Плохо
    a == b // Вернёт true

    // Хорошо
    a === b // Вернёт false
```

b. \[Автоматизировано: eigenspace/conditions\] Условия должны располагаться в направлении числовой оси. Как одиночные неравенства, 
   так и двойные без исключений. Под направление числовой оси понимается, что для 
   положительного разрешения неравенства значение переменной должно находится правее 
   сравниваемого значения, если неравенство типа `1 < x`, или левее, если неравенство 
   типа `x < 10`: `x ∈ (1, 10) → 1 < x < 10 → 1 < x && x < 10`. Знак неравенства 
   всегда `<`, не используется знак `>`.

```typescript
    // Плохо

    x > 1
    x > 1 && x < 10
    arr.length > 5

    // Хорошо
    1 < x
    1 < x && x < 10
    5 < arr.length
```

c. \[Не автоматизировано. Есть реализация с неполным покрытием  
(сейчас рассчет на то, что enum пишется через большую букву) в eigenspace/conditions + yoda\]  
При использовании знака равенства при сравнении переменной и литерала (или константы) 
необходимо переменную писать слева от знака равенства.

```typescript
    // Плохо
    if (BusinessCommon.EssenceState.ES_EXEC !== trip.state) { }

    // Хорошо
    if (trip.state !== BusinessCommon.EssenceState.ES_EXEC) { }
```

d. \[Частично автоматизировано: eigenspace/conditions\] 
Не следует разбивать условия на отдельные без необходимости, когда можно записать их через `||` или `&&`.

\[Не автоматизировано\]  
```typescript
    // Плохо
    if (!tags) {
        trip.progressBar = progressBar;
        return;
    }

    const tripProgressData = tags[MODEL_NAME];

    if (!tripProgressData) {
        trip.progressBar = progressBar;
        return;
    }

    // Хорошо
    if (!tags || !tags[MODEL_NAME]) {
        trip.progressBar = progressBar;
        return;
    }
```

\[Не автоматизировано\]  
```typescript

    // Плохо
    if (!isUseCache) {
        // Достигается то, что currentDraftId становится не равен draft.id
        currentDraftId = null;
    }
    if (draft.id !== currentDraftId) {
        someAction();
    }

    // Хорошо
    if (!isUseCache || draft.id !== currentDraftId) {
        someAction();
    }
```

\[Автоматизировано: eigenspace/conditions\]  
```typescript
    // Плохо
    if (draft.disabled) {
        if (draft.hasOrders) {
            someAction();
        }
    }

    // Хорошо
    if (draft.disabled && draft.hasOrders) {
        someAction();
    }
```
 
e. \[Автоматизировано: no-extra-parens and eigenspace/conditions\]  
Не добавлять лишних группировок и скобок в условиях, если можно этого не делать.

```typescript
    // Плохо
    if (!(orderId && demandKey)) {
        if ((a < b) && (c < d)) {}
    }

    // Хорошо
    if (!orderId || !demandKey) {
        if (a < b && c < d) { }
    }
```

f. \[Не автоматизировано\] По возможности избегать лишней вложенности.

```typescript
    // Плохо
    if (draft.isCorrect) {
        if (draft.hasOrders) {
            someAction();
        }
    } else {
        throw new AppError('Can not use incorrect draft here!');
    }

    // Хорошо
    if (!draft.isCorrect) {
        throw new AppError('Can not use incorrect draft here!');
    }
    
    if (draft.hasOrders) {
        someAction();
    } 
```

g. \[Автоматизировано: eigenspace/conditions + no-else-return\] По возможности избегать лишних ветвей `else`. Это уместно, когда одно из значений 
является литералом, константой или представляет из себя простое выражение. 
Если оба значения предполагают вызов функции или сколько-нибудь сложное выражение, 
то предпочтение нужно отдавать полной записи условия.

```typescript
    // Плохо
    if (condition) {
        result = doSomeCalculation();
    } else {
        result = 'someValue';
    }

    // Хорошо
    result = 'someValue';
    if (condition) {
        result = doSomeCalculation();
    }
```

```typescript
    // Плохо
    if (condition) {
        return value;
    } else {
        return anotherValue;
    }

    // Хорошо
    if (condition) {
        return value;
    }

    return anotherValue;
```

h. \[Автоматизировано: eigenspace/conditions\] Не использовать тернарный оператор тогда, когда можно обойтись логическим оператором.

```typescript
    // Плохо
    action.attributes = action.attributes ? action.attributes : [];

    // Хорошо
    action.attributes = action.attributes || [];
```

i. \[Автоматизировано: no-nested-ternary\] Недопустимо использовать вложенные тернарные операторы. В данном случае необходимо 
переписать конструкцию на использование `if-elseif`, `switch-case` или выбор значения 
из перечисления (map'ы).

```typescript
    // Плохо
    action.type = action.isTypePrepared()
        ? action.type : Utils.isDrop(action.type)
            ? ActionType.DROP : Utils.isWork(action.type)
                ? ActionType.WORK : Utils.isPickup(action.type)
                    ? ActionType.PICKUP : null;

    // Хорошо
    action.type = action.isTypePrepared() ? action.type : ActionType[action.type];
    // Хорошо
    if (!action.isTypePrepared()) {
        action.type = ActionType[action.type];
    }
```

### 3.11. Преобразование примитивов

#### 3.11.1. \[Автоматизировано: no-implicit-coercion\] Использование функций-обёрток

Не использовать алгебраический оператор (например, `+`), сложение с пустой строкой 
или двойной знак логического отрицания `!` для приведения типов. Вместо этого 
использовать функции-обёртки для примитивов: `Number`, `String`, `Boolean`.

```typescript
    // Плохо
    const num = +'10';
    const str = '' + 10;
    const flag = !!'non-empty';

    // Хорошо
    const num = Number('10');
    const str = String(10);
    const flag = Boolean('non-empty');
```

#### 3.11.2. \[Не автоматизировано\] Преобразование к типу Boolean

Для преобразования к типу `Boolean` использовать одиночный знак отрицания `!` вместо 
приведения типа через функцию-обёртку:

```typescript
    // Плохо
    const isEmpty = !Boolean('');
    
    // Хорошо
    const isEmpty = !'';
```

#### 3.11.3. \[Не автоматизировано\] Использование функций-обёрток над примитивами вместо функций `parseInt`

Отдавать предпочтение использованию `Number` вместо функций `parseInt`, `parseFloat`.

```typescript
    // Плохо
    parseInt('10px'); // Возвращает 10
    parseInt('10'); // Возвращает 10 

    // Хорошо
    Number('10px'); // Возвращает NaN
    Number('10'); // Возвращает 10
```

#### 3.11.4. \[Автоматизировано: radix\] Указывать систему счисления при использовании `parseInt`

При необходимости использовать `parseInt` обязательно указывать вторым параметром систему 
счисления. Это требуется, чтобы не было неожиданных результатов преобразования.

```typescript
    // Плохо
    // Может вернуть 10 или 8, т.к. в некоторых реализациях происходит неявное 
    // преобразование в восьмеричную систему из-за 0 в начале строки.
    parseInt('010'); 

    // Хорошо
    // Возвращает 10
    parseInt('010', 10);
```

### 3.12. Запрещённые трюки

#### 3.12.1. \[Не автоматизировано. Не работает no-with\] Оператор `with`

Не должно быть использования оператора `with`. Он затрудняет понимание кода и запрещен 
в строгом режиме.

#### 3.12.2. \[Автоматизировано: no-eval\] \[Не автоматизировано. Не работает no-new-func\] Динамическое построение кода

Не должно быть использования функции `eval` или конструктора `Function(...string)`.

#### 3.12.4. \[Автоматизировано стандартом\] Нестандартизованные возможности

Не следует использовать возможности языка, которые не являются частью стандарта языка.

#### 3.12.5. \[Автоматизировано: no-new-wrappers\] Обёртки над примитивами

Никогда не нужно использовать `new` для обёрток над примитивами 
(`Boolean`, `Number`, `String`, `Symbol`). Обёртки следует вызывать как функции.

```typescript
    // Плохо
    const a = new Number('10');
    
    // Хорошо
    const a = Number('10');
```

### 3.13. \[Не автоматизировано: no-magic-numbers has problem\] Магические строки и числа

"Магическими" строками и числами называются литералы, которые появляются в коде 
и с одной стороны зачастую не говорят о своём назначении в контексте их использования, 
а с другой стороны дублируются и увеличивают шансы на случайную ошибку.

#### 3.13.1. \[Не aвтоматизировано: no-magic-numbers has problem\] Использовать константы вместо магических строк и чисел

Необходимо вместо магических чисел и строк использовать константы или перечисления, 
которые бы в полной мере описывали назначение литерала.

```typescript
    // Плохо
    if (count < 10) { }
    // Хорошо
    const LIMIT_OF_TRIP_COUNT = 10;
    // ...
    if (count < LIMIT_OF_TRIP_COUNT) { } 

    // Плохо
    status = 'updated';

    // Хорошо
    enum TaskStatusType {
        UNKNOWN = 'unknown',
        CREATED = 'created',
        UPDATED = 'updated'
    }
    // ...
    status = TaskStatusType.UPDATED;
```

#### 3.13.2. \[Не автоматизировано: no-magic-numbers has import\] Допустимые варианты использования литералов

Допустимо использовать без объявления константы `0`, когда он не несёт 
дополнительного скрытого смысла. Например, допустимо проверить на равенство 
нулю количество элементов в списке. Однако лучше в таких случаях сделать 
небольшой семантически значимый метод, который бы делал такую проверку.

### 3.14. Обещания (Promises)

#### 3.14.1. \[Не автоматизировано\] Использовать `async/await`

Где это возможно использовать `async/await` при вызове функций/методов, 
возвращающих `Promise`.

```typescript
    // Плохо
    function invokeRequest() {
        return someAsynchAction1()
            .then(value1 => {
                // ... обработка
                return someAsynchAction2(value1)
                    .then(value2 => {
                        // ... обработка          
                        return someAsynchAction3(value1, value2);
                    })
            })
    }

    invokeRequest().then(val => {
        // ... 
    });
    
    // Хорошо
    async function invokeRequest() {
        const value1 = await someAsynchAction1();
        const value2 = await someAsynchAction2();
        return someAsynchAction3(value1, value2); 
    }

    invokeRequest().then(val => {
        // ... 
    });
```

#### 3.14.2. \[Не автоматизировано\] Не допускать вложенности `Promise`

При использовании `Promise`'ов не допускать вложенности одного в другое. 
Вместо этого использовать возможности цепочки promise'ов.

```typescript
    // Плохо
    someAsyncAction(params).then(result => {
        // ... обработка результата
        return anotherAsyncAction().then(data => {
            return yetAnotherAsyncAction().then(() => {
                return 'result';
            })
        })
    });

    // Хорошо
    someAsyncAction(params)
        .then(result => {
            // ... обработка результата
            return anotherAsyncAction();
        })
        .then(data => yetAnotherAsyncAction())
        .then(() => 'result'); 
```

#### 3.14.3. \[Не автоматизировано\] Использовать наиболее лаконичную запись

Использовать более короткую запись, если это возможно.

```typescript
    // Плохо
    anotherAsyncAction().then(data => {
        return yetAnotherAsyncAction();
    });

    // Хорошо
    anotherAsyncAction().then(data => yetAnotherAsyncAction());
```

### 3.15. async/await

#### 3.15.1. \[Не автоматизировано\] Обработка ошибок

Обработка ошибок реализуется через обычный `try-catch`:

```typescript
    // Плохо
    function invokeRequest() {
        return getData()
            .then(json => {
                return JSON.parse(json);
            })
            .catch(() => {
                // ... обработка исключения
            });
    }

    // Хорошо
    async function invokeRequest() {
        try {
            const data = JSON.parse(getData());
        } catch (e) {
            // ... обработка исключения
        }
    } 
```

### 3.16. Экспорт/импорт

#### 3.16.1. \[Не автоматизировано: не работает eslint-plugin-import\] Экспорт классов

Файл с классом должен содержать только один класс и его экспортировать. Исключением является экспорт интерфейсов, 
дополняющих описание класса.

Не допускается использования экспорта по умолчанию, поскольку в этом случае возникают проблемы с переименованием
класса, а также проблемы во время оптимизации сборки при работе с angular.

```typescript
    // Плохо
    export default class ScenariosDataService {
        // ...
    }

    // Хорошо
    export class ScenariosDataService {
        // ...
    }
```

### 3.17. Комментарии

#### 3.17.1. \[Не автоматизировано\] Самоописываемый код

В идеале код должен быть написан так, что он является самоописываемым, 
т.е. и переменные, и методы, и классы говорят сами за себя, создавая полноценные 
абстракции, не требуя дополнительных комментариев, которые бы поясняли их назначение.

```typescript
    // Плохо
    
    // Stable sort in the range [first, second)
    sort(first, second): void {
        // ...
    }

    // Хорошо

    sortStableInRange(begin, end): void {
        // ...
    }
```

#### 3.17.2. \[Не автоматизировано\] Псевдокод и комментарии

В комментарии может быть преобразован псевдокод или шаги алгоритма, 
если ими был набросан ход реализации метода.

```typescript
    // Хорошо
    getClosestByTimeTrackPoint(ownerIds, closestToTime) {
        return this.trackService.getClosestByTimeTrackPoint(ownerIds, closestToTime)
            .then(closestTrackPoints => {
                // Filter only points with non-empty track point
                ...
                
                // Create map point for each closest in time track point
                ...
                
                    // Get real track point from complex structure of closest track point
                    ...
                    
                    // Prepare map point on base of map point
                    ...
                
                // Return map points
                ...
            });
    }
```

#### 3.17.3. \[Не автоматизировано\] Описание хитростей

В ситуациях, когда по какой-либо причине присутствуют какие-либо "хитрости" 
или сложности при реализации, но, опять же, по каким-то причинам нет 
возможности в настоящее время их преодолеть, необходимо подобные участки 
кода обильно снабдить комментариями, которые поясняют хитрости и причины, 
по которым не удалось сделать иначе. 

```typescript
    // Плохо
    export function NotificationController(NotificationService) {
        // ...
                                            
        // Непонятно, чем вызвана необходимость подписываться в контроллере,
        // а не в методе run модуля
        NotificationService.subscribe();
        
        // ...
    }

    // Хорошо
    export function NotificationController(NotificationService) {
        // ...
                                            
        // We should subscribe to notificaions in notification controller 
        // due to notifications relate to users.
        // Also we can not subscribe on event 'login' because controller 
        // initializes later than event is raised and it can not handle it
        NotificationService.subscribe();
        
        // ...
    }
```

### 3.18. Map

#### 3.18.1. \[Не автоматизировано\] Создание Map на основе массива

При создании `Map` на основе данных массива следует использовать возможность передавать
в конструктор `Map` итерируемый объект, содержащий элемент `[key, value]`.

```typescript
    // Плохо
    const shiftStorage = new Map();
    shifts.forEach(shift => shiftStorage.set(shift.id, shift));
    
    // Хорошо
    const shiftStorage = new Map(shifts.map(shift => [shift.id, shift]));
```

### 3.19. setTimeout

#### 3.19.1. \[Не автоматизировано\] Указание задержки срабатывания

Не нужно указывать нулевую задержку для `setTimeout`:
       
```typescript
    // Плохо
    setTimeout(() => {
        const node = this.renderer.selectRootElement(this.inputRef.formRef.nativeElement);
        node.focus();
        node.select();
    }, 0);
    
    // Хорошо
    
    setTimeout(() => {
        const node = this.renderer.selectRootElement(this.inputRef.formRef.nativeElement);
        node.focus();
        node.select();
    });    
    
    setTimeout(
        () => {
            const node = this.renderer.selectRootElement(this.inputRef.formRef.nativeElement);
            node.focus();
            node.select();
        }, 
        1000
    );
```

## 4. Правила именования

### 4.1. \[Не автоматизировано\] Общие правила для всех идентификаторов

a. Используются только буквы латинского алфавита `[a-zA-Z]`, цифры `[0-9]`. 

b. Знак `_` используется для объявления приватных полей и методов, 
   если нет возможности объявить поле/метод приватным за счёт языковых конструкций. 

c. В особых случаях, связанных со спецификой применяемого framework'а, 
   допускается использование других символов (например, `$` для angular).

d. Необходимо давать максимально говорящие, понятные имена. Делать выбор 
   в пользу более длинного названия, нежели в пользу менее понятного. 
   В то же время необходимо, чтобы названия по возможности состояли из наименьшего 
   количества слов (в идеале из одного), и их смысл был ясен, исходя из контекста. 
   Идеальное название - короткое, лаконичное и в то же время полностью раскрывающее 
   назначение.

```typescript
    // Плохо

    // Лишнее уточнение для имени параметра, т.к. и так понятно, что файл для скачивания
    function downloadFile(filenameToDownload) {
        // ...
    }
    
    // И короткое, и непонятно название параметра, т.к. ничего не сообщает о самом параметре
    function createAssignment(arg) {
        // ...
    }

    class DraftScheduleController {
    
        // Лишнее уточнение имени метода
        updateDraftSchedules() {
            // ...
        }
    }

    // Хорошо
    
    function downloadFile(filename) {
        // ...
    }
    
    function create(assigment) {
        // ...
    }

    class DraftScheduleController {
    
        updateItems() {
            // ...
        }
    }
```

e. Не использовать аббревиатуры, которые не являются общепринятыми.

f. Не использовать сокращений, которые не являются общепринятыми.

g. Использовать слова `count` и `number of` для названия переменных, в которых 
   содержится некоторое количество. В случаях, когда может быть двусмысленность 
   при использовании `count`, отдавать предпочтение варианту с `number of`

```typescript
    // Плохо

    n // Неговорящее название
    nErr // Неочевидное сокращение
    pcReader // Аббревиатура, у которой может быть несколько значений
    cstmrId // Выброшены гласные буквы из слова
    kSecondsPerDay // Специфичные префиксы

    // Хорошо
        
    priceCountReader // Без аббревиатур
    numberOfErrors
    dnsConnectionCount    
```

h. Не использовать более двух идущих подряд существительных. Добавлять в этом случае 
   какие-то предлоги-связки, например `of`.

```typescript
    // Плохо
    isRunningCalculateCurrentDraft

    // Хорошо
    isRunningCalculationOfCurrentDraft
```

i. Не использовать в качестве названий слова являющиеся служебными для языка, 
   например `get`, `set`, `undefined`  и т.д.

```typescript
    class TagService {
        
        get() {
            // ...
        }
    }
```

j. Имена переменных должны состоять из слов, имеющих определенное смысловое значение 
    в английском языке. Не допускается использовать транслитерацию.

k. Не следует использовать венгерскую нотацию, т.е. не нужно кодировать тип 
    в имени переменной.

```typescript
    // Плохо
    function destroyTrip(iTripId) {
        // ...
    }

    // Хорошо
    function destroyTrip(tripId) {
        // ...
    }    
```

### 4.2. Правила для идентификаторов каждого типа

#### 4.2.1. \[Не автоматизировано\] Имена классов

a. \[Автоматизировано: class-name\] Имена классов должны соответствовать `UpperCamelCase`. Это касается как экспортируемых, 
   так и приватных классов.

```typescript
    // Плохо
    class tripAction {
        // ...
    }

    // Хорошо
    class TripAction {
        // ...
    }
```

b. \[Не автоматизировано\] Имя должно состоять из существительных и прилагательных.

```typescript
    // Плохо
    class FetchData {
        // ...
    }

    // Хорошо
    class DataFetcher {
        // ...
    }
```

c. \[Не автоматизировано\] Должно использоваться единственное число.

```typescript
    // Плохо
    class EventWindows {
        // ...
    }

    // Хорошо
    class EventWindow {
        // ...
    }
```

#### 4.2.2. \[Не автоматизировано\] Имена методов

Имена методов должны соответствовать `lowerCamelCase`.

Имя, как правило, должно включать глагол, указывающий на действие, которое выполняет метод.
При этом используемый глагол должен максимально отражать суть того, что делает метод. 
Например, не должно быть метода `getSomething`, который ничего не возвращает.


```typescript
    // Плохо
    // Метод с префиксом get не возвращает данные, а только загружает
    getZones() {
        this.zones = this._dataLoader.fetch(env.api.zones);
    }

    // Хорошо
    // Get-метод, как и ожидается, возвращает данные
    getZones() {
        return this._dataLoader.fetch(env.api.zones);
    }
    // или, если по какой-то причине не можем вернуть значение
    // По крайней мере, название метода явно не указывает на то,
    // что метод должен вернуть данные
    loadZones() {
        
    }

    // Плохо
    getPopupPosition() {
        // Вычисляет позицию на основе каких-то данные и условий
    }

    // Хорошо
    calculatePosition() {
        // Название метода явно отражает, что позиция не просто
        // откуда-то запрашивается, а она вычисляется
    }
```

#### 4.2.3. \[Не автоматизировано\] Имена перечислений

Имя перечисления должно соответствовать `UpperCamelCase`, как и для классов. 
Не использовать для перечисления на конце слово `Type`. Имеет смысл использовать
его только тогда, когда перечисление является перечислением каких-то типов.

Имя должно состоять из одиночного существительного или существительных и прилагательных. 

Элементы перечисления именуются также, как и константы.

```typescript
    // Плохо
    
    enum TripStatusType {
        PLAN ='plan',
        EXEC ='exec'
    }
    
    enum TripStatuses {
        PLAN = 'plan'
    }
    
    enum ButtonTypeType {
        DEFAULT = 'default',
        NORMAL = 'normal'
    }

    // Хорошо
    
    enum TripStatus {
        PLAN = 'plan',
        EXEC = 'exec'
    }
    
    enum ButtonType {
        DEFAULT = 'default',
        NORMAL = 'normal'
    }
    
    export enum ButtonMode {
        // ...
    }
    
    export enum ButtonState {
        // ...
    }
    
    export enum ButtonSizeType {
        // ...
    }
```

#### 4.2.4. \[Не автоматизировано\] Имена констант

a. \[Не автоматизировано\] Имена констант должны соответствовать `UPPER_SNAKE_CASE`: все буквы в верхнем регистре, 
   слова разделены нижнем подчёркиванием.

Объявление константы:

```typescript
    // Приватная константа
    const SOME_CONSTANT = 'value';

    class SomeClass {

        method() {
            // ...
            this.doSomeCalculation(diffusion + SOME_CONSTANT);
            // ...
        }
    }

    // Публичная константа
    class SomeClass {
        
        method() {
            // ...
            this.doSomeCalculation(diffusion + SomeClass.SOME_CONSTANT);
            // ...
        }
    }

    SomeClass.SOME_CONSTANT = 'value';
```

b.  \[Не автоматизировано\] Константа, объявленная внутри функции/метода, должна именоваться также, как переменная.

```typescript
    method() {
        const appleCount = 0;
        ...
    }
```

#### 4.2.5. \[Не автоматизировано\] Имена полей класса

Имена изменяемых полей класса (статичных или принадлежащих экземпляру) должны 
соответствовать `lowerCamelCase`.

Имена должны состоять из существительных и прилагательных.

#### 4.2.6. \[Не автоматизировано\] Имена параметров

Имена параметров должны соответствовать `lowerCamelCase`. Такое же правило применяется 
к параметру, который принимает конструктор в качестве значения.

#### 4.2.7. \[Не автоматизировано\] Имена локальных переменных

Имена переменных должны соответствовать `lowerCamelCase`. Такое же правило применяется 
к переменной, которая содержит конструктор в качестве значения.

Имена переменных должны состоять из прилагательных и существительных.

#### 4.2.8. \[Не автоматизировано\] Имена параметров в setter'ах

Для всех setter'ов параметр называть `value`:

```typescript
    class SomeClass {
    
        // Хорошо
        set expanded(value: boolean) {
            // ...
        }
    }
```

### 4.3. \[Не автоматизировано\] Названия в верхнем регистре

Если фраза, которая должна стать названием идентификатора, содержит общепринятые 
аббревиатуры и названия типа IPv6, iOS, то следует поступать так:

a. Все слова фразы привести к нижнему регистру, убрав все спецсимволы.

b. Привести первую букву каждого слова к верхнему регистру, если требуется `UpperCamelCase`,
   иначе для всех, кроме первого слова, если требуется `lowerCamelCase`.

c. Объединить полученные слова в имя идентификатора.

```typescript
    // Плохо

    // Имена классов
    XMLHTTPRequest
    YoutubeImporter

    // Названия переменных
    newCustomerID
    innerStopWatch  
    supportsIPv6OnIOS    

    // Хорошо

    // Имена классов
    XmlHttpRequest
    YouTubeImporter

    // Названия переменных
    newCustmerId
    innerStopwatch (т.к. stopwatch - это одно слово, означающее "секундомер")
    supportsIpv6OnIos
```

### 4.4. Используемые для именования слова и сочетания

| Слово | Парное | Назначение |
|--|--|--|
| enable | disable | Активация/деактивация какого-то элемента. В результате этого действия элемент (сущность) становится доступной (недоступной). |
| enabled | disabled | Элемент активен/неактивен, т.е. допускает или не допускает взаимодействие с ним. |
| checked | unchecked | Элемент отмечен/ не отмечен (выбран/не выбран). Наиболее соответствует ситуации, когда элемент выбирается в списке с флажками (checkbox'ами). |
| state | - | Используется для именования состояния элемента. |
| filter | - | Используется для именования фильтра. |
| factory | - | Фабрика каких-то объектов. |

### 4.5. \[Не автоматизировано\] Поля логического типа

a. \[Не автоматизировано\] Поля, которые содержат признак того, имеется ли какое-то свойство или нет (поле-флаг), обозначаются 
как `has<существительное>`. Например, `hasBorder`.

b. \[Не автоматизировано\] Поля, которые определяют возможность использовать какой-то функционал, обозначаются как `is<возможность>Enabled`.
Например, `isLoggingEnabled`.

c. \[Не автоматизировано\] Любой однозначный логический тип определяется причастием или отглагольным прилагательным. Например: 
`hidden`, `busy`, `disabled` и т.д.

### 4.6. Спецификации

#### 4.6.1. \[Не автоматизировано\] Именование переменных под объекты заглушек

Имя переменной-конструктора для заглушки должно быть в виде `Mock<имя класса, на экземляр которого делается заглушка>`.
Переменной, являющейся экземпляром класса-заглушки, необходимо давать имя в следующем формате: 
`mock<имя класса, на экземляр которого делается заглушка>`. 

```typescript
    // Класс, на экземляр которого делается заглушка: AuthAppService
    const MockAuthAppService = jest.fn<AuthAppService>(() => ({ validate: jest.fn() }));
    const mockAuthAppService = new MockAuthAppService();
```

## 5. TSDoc/JSDoc

TSDoc/JSDoc должен использоваться для публичного интерфейса классов и модулей, описывая назначение, входные, 
выходные параметры, исключения и возвращаемое значение.

### 5.1. \[Не автоматизировано: jsdoc-format\] Общая форма

В общем виде JSDoc блок выглядит следующим образом:

```typescript
    /**
     * Многострочное описание JSDoc,
     * которое переносится стандартным образом в соответствии
     * с лимитом на длину строки.
     *
     * @param numberOfPoints Количество точек, которое 
     *     должно быть создано.
     * @return Возвращает точки карты.
     * @throws Выбрасывает исключение в случае ...
     */
     generatePoints(numberOfPoints) {
         // ...
     }
```

Комментарий включает:

a. Базовое описание.

b. Секцию с параметрами, возвращаемым значением.

### 5.2. \[Не автоматизировано\] Общие правила

a. Базовое описание отделяется от секции с параметрами пустой строкой.

b. Тело документации не должно начинаться и заканчиваться пустой строкой.

c. Длина каждой строки JSDoc не должна превышать установленное ограничение на длину строки.

d. Комментарий пишется в Markdown. Например, ненумерованный список задаётся следующим образом:

```typescript
    /**
     * Некоторый список:
     *  - элемент 1;
     *  - элемент 2;
     *  - элемент 3.
     */
```

e. Перенос строк для секции параметров выполняется с дополнительным отступом.

```typescript
    /**
     * Описание.
     *
     * @param {number} numberOfPoints Количество точек, которое 
     *     должно быть создано.
     */
```

## 6. Политики

### 6.1. \[Автоматизировано: code coverage\] Покрытие кода спецификациями

a. При внесении изменений должны быть спецификации (тесты), которые описывают требования, 
которые эти изменения реализуют, и проверяются их. 

b. Когда пишем спецификации необходимо обращать внимание на процент покрытия кода 
спецификациями (code coverage). Необходимо доводить покрытие до 100%. Меньше 100% допускается только, 
если в классе есть методы, которые проверять не нужно (фиктивные, искусственные методы, которые
пробрасывают функциональность с одного уровня приложения на другой).

## 7. Принципы

### 7.1. Логирование

#### 7.1.1. Что логируем

TODO

#### 7.1.2. Как логируем

TODO

#### 7.1.3. Где логируем

TODO

a. Не нужно логировать на каждом уровне, что можно залогировать на общем. 

```typescript
   catch(error => this.logger.error(`getRuns ${error}`));
```
    
### 7.2. Проверки в коде

TODO

### 7.3. \[Автоматизировано: no-unused-vars\] Неиспользуемые переменные, классы, методы

В коде не должно быть неиспользованных констант, методов, классов, переменных. 
Неиспользуемые выражения и конструкции нужно удалять.

## 8. TODO

### 8.1. Общее

a. Языки:
     * css
     * html

### 8.2. \[Не автоматизировано\] Принципы

a. Сервисы должны иметь конкретные методы, которые скрывают детали. Какие-то общие 
   методы должны быть приватными.

```typescript
        // Лучше сделать специальный метод, который бы выполнял сценарий планирования
        // и задавал бы фильтр внутри, чтобы контроллеру не стоило об этом беспокоиться
        const filter = $rootScope.UTIL.filter({ value: 'schedulePlanner', field: 'scenario' });
        if (!$rootScope.TYPE.isFilter(filter)) {
            throw new Error('Invalid filter schedulePlanner');
        }

        ScenariosDataService.getByFilter(filter).then(runs => {
            const lastScenarioRun = ScenariosDataService.getLastById(draftId, runs);
            if (lastScenarioRun) {
                $scope.draft_stats.scenario = lastScenarioRun;
            } else {
                $scope.draft_stats.scenario = {};
                $scope.trips_data = TripsDataService.clearTrips();
            }
            checkStateScenarioPlanner(lastScenarioRun);
        });
```

b. Логирование   

c. Количество и суть проверок.

d. Обработка входного параметра конструктора, функции.

e. asserts (утверждения), правила их использования, защитное программирование.

f. Минимально необходимое решение, удовлетворяющее требованиям
