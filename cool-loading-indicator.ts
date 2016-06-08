import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import { CoolHttp, IRequestInterceptor, IResponseInterceptor } from 'angular2-cool-http';

const DEFAULT_INDICATOR_DELAY = 500;

@Component({
    selector: 'cool-loading-indicator',
    template: `
        <div *ngIf="showIndicator" class="cool-loading-indicator">
            <ng-content></ng-content>
        </div>
    `,
    directives: [ NgIf ]
})
export class CoolLoadingIndicator implements OnInit, OnDestroy {
    coolHttp: CoolHttp;

    showIndicatorCounter: number = 0;
    showIndicator: boolean = false;

    requestInterceptor: IRequestInterceptor = {
        beforeRequestAsync: this.beforeRequestAsync
    };

    responseInterceptor: IResponseInterceptor = {
        afterResponseAsync: this.afterResponseAsync
    };

    @Input()
    indicatorDelay: number;

    constructor(coolHttp: CoolHttp) {
        this.coolHttp = coolHttp;
    }

    ngOnInit() {
        this.coolHttp.registerRequestInterceptor(this.requestInterceptor);

        this.coolHttp.registerResponseInterceptor(this.responseInterceptor);
    }

    beforeRequestAsync() {
        let that = this;

        this.showIndicatorCounter++;

        if(this.indicatorDelay) {
            setTimeout(() => {
                if(that.shouldShowIndicator) {
                    this.showIndicator = true;
                }
            }, this.indicatorDelay || DEFAULT_INDICATOR_DELAY);
        }
        else if(this.shouldShowIndicator) {
            this.showIndicator = true;
        }

        return Promise.resolve();
    }

    afterResponseAsync() {
        this.showIndicatorCounter--;

        if(this.shouldHideIndicator) {
            this.showIndicator = false;
        }

        return Promise.resolve();
    }

    get shouldShowIndicator() {
        return this.showIndicatorCounter > 0;
    }

    get shouldHideIndicator() {
        return this.showIndicatorCounter < 1;
    }

    ngOnDestroy() {
        this.coolHttp.deregisterRequestInterceptor(this.requestInterceptor);

        this.coolHttp.deregisterResponseInterceptor(this.responseInterceptor);
    }
}
