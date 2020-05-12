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
class SearchHighlightService {
    constructor() { }
}
SearchHighlightService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SearchHighlightService.ctorParameters = () => [];
/** @nocollapse */ SearchHighlightService.ngInjectableDef = defineInjectable({ factory: function SearchHighlightService_Factory() { return new SearchHighlightService(); }, token: SearchHighlightService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SearchHighlightComponent {
    /**
     * @param {?} store
     * @param {?} alfrescoApiService
     * @param {?} router
     */
    constructor(store, alfrescoApiService, router) {
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
    ngOnInit() {
        this.updateValues();
        this.alfrescoApiService.nodeUpdated
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((node) => {
            /** @type {?} */
            const row = this.context.row;
            if (row) {
                const { entry } = row.node;
                if (entry.id === node.id) {
                    entry.name = node.name;
                    entry.properties = Object.assign({}, node.properties);
                    entry.search = Object.assign({}, node.search);
                    this.updateValues();
                }
            }
        });
    }
    /**
     * @private
     * @return {?}
     */
    updateValues() {
        this.node = this.context.row.node;
        /** @type {?} */
        const highlightAll = (this.node.entry['search'] && this.node.entry['search']['highlight']) ? this.node.entry['search']['highlight'] : [];
        const { name, properties } = this.node.entry;
        /** @type {?} */
        const title = properties ? properties['cm:title'] : '';
        this.name$.next(name);
        if (title !== name) {
            this.title$.next(title ? `( ${title} )` : '');
        }
        highlightAll.forEach(elem => {
            if (elem.field === "cm:name") {
                this.name$.next(elem.snippets[0]);
            }
            if (elem.field === "cm:title" && title !== name) {
                this.title$.next(`( ${elem.snippets[0]} )`);
            }
            if (elem.field === "cm:content") {
                this.highlight = elem.snippets;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }
    /**
     * @return {?}
     */
    get description() {
        const { properties } = this.node.entry;
        return properties ? properties['cm:description'] : '';
    }
    /**
     * @return {?}
     */
    get modifiedAt() {
        return this.node.entry.modifiedAt;
    }
    /**
     * @return {?}
     */
    get size() {
        const { content } = this.node.entry;
        return content ? content.sizeInBytes : null;
    }
    /**
     * @return {?}
     */
    get user() {
        return this.node.entry.modifiedByUser.displayName;
    }
    /**
     * @return {?}
     */
    get isFile() {
        return this.node.entry.isFile;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    showPreview(event) {
        event.stopPropagation();
        this.store.dispatch(new ViewNodeAction(this.node.entry.id, { location: this.router.url }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    navigate(event) {
        event.stopPropagation();
        this.store.dispatch(new NavigateToFolder(this.node));
    }
}
SearchHighlightComponent.decorators = [
    { type: Component, args: [{
                selector: 'aca-search-results-row-highlight',
                encapsulation: ViewEncapsulation.None,
                template: "<div class=\"line\">\n    <span tabindex=\"0\" role=\"link\" *ngIf=\"isFile\" (click)=\"showPreview($event)\" (keyup.enter)=\"showPreview($event)\"\n        class=\"link\" innerHTML=\" {{ name$ | async }}\">\n       \n    </span>\n    <span tabindex=\"0\" role=\"link\" *ngIf=\"!isFile\" (click)=\"navigate($event)\" (keyup.enter)=\"navigate($event)\"\n        class=\"bold link\" innerHTML=\" {{ name$ | async }}\">\n    \n    </span>\n    <span  innerHTML=\" {{ title$ | async }}\"></span>\n</div>\n\n<div *ngIf=\"description\" class=\"line\">{{ description }}</div>\n\n<div class=\"line\">\n    {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.MODIFIED' | translate }}:\n    {{ modifiedAt | date: 'medium' }}\n    {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.BY_USER' | translate: { user: user } }}\n\n    <span *ngIf=\"size\">| {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.SIZE' | translate }}:\n        {{ size | adfFileSize }}\n    </span>\n</div>\n\n<ng-container  *ngTemplateOutlet=\"locationField\">\n    {{ 'APP.BROWSE.SEARCH.CUSTOM_ROW.LOCATION' | translate }}:\n</ng-container>\n\n<div class=\"line\" *ngIf=\"highlight\">\n    ...<span *ngFor=\"let high of highlight\" [innerHTML]=\"high\"></span>...\n</div>",
                styles: [""]
            }] }
];
/** @nocollapse */
SearchHighlightComponent.ctorParameters = () => [
    { type: Store },
    { type: AlfrescoApiService },
    { type: Router }
];
SearchHighlightComponent.propDecorators = {
    context: [{ type: Input }],
    locationField: [{ type: Input }]
};

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
class AdfModule {
}
AdfModule.decorators = [
    { type: NgModule, args: [{
                imports: modules(),
                exports: modules()
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SearchHighlightModule {
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