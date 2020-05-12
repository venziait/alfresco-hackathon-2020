import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ViewNodeAction, NavigateToFolder } from '@alfresco/aca-shared/store';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { Injectable, NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, Input, ViewEncapsulation, defineInjectable } from '@angular/core';
import { AlfrescoApiService, CoreModule, PipeModule, ToolbarModule, DirectiveModule } from '@alfresco/adf-core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SearchHighlightService = /** @class */ (function () {
    function SearchHighlightService() {
    }
    SearchHighlightService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SearchHighlightService.ctorParameters = function () { return []; };
    /** @nocollapse */ SearchHighlightService.ngInjectableDef = defineInjectable({ factory: function SearchHighlightService_Factory() { return new SearchHighlightService(); }, token: SearchHighlightService, providedIn: "root" });
    return SearchHighlightService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SearchHighlightComponent = /** @class */ (function () {
    function SearchHighlightComponent(store, alfrescoApiService, router) {
        this.store = store;
        this.alfrescoApiService = alfrescoApiService;
        this.router = router;
        this.onDestroy$ = new Subject();
        this.name$ = new BehaviorSubject('');
        this.title$ = new BehaviorSubject('');
    }
    /**
     * @return {?}
     */
    SearchHighlightComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.updateValues();
        this.alfrescoApiService.nodeUpdated
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(function (node) {
            /** @type {?} */
            var row = _this.context.row;
            if (row) {
                var entry = row.node.entry;
                if (entry.id === node.id) {
                    entry.name = node.name;
                    entry.properties = Object.assign({}, node.properties);
                    entry.search = Object.assign({}, node.search);
                    _this.updateValues();
                }
            }
        });
    };
    /**
     * @private
     * @return {?}
     */
    SearchHighlightComponent.prototype.updateValues = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.node = this.context.row.node;
        /** @type {?} */
        var highlightAll = (this.node.entry['search'] && this.node.entry['search']['highlight']) ? this.node.entry['search']['highlight'] : [];
        var _a = this.node.entry, name = _a.name, properties = _a.properties;
        /** @type {?} */
        var title = properties ? properties['cm:title'] : '';
        this.name$.next(name);
        if (title !== name) {
            this.title$.next(title ? "( " + title + " )" : '');
        }
        highlightAll.forEach(function (elem) {
            if (elem.field === "cm:name") {
                _this.name$.next(elem.snippets[0]);
            }
            if (elem.field === "cm:title" && title !== name) {
                _this.title$.next("( " + elem.snippets[0] + " )");
            }
            if (elem.field === "cm:content") {
                _this.highlight = elem.snippets;
            }
        });
    };
    /**
     * @return {?}
     */
    SearchHighlightComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    };
    Object.defineProperty(SearchHighlightComponent.prototype, "description", {
        get: /**
         * @return {?}
         */
        function () {
            var properties = this.node.entry.properties;
            return properties ? properties['cm:description'] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchHighlightComponent.prototype, "modifiedAt", {
        get: /**
         * @return {?}
         */
        function () {
            return this.node.entry.modifiedAt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchHighlightComponent.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            var content = this.node.entry.content;
            return content ? content.sizeInBytes : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchHighlightComponent.prototype, "user", {
        get: /**
         * @return {?}
         */
        function () {
            return this.node.entry.modifiedByUser.displayName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchHighlightComponent.prototype, "isFile", {
        get: /**
         * @return {?}
         */
        function () {
            return this.node.entry.isFile;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    SearchHighlightComponent.prototype.showPreview = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.store.dispatch(new ViewNodeAction(this.node.entry.id, { location: this.router.url }));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SearchHighlightComponent.prototype.navigate = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.store.dispatch(new NavigateToFolder(this.node));
    };
    SearchHighlightComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aca-search-results-row-highlight',
                    encapsulation: ViewEncapsulation.None,
                    template: "<div class=\"line\">\n    <span tabindex=\"0\" role=\"link\" *ngIf=\"isFile\" (click)=\"showPreview($event)\" (keyup.enter)=\"showPreview($event)\"\n        class=\"link\" innerHTML=\" {{ name$ | async }}\">\n       \n    </span>\n    <span tabindex=\"0\" role=\"link\" *ngIf=\"!isFile\" (click)=\"navigate($event)\" (keyup.enter)=\"navigate($event)\"\n        class=\"bold link\" innerHTML=\" {{ name$ | async }}\">\n    \n    </span>\n    <span  innerHTML=\" {{ title$ | async }}\"></span>\n</div>\n\n<div *ngIf=\"description\" class=\"line\">{{ description }}</div>\n\n<div class=\"line\">\n    {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.MODIFIED' | translate }}:\n    {{ modifiedAt | date: 'medium' }}\n    {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.BY_USER' | translate: { user: user } }}\n\n    <span *ngIf=\"size\">| {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.SIZE' | translate }}:\n        {{ size | adfFileSize }}\n    </span>\n</div>\n\n<ng-container  *ngTemplateOutlet=\"locationField\">\n    {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.LOCATION' | translate }}:\n</ng-container>\n\n<div class=\"line\" *ngIf=\"highlight\">\n    ...<span *ngFor=\"let high of highlight\" [innerHTML]=\"high\"></span>...\n</div>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    SearchHighlightComponent.ctorParameters = function () { return [
        { type: Store },
        { type: AlfrescoApiService },
        { type: Router }
    ]; };
    SearchHighlightComponent.propDecorators = {
        context: [{ type: Input }],
        locationField: [{ type: Input }]
    };
    return SearchHighlightComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function modules() {
    return [CoreModule, ToolbarModule, PipeModule, DirectiveModule];
}
var AdfModule = /** @class */ (function () {
    function AdfModule() {
    }
    AdfModule.decorators = [
        { type: NgModule, args: [{
                    imports: modules(),
                    exports: modules()
                },] }
    ];
    return AdfModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SearchHighlightModule = /** @class */ (function () {
    function SearchHighlightModule() {
    }
    SearchHighlightModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SearchHighlightComponent],
                    imports: [CommonModule, BrowserModule, TranslateModule.forChild(), AdfModule],
                    exports: [SearchHighlightComponent],
                    entryComponents: [SearchHighlightComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return SearchHighlightModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { SearchHighlightService, SearchHighlightComponent, SearchHighlightModule, AdfModule as ɵb, modules as ɵa };

//# sourceMappingURL=search-highlight.js.map