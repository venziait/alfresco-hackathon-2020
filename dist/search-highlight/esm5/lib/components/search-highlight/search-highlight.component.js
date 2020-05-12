/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2020 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */
import { Component, Input, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ViewNodeAction, NavigateToFolder } from '@alfresco/aca-shared/store';
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
export { SearchHighlightComponent };
if (false) {
    /** @type {?} */
    SearchHighlightComponent.prototype.context;
    /** @type {?} */
    SearchHighlightComponent.prototype.locationField;
    /**
     * @type {?}
     * @private
     */
    SearchHighlightComponent.prototype.node;
    /**
     * @type {?}
     * @private
     */
    SearchHighlightComponent.prototype.onDestroy$;
    /** @type {?} */
    SearchHighlightComponent.prototype.name$;
    /** @type {?} */
    SearchHighlightComponent.prototype.title$;
    /** @type {?} */
    SearchHighlightComponent.prototype.highlight;
    /**
     * @type {?}
     * @private
     */
    SearchHighlightComponent.prototype.store;
    /**
     * @type {?}
     * @private
     */
    SearchHighlightComponent.prototype.alfrescoApiService;
    /**
     * @type {?}
     * @private
     */
    SearchHighlightComponent.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWhpZ2hsaWdodC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZWFyY2gtaGlnaGxpZ2h0LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2VhcmNoLWhpZ2hsaWdodC9zZWFyY2gtaGlnaGxpZ2h0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLGlCQUFpQixFQUFhLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzlFO0lBb0JFLGtDQUNVLEtBQWlCLEVBQ2pCLGtCQUFzQyxFQUN0QyxNQUFjO1FBRmQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFSaEIsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDNUMsVUFBSyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQU9uQyxDQUFDOzs7O0lBRVAsMkNBQVE7OztJQUFSO1FBQUEsaUJBbUJDO1FBakJDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FB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QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsd3FDQUFnRDs7aUJBRWpEOzs7O2dCQVZRLEtBQUs7Z0JBSkwsa0JBQWtCO2dCQUtsQixNQUFNOzs7MEJBWVosS0FBSztnQ0FHTCxLQUFLOztJQXdHUiwrQkFBQztDQUFBLEFBbkhELElBbUhDO1NBN0dZLHdCQUF3Qjs7O0lBRW5DLDJDQUNhOztJQUViLGlEQUNnQzs7Ozs7SUFFaEMsd0NBQWdDOzs7OztJQUNoQyw4Q0FBNEM7O0lBQzVDLHlDQUF3Qzs7SUFDeEMsMENBQXlDOztJQUN6Qyw2Q0FBYzs7Ozs7SUFHWix5Q0FBeUI7Ozs7O0lBQ3pCLHNEQUE4Qzs7Ozs7SUFDOUMsMENBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uXG4gKlxuICogQ29weXJpZ2h0IChDKSAyMDA1IC0gMjAyMCBBbGZyZXNjbyBTb2Z0d2FyZSBMaW1pdGVkXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvbi5cbiAqIElmIHRoZSBzb2Z0d2FyZSB3YXMgcHVyY2hhc2VkIHVuZGVyIGEgcGFpZCBBbGZyZXNjbyBsaWNlbnNlLCB0aGUgdGVybXMgb2ZcbiAqIHRoZSBwYWlkIGxpY2Vuc2UgYWdyZWVtZW50IHdpbGwgcHJldmFpbC4gIE90aGVyd2lzZSwgdGhlIHNvZnR3YXJlIGlzXG4gKiBwcm92aWRlZCB1bmRlciB0aGUgZm9sbG93aW5nIG9wZW4gc291cmNlIGxpY2Vuc2UgdGVybXM6XG4gKlxuICogVGhlIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvbiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoZSBBbGZyZXNjbyBFeGFtcGxlIENvbnRlbnQgQXBwbGljYXRpb24gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWxmcmVzY28uIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkRlc3Ryb3ksIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFsZnJlc2NvQXBpU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5cbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1pbmltYWxOb2RlRW50aXR5IH0gZnJvbSAnQGFsZnJlc2NvL2pzLWFwaSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBWaWV3Tm9kZUFjdGlvbiwgTmF2aWdhdGVUb0ZvbGRlciB9IGZyb20gJ0BhbGZyZXNjby9hY2Etc2hhcmVkL3N0b3JlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhY2Etc2VhcmNoLXJlc3VsdHMtcm93LWhpZ2hsaWdodCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtaGlnaGxpZ2h0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLWhpZ2hsaWdodC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaEhpZ2hsaWdodENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKVxuICBjb250ZXh0OiBhbnk7XG5cbiAgQElucHV0KClcbiAgbG9jYXRpb25GaWVsZDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBwcml2YXRlIG5vZGU6IE1pbmltYWxOb2RlRW50aXR5O1xuICBwcml2YXRlIG9uRGVzdHJveSQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICBuYW1lJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHRpdGxlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGhpZ2hsaWdodDogW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8YW55PixcbiAgICBwcml2YXRlIGFsZnJlc2NvQXBpU2VydmljZTogQWxmcmVzY29BcGlTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIFxuICAgIHRoaXMudXBkYXRlVmFsdWVzKCk7XG5cbiAgICB0aGlzLmFsZnJlc2NvQXBpU2VydmljZS5ub2RlVXBkYXRlZFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMub25EZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChub2RlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5jb250ZXh0LnJvdztcbiAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgIGNvbnN0IHsgZW50cnkgfSA9IHJvdy5ub2RlO1xuXG4gICAgICAgICAgaWYgKGVudHJ5LmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgICAgICBlbnRyeS5uYW1lID0gbm9kZS5uYW1lO1xuICAgICAgICAgICAgZW50cnkucHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIG5vZGUucHJvcGVydGllcyk7XG4gICAgICAgICAgICBlbnRyeS5zZWFyY2ggPSBPYmplY3QuYXNzaWduKHt9LCBub2RlLnNlYXJjaCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVZhbHVlcygpIHtcblxuICAgIHRoaXMubm9kZSA9IHRoaXMuY29udGV4dC5yb3cubm9kZTtcblxuICAgIGNvbnN0IGhpZ2hsaWdodEFsbCA9ICh0aGlzLm5vZGUuZW50cnlbJ3NlYXJjaCddICYmIHRoaXMubm9kZS5lbnRyeVsnc2VhcmNoJ11bJ2hpZ2hsaWdodCddKSA/IHRoaXMubm9kZS5lbnRyeVsnc2VhcmNoJ11bJ2hpZ2hsaWdodCddIDogW107XG5cbiAgICBjb25zdCB7IG5hbWUsIHByb3BlcnRpZXMgfSA9IHRoaXMubm9kZS5lbnRyeTtcbiAgICBjb25zdCB0aXRsZSA9IHByb3BlcnRpZXMgPyBwcm9wZXJ0aWVzWydjbTp0aXRsZSddIDogJyc7XG5cbiAgICB0aGlzLm5hbWUkLm5leHQobmFtZSk7XG5cbiAgICBpZiAodGl0bGUgIT09IG5hbWUpIHtcbiAgICAgIHRoaXMudGl0bGUkLm5leHQodGl0bGUgPyBgKCAke3RpdGxlfSApYCA6ICcnKTtcbiAgICB9XG5cbiAgICBoaWdobGlnaHRBbGwuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgIGlmIChlbGVtLmZpZWxkID09PSBcImNtOm5hbWVcIikge1xuICAgICAgICB0aGlzLm5hbWUkLm5leHQoZWxlbS5zbmlwcGV0c1swXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtLmZpZWxkID09PSBcImNtOnRpdGxlXCIgJiYgdGl0bGUgIT09IG5hbWUpIHtcbiAgICAgICAgdGhpcy50aXRsZSQubmV4dChgKCAke2VsZW0uc25pcHBldHNbMF19IClgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW0uZmllbGQgPT09IFwiY206Y29udGVudFwiKSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ID0gZWxlbS5zbmlwcGV0cztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMub25EZXN0cm95JC5uZXh0KHRydWUpO1xuICAgIHRoaXMub25EZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgY29uc3QgeyBwcm9wZXJ0aWVzIH0gPSB0aGlzLm5vZGUuZW50cnk7XG4gICAgcmV0dXJuIHByb3BlcnRpZXMgPyBwcm9wZXJ0aWVzWydjbTpkZXNjcmlwdGlvbiddIDogJyc7XG4gIH1cblxuICBnZXQgbW9kaWZpZWRBdCgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmVudHJ5Lm1vZGlmaWVkQXQ7XG4gIH1cblxuICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIGNvbnN0IHsgY29udGVudCB9ID0gdGhpcy5ub2RlLmVudHJ5O1xuICAgIHJldHVybiBjb250ZW50ID8gY29udGVudC5zaXplSW5CeXRlcyA6IG51bGw7XG4gIH1cblxuICBnZXQgdXNlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGUuZW50cnkubW9kaWZpZWRCeVVzZXIuZGlzcGxheU5hbWU7XG4gIH1cblxuICBnZXQgaXNGaWxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGUuZW50cnkuaXNGaWxlO1xuICB9XG5cbiAgc2hvd1ByZXZpZXcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgbmV3IFZpZXdOb2RlQWN0aW9uKHRoaXMubm9kZS5lbnRyeS5pZCwgeyBsb2NhdGlvbjogdGhpcy5yb3V0ZXIudXJsIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5hdmlnYXRlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgTmF2aWdhdGVUb0ZvbGRlcih0aGlzLm5vZGUpKTtcbiAgfVxufVxuIl19