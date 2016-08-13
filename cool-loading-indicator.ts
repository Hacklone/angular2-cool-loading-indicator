import { Component, OnInit, OnDestroy, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoolHttpModule, CoolHttp, IRequestInterceptor, IResponseInterceptor } from 'angular2-cool-http';

const DEFAULT_INDICATOR_DELAY = 500;

@Component({
    selector: 'cool-loading-indicator',
    template: `
        <div *ngIf="showIndicator" class="cool-loading-indicator">
            <ng-content></ng-content>
        </div>
    `
})
export class CoolLoadingIndicator implements OnInit, OnDestroy, IRequestInterceptor, IResponseInterceptor {
    coolHttp: CoolHttp;

    showIndicatorCounter: number = 0;
    showIndicator: boolean = false;

    @Input()
    indicatorDelay: number;

    constructor(coolHttp: CoolHttp) {
        this.coolHttp = coolHttp;
    }

    ngOnInit() {
        this.coolHttp.registerRequestInterceptor(this);

        this.coolHttp.registerResponseInterceptor(this);
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

        return Promise.resolve(false);
    }

    afterResponseAsync() {
        this.showIndicatorCounter--;

        if(this.shouldHideIndicator) {
            this.showIndicator = false;
        }

        return Promise.resolve(false);
    }

    get shouldShowIndicator() {
        return this.showIndicatorCounter > 0;
    }

    get shouldHideIndicator() {
        return this.showIndicatorCounter < 1;
    }

    ngOnDestroy() {
        this.coolHttp.deregisterRequestInterceptor(this);

        this.coolHttp.deregisterResponseInterceptor(this);
    }
}

@NgModule({
    exports: [CoolLoadingIndicator],
    imports: [CommonModule, CoolHttpModule],
    declarations: [CoolLoadingIndicator]
})
export class CoolLoadingIndicatorModule {}