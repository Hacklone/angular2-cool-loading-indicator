[npm-url]: https://npmjs.org/package/angular2-cool-loading-indicator
[npm-image]: https://img.shields.io/npm/v/angular2-cool-loading-indicator.svg
[downloads-image]: https://img.shields.io/npm/dm/angular2-cool-loading-indicator.svg
[total-downloads-image]: https://img.shields.io/npm/dt/angular2-cool-loading-indicator.svg

# angular2-cool-loading-indicator [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Total Downloads][total-downloads-image]][npm-url]
Cool loading indicator for angular2

## Dependencies
> The angular2-cool-loading-indicator will only work properly if you utilize [angular2-cool-http](https://github.com/Hacklone/angular2-cool-http) for api calls.

## Demo
[View demo on Plunker](https://embed.plnkr.co/zusopx/)

## Install 
> npm install --save angular2-cool-loading-indicator

## Setup
### bootstrap.ts
```javascript
import { NgModule } from '@angular/core';
import { CoolLoadingIndicatorModule } from 'angular2-cool-loading-indicator';

@NgModule({
    imports: [CoolLoadingIndicatorModule]
})
export class MyAppModule {}

```
### my-app.ts
```javascript
import { Component, OnInit } from '@angular/core';

import { CoolHttp } from 'angular2-cool-http';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <cool-loading-indicator [indicatorDelay]="500">
        <div>This is you incredible custom loading indicator element</div>
      </cool-loading-indicator> 
    </div>
  `
})
export class AppComponent implements OnInit { 
    coolHttp: CoolHttp;
    
    constructor(coolHttp: CoolHttp) {
        this.coolHttp = coolHttp;   
    }
    
    async ngOnInit() {
        // await async api call
        let response = await this.coolHttp.getAsync('/api/request');
    }
}
```

## Parameters
- indicatorDelay
  * optional
  * default = 500ms
  * cool-loading-indicator waits this amount of time before showing 
  * to avoid blinking indicator caused by background api calls

## License
> The MIT License (MIT)

> Copyright (c) 2016 Hacklone
> https://github.com/Hacklone

> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
