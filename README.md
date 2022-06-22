# JPicker

Simply date picker for web applications

### Features
- Choosing one day or range of days 
- Choosing predefined range (or set your own ranges)
- Easy setup
- No dependencies
- Inline mode

<br />

![JPicker](https://shop.foodwork.pl/jpicker.gif)

<br />

## Getting started

### Installation

You can use npm `npm install j-picker` or just download bundle files for bundle dir

<br />

### Usages 


#### 1. Add css file to your page

```html
<link href="bundle/JPicker.css" rel="stylesheet">
```

#### 2. Add JS 

```html
<script src="bundle/Jpicker.js"></script>
<script>window.JPicker //<-- JPicker will be available under global varaiable</script>
```
OR
```javascript
require(['bundle/JPicker.js'], function(JPicker) {});
```
OR
```javascript
import JPicker form 'j-picker';
```
OR
```javascript
const JPicker = require('j-picker');
```

#### 3. Create instance of JPicker with config

```javascript
const jpicker = new JPicker({
    wrapper: '.selector-for-picker'
})
```

<br />

### Getting current value

```javascript
const picker = new JPicker({
    wrapper: '.date-picker-wrapper'
});

const value = picker.getCurrentValue();//returns Array<Date>
```

<br />

### Setting new value 

```javascript
//for range
const value = picker.setCurrentValue([new Date(2020, 01, 8), new Date(2020, 01, 12)])
//for single
const value = picker.setCurrentValue([new Date(2020, 01, 8)])
```

<br />

## Configuration

Object with configuration should be passed to JPicker constructor. 

| Option name | Type  | Description |
|---|---|---|
| wrapper | *string*  | Selector for HTML element where picker will be build  |   
| title | *string* | Displayed title in picker header |  
| description  | *string* | Displayed subtitle in picker header  | 
| range | *boolean* | If true, user chooses range instead of single date | 
| currentDate | *Array\<Date\>* OR<br /> *Array\<number\>* OR<br /> *Date* OR<br /> *number*  | Initial value for datepicker (use array if *range* is *true*). Unix timestamp (in sec) can be used instead date |
| today | *Date* OR<br /> *number* | Date (or timestamp) with day that should be dispaly as "today" (with bold font) |
| weekDays | *Array\<string\>* | Translating for days, default *['Mo','Tu','We','Th','Fr','Sat','Sun']* | 
| months | *Array\<string\>* | Translating for days, default *['January','February'... etc]* |
| events | *Object* | Object with events callbacks (more in ***Events*** section) |
| rangesSet | *Array\<Object\>* | Object with own ranges (more in ***Ranges*** section) |
| rangesLabels | *Object* | Translating for ranges (more in ***Ranges*** section) |
| rangesTitle | *string* | Title for block with ranges |

<br />

## Events

In configuration object with events can be passed. In example below all possible events are shown:
```javascript
const picker = new JPicker({
    wrapper: '.date-picker-wrapper',
    events: {
        onChangeValue: function(currentValue: Array<Date>) {
            //called when value of datepicker was changed 
        },
        onNextMonthClick: function() {
            //called when user click next month arrow
        },
        onPrevMonthClick: function() {
            //called when user click previous month arrow
        },
        onDayClick: function(day: number, date: Array<number>) {
            //called when user choose specific day
        },
        onDayMouseEnter: function(day: number, date: Array<number>) {
            //called when user enter pointer on specific day
        },
        onDayMouseLeave: function(day: number, date: Array<number>) {
            //called when user leave pointer from specific day
        },
        onRangeClick: function(FromDate: Date, ToDate: Date) {
            //called when choose range
        },
        onValueClick: function(ValueDate: Date) {
            //called when user click value that is shown in picker header
        },
        onMenuMonthClick: function() {
            //called when user click month name and menu with month will be opened
        },
        onMonthClick: function(month: number) {
            //called when user choose specific month
        }
    }
});
```

<br />

## Ranges 

JPicker has defined date ranges that can choose by user, e.g. `last 7 days`. Defaults ranges: 
 - this_week (displayed name `This week`)
 - last_week (displayed name `Last week`)
 - next_week (displayed name `next week`)
 - last_3_days (displayed name `Last 3 days`)
 - last_7_days (displayed name `Last 7 days`)
 - last_30_days (displayed name `Last 30 days`)
 - this_month (displayed name `This month`)
 - last_month (displayed name `Last month`)
 - next_month (displayed name `Next month`)
 - this_quarter (displayed name `This quarter`)
 - last_quarter (displayed name `Last quarter`)
 - next_quarter (displayed name `Next quarter`)

<br />

Displayed names can be changed in configuration, example below:
```javascript
const picker = new JPicker({
    wrapper: '.date-picker-wrapper',
    rangesLabels: {
        this_week: "Current week",
        last_week: "Previous week"
        //etc
    }
});
```

<br />

Instead of predefined ranges, own ones can be setup (or use predefined if only some of all should be displayed), example below:
```javascript
const picker = new JPicker({
    wrapper: '.date-picker-wrapper',
    rangesSet: [
        'this_week',
        'this_month',
        {
            id: "this_year",
            label: "This year",
            range: [new Date(2022, 0, 1), new Date(2022, 11, 31)]
        }
    ]
});
```
