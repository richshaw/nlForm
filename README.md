# Angular Natural Language Forms

## Description

Allows the easy implementation of natural language or mad-lib style form inputs. Tried to keep CSS styling to a minimum.

## Status

* Needs browser testing

## Dependencies 

Requires [Angular](https://github.com/angular/angular)

## Demo

Demo is available on [Codepen](http://codepen.io/richshaw/pen/ZObvqE)

## Installation

In your index.html file, include the nlForms module and style sheet.

```html
<!-- style sheet -->
<link href="../nlForms.css" rel="stylesheet" type="text/css"/>
<!-- module -->
<script type="text/javascript" src="../nlforms.js"></script>
```

Include the nlForms module as a dependency in your application.

```javascript
angular.module('myApp', ['nlForm']);
```

## Usage

### Basic markup

Form components need to the wrapped in a ```nl-form``` tag.

```html
<nl-form></nl-form>
```

There are currently two nlForm components text input and select input.

```html
<nl-form>
    <nl-text ng-model=""></nl-text>
</nl-form>
```

```html
<nl-form>
    <nl-select ng-model="" placeholder="">
        <nl-option value="">text</nl-option>
        <nl-option value="">text</nl-option>
        <nl-option value="">text</nl-option>
    </nl-select>
</nl-form>
```

### Example markup

```html
<nl-form>
    <p>My name is <nl-text ng-model="input.name"></nl-text> the brave adventure cat!</p>
    <p>Today I want to 
      <nl-select ng-model="input.todo" placeholder="do all the things">
            <nl-option value="trash cans">go north and hangout by the trash cans</nl-option>
            <nl-option value="thinking tree">ponder life the universe and everything</nl-option>
            <nl-option value="air vents">play hide and seek in the air vents</nl-option>
      </nl-select> and eat 
      <nl-select ng-model="input.eat" placeholder="all the things">
            <nl-option value="pizza">double cheese, double mouse pizza</nl-option>
            <nl-option value="pasta">duck and salmon pasta bites</nl-option>
            <nl-option value="squirrel">roasted garden squirrel</nl-option>
      </nl-select>.
    </p>
</nl-form>
<hr>
<p>
 Hello there, {{input.name || 'Adventure Cat'}}. We can totally help you find some {{ input.eat.value || 'foodz' }} to eat by the {{ input.todo.value || 'cat box' }}.
</p>
```

### Parameters

* ng-model = same as ng-model on a standard html form input
* placeholder = placeholder text for nl-select input


## License

This software is provided free of charge and without restriction under the MIT License.