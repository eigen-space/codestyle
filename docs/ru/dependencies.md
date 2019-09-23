# npm-зависимости

## 1. О чём это мы?

Немного предыстории, что привела нас к этой заметке. Мы разрабатывали библиотеку компонентов и
столкнулись с некоторыми проблемами. Несмотря на то, что мы понимали, что библиотека должна
использовать окружение проекта-потребителя, т.е. того, который её использует, мы использовали
зависимости некорректно. Таким образом, мы получили библиотеку, которая не работает практически
в пустом проекте. Именно поэтому мы предлагаем обратить внимание на то, как следует организовать
работу с зависимостями.

## 2. Немного теории

На момент написания этой заметки существует 3 типа зависимостей, которые важны для нас и
представляют собой одну из секций в `package.json`:

* `dependencies` - основные зависимости. Это зависимости, в которых непосредственно нуждается
приложение в процессе его работы. Важный момент: если вы разрабатываете некоторую библиотеку,
использующую какой-то framework в качестве зависимости, то его не должно быть в этой секции.
Библиотека будет частью проекта-потребителя, в котором будет своя экосистема, предоставляющая
всё необходимое для вашей библиотеки. Как и во всём другом, нужно чётко понимать, почему
та или иная зависимость находится в этой секции. Также важно понимать, как решаются конфликты
между зависимостями. Рассмотрим такой сценарий. Наша библиотека имеет некоторую зависимость 
`dep v.x.x.x`. Проект, где используется наша библиотека, также имеет зависимость от `dep`, но
другой версии `dep v.y.y.y`. Обе версии будут установлены! И это чрезвычайно важно понимать.
Как результат, мы вполне можем получить неработающее приложение по совершенно неочевидным
причинам, на первый взгляд.
* `devDependencies` - зависимости, которые нужны в процессе разработки. Всё очень просто.
Это зависимости (инструменты), которые помогают нам писать код и поддерживать проект.
Например, к ним относятся: типы для typescript, инструменты для статического анализа кода,
инструменты для запуска тестов, инструменты для сборки и запуска dev-сервера. В общем случае
это то, что остаётся за бортом финальной сборки вашего приложения. Эти зависимости не требуются
для работы вашего пакета в другом проекте, и они не ставятся вместе с вашим пакетом. Название
подчёркивает то, что они используются только в процессе разработки.
* `peerDependencies` - зависимости, на которые рассчитывает ваш проект/библиотека. Эти зависимости
требуют, чтобы они были установлены в окружении, где будет использоваться ваш пакет. В этой секции
указываются название и конкретные версии или диапазоны версий, с которыми ваш пакет гарантированно
работает. Эти зависимости не устанавливаются автоматически при установке вашего пакета! Это важный
момент, на который нужно обратить внимание. Пакет просто рассчитывает на то, что они уже будут в
проекте. Если их в нём нет, то будет соответствующее предупреждение при установке зависимостей.

## 3. peer-зависимости

### 3.1. Как использовать?

Теперь мы понимаем, что порой нам нужно воспользоваться именно `peerDependencies`, т.е. предъявить
требование к окружению, где наша библиотека будет использоваться. Но есть особенность. Поскольку
это требование к оружению другого проекта, то эти зависимости не устанавливаются при подтягивании
зависимостей в самом проекте библиотеки, т.е. когда мы вызываем `npm install` или `yarn`, чтобы
подтянуть все зависимости, необходимые нам в процессе работы над библиотекой. На данный момент и
до того момента, *пока мы не найдём более хорошего решения*, мы предлагаем дублировать зависимости, 
которые нужны в в процессе разработки библиотеки, в секции *devDependencies*.

### 3.2. Пример

`core-ui-kit` - библиотека компонентов пользовательского интерфейса, использующая `react`.
`react` должен быть указан в секции `peerDependencies`, т.к. является библиотекой, формирующей
окружение проекта, где будет применяться наша библиотека. Предположим, что `react` указан с версией
`16.7.0`. Это означает, что наша библиотека гарантирует, что она работает с версией `react v.16.7.0`.
Соответственно имеет смысл при использовании библиотеки `core-ui-kit` использовать ровно ту версию,
что задана в `peerDependencies`.

### 3.3. Какую версию зависимости ставить для peer-зависимостей?

Необязательно использовать конкретную версию зависимости. Если мы уверены, что наша библиотека
надёжно работает с диапазоном версий, то имеет смысл указать именно диапазон версий, предоставив
больше свободы выбора потребителю нашей библиотеки.

## 4. Как выставлять номер зависимости?

### 4.1. Должны быть только конкретные версии зависимостей

Если мы используем какую-то зависимость, то мы используем конкретную её версию. Недопустимо
использовать среди обязательных зависимостей (`dependencies`) и зависимостей для разработки 
(`devDependencies`) зависимости, допускающие [автообновление](https://docs.npmjs.com/about-semantic-versioning) 
(`^1.0.4`, `~1.0.4`). Мы назваем такие зависимости "зависимостями с шапками". Так вот их быть
не должно в списке зависимостей. Только конкретные версии (`1.0.4`). Если нам явно нужна какая-то
версия с обновлением, то мы осознанно увеличиваем номер версии зависимости и получаем эти обновления.
В ином случае обноления зависимостей быть не должно.

В техническом плане, чтобы получить зависимость без шапки можно:

1. Либо при добавлении зависимости указывать конкретную версию: `npm install --save-dev some-dep@1.0.4`
2. Либо изменить значение по умолчанию для параметра [`save-prefix`](https://docs.npmjs.com/misc/config#save-prefix) 
в конфигурационном файле `.npmrc` (`.yarnrc`) в корне проекта:

`.npmrc`:

```
save-prefix=""
```

`.yarnrc`:

```
save-prefix ""
```

### 4.2. Диапазон версий для peerDependencies

При написании своей библиотеки мы, скорее всего, будем испоьзовать `peerDependencies`, определяющие
окружение, в котором библиотека будет работать. Разумно давать больше свободы в используемой версии
зависимостей, что формируют это окружение. Поэтому для `peer`-зависимостей по возможности стоит задавать
нежесткие версии, т.е. диапазоны версий. При этом мы не должны задавать их наугад. Это должны быть
диапазоны версий, для которых библиотека гарантированно будет работать. В ином случае нужно выставлять
конкретные версии, для которых библиотека работает.