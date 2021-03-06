(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('@ngrx/store'), require('@angular/router'), require('@alfresco/aca-shared/store'), require('@angular/common'), require('@angular/platform-browser'), require('@ngx-translate/core'), require('@angular/core'), require('@alfresco/adf-core')) :
    typeof define === 'function' && define.amd ? define('search-highlight', ['exports', 'rxjs', 'rxjs/operators', '@ngrx/store', '@angular/router', '@alfresco/aca-shared/store', '@angular/common', '@angular/platform-browser', '@ngx-translate/core', '@angular/core', '@alfresco/adf-core'], factory) :
    (factory((global['search-highlight'] = {}),global.rxjs,global.rxjs.operators,global['@ngrx/store'],global.ng.router,global.store$1,global.ng.common,global.ng.platformBrowser,global['@ngx-translate/core'],global.ng.core,global['@alfresco/adf-core']));
}(this, (function (exports,rxjs,operators,store,router,store$1,common,platformBrowser,core,i0,adfCore) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SearchHighlightService = /** @class */ (function () {
        function SearchHighlightService() {
        }
        SearchHighlightService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SearchHighlightService.ctorParameters = function () { return []; };
        /** @nocollapse */ SearchHighlightService.ngInjectableDef = i0.defineInjectable({ factory: function SearchHighlightService_Factory() { return new SearchHighlightService(); }, token: SearchHighlightService, providedIn: "root" });
        return SearchHighlightService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SearchHighlightComponent = /** @class */ (function () {
        function SearchHighlightComponent(store$$1, alfrescoApiService, router$$1) {
            this.store = store$$1;
            this.alfrescoApiService = alfrescoApiService;
            this.router = router$$1;
            this.onDestroy$ = new rxjs.Subject();
            this.name$ = new rxjs.BehaviorSubject('');
            this.title$ = new rxjs.BehaviorSubject('');
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
                    .pipe(operators.takeUntil(this.onDestroy$))
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
             */ function () {
                var properties = this.node.entry.properties;
                return properties ? properties['cm:description'] : '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchHighlightComponent.prototype, "modifiedAt", {
            get: /**
             * @return {?}
             */ function () {
                return this.node.entry.modifiedAt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchHighlightComponent.prototype, "size", {
            get: /**
             * @return {?}
             */ function () {
                var content = this.node.entry.content;
                return content ? content.sizeInBytes : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchHighlightComponent.prototype, "user", {
            get: /**
             * @return {?}
             */ function () {
                return this.node.entry.modifiedByUser.displayName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchHighlightComponent.prototype, "isFile", {
            get: /**
             * @return {?}
             */ function () {
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
                this.store.dispatch(new store$1.ViewNodeAction(this.node.entry.id, { location: this.router.url }));
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
                this.store.dispatch(new store$1.NavigateToFolder(this.node));
            };
        SearchHighlightComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'aca-search-results-row-highlight',
                        encapsulation: i0.ViewEncapsulation.None,
                        template: "<div class=\"line\">\n    <span tabindex=\"0\" role=\"link\" *ngIf=\"isFile\" (click)=\"showPreview($event)\" (keyup.enter)=\"showPreview($event)\"\n        class=\"link\" innerHTML=\" {{ name$ | async }}\">\n       \n    </span>\n    <span tabindex=\"0\" role=\"link\" *ngIf=\"!isFile\" (click)=\"navigate($event)\" (keyup.enter)=\"navigate($event)\"\n        class=\"bold link\" innerHTML=\" {{ name$ | async }}\">\n    \n    </span>\n    <span  innerHTML=\" {{ title$ | async }}\"></span>\n</div>\n\n<div *ngIf=\"description\" class=\"line\">{{ description }}</div>\n\n<div class=\"line\">\n    {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.MODIFIED' | translate }}:\n    {{ modifiedAt | date: 'medium' }}\n    {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.BY_USER' | translate: { user: user } }}\n\n    <span *ngIf=\"size\">| {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.SIZE' | translate }}:\n        {{ size | adfFileSize }}\n    </span>\n</div>\n\n<ng-container  *ngTemplateOutlet=\"locationField\">\n    {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.LOCATION' | translate }}:\n</ng-container>\n\n<div class=\"line\" *ngIf=\"highlight\">\n    ...<span *ngFor=\"let high of highlight\" [innerHTML]=\"high\"></span>...\n</div>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        SearchHighlightComponent.ctorParameters = function () {
            return [
                { type: store.Store },
                { type: adfCore.AlfrescoApiService },
                { type: router.Router }
            ];
        };
        SearchHighlightComponent.propDecorators = {
            context: [{ type: i0.Input }],
            locationField: [{ type: i0.Input }]
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
        return [adfCore.CoreModule, adfCore.ToolbarModule, adfCore.PipeModule, adfCore.DirectiveModule];
    }
    var AdfModule = /** @class */ (function () {
        function AdfModule() {
        }
        AdfModule.decorators = [
            { type: i0.NgModule, args: [{
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
            { type: i0.NgModule, args: [{
                        declarations: [SearchHighlightComponent],
                        imports: [common.CommonModule, platformBrowser.BrowserModule, core.TranslateModule.forChild(), AdfModule],
                        exports: [SearchHighlightComponent],
                        entryComponents: [SearchHighlightComponent],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
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

    exports.SearchHighlightService = SearchHighlightService;
    exports.SearchHighlightComponent = SearchHighlightComponent;
    exports.SearchHighlightModule = SearchHighlightModule;
    exports.ɵb = AdfModule;
    exports.ɵa = modules;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=search-highlight.umd.js.map