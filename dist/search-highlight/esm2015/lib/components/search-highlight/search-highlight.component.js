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
export class SearchHighlightComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWhpZ2hsaWdodC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zZWFyY2gtaGlnaGxpZ2h0LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2VhcmNoLWhpZ2hsaWdodC9zZWFyY2gtaGlnaGxpZ2h0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLGlCQUFpQixFQUFhLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBUzlFLE1BQU0sT0FBTyx3QkFBd0I7Ozs7OztJQWNuQyxZQUNVLEtBQWlCLEVBQ2pCLGtCQUFzQyxFQUN0QyxNQUFjO1FBRmQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFSaEIsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDNUMsVUFBSyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQU9uQyxDQUFDOzs7O0lBRVAsUUFBUTtRQUVOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FB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a0NBQWtDO2dCQUM1QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsd3FDQUFnRDs7YUFFakQ7Ozs7WUFWUSxLQUFLO1lBSkwsa0JBQWtCO1lBS2xCLE1BQU07OztzQkFZWixLQUFLOzRCQUdMLEtBQUs7Ozs7SUFITiwyQ0FDYTs7SUFFYixpREFDZ0M7Ozs7O0lBRWhDLHdDQUFnQzs7Ozs7SUFDaEMsOENBQTRDOztJQUM1Qyx5Q0FBd0M7O0lBQ3hDLDBDQUF5Qzs7SUFDekMsNkNBQWM7Ozs7O0lBR1oseUNBQXlCOzs7OztJQUN6QixzREFBOEM7Ozs7O0lBQzlDLDBDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvblxuICpcbiAqIENvcHlyaWdodCAoQykgMjAwNSAtIDIwMjAgQWxmcmVzY28gU29mdHdhcmUgTGltaXRlZFxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBbGZyZXNjbyBFeGFtcGxlIENvbnRlbnQgQXBwbGljYXRpb24uXG4gKiBJZiB0aGUgc29mdHdhcmUgd2FzIHB1cmNoYXNlZCB1bmRlciBhIHBhaWQgQWxmcmVzY28gbGljZW5zZSwgdGhlIHRlcm1zIG9mXG4gKiB0aGUgcGFpZCBsaWNlbnNlIGFncmVlbWVudCB3aWxsIHByZXZhaWwuICBPdGhlcndpc2UsIHRoZSBzb2Z0d2FyZSBpc1xuICogcHJvdmlkZWQgdW5kZXIgdGhlIGZvbGxvd2luZyBvcGVuIHNvdXJjZSBsaWNlbnNlIHRlcm1zOlxuICpcbiAqIFRoZSBBbGZyZXNjbyBFeGFtcGxlIENvbnRlbnQgQXBwbGljYXRpb24gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGUgQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFsZnJlc2NvLiBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBbGZyZXNjb0FwaVNlcnZpY2UgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNaW5pbWFsTm9kZUVudGl0eSB9IGZyb20gJ0BhbGZyZXNjby9qcy1hcGknO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVmlld05vZGVBY3Rpb24sIE5hdmlnYXRlVG9Gb2xkZXIgfSBmcm9tICdAYWxmcmVzY28vYWNhLXNoYXJlZC9zdG9yZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWNhLXNlYXJjaC1yZXN1bHRzLXJvdy1oaWdobGlnaHQnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLWhpZ2hsaWdodC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1oaWdobGlnaHQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hIaWdobGlnaHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KClcbiAgY29udGV4dDogYW55O1xuXG4gIEBJbnB1dCgpXG4gIGxvY2F0aW9uRmllbGQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgcHJpdmF0ZSBub2RlOiBNaW5pbWFsTm9kZUVudGl0eTtcbiAgcHJpdmF0ZSBvbkRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgbmFtZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB0aXRsZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBoaWdobGlnaHQ6IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4sXG4gICAgcHJpdmF0ZSBhbGZyZXNjb0FwaVNlcnZpY2U6IEFsZnJlc2NvQXBpU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBcbiAgICB0aGlzLnVwZGF0ZVZhbHVlcygpO1xuXG4gICAgdGhpcy5hbGZyZXNjb0FwaVNlcnZpY2Uubm9kZVVwZGF0ZWRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm9uRGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgobm9kZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuY29udGV4dC5yb3c7XG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICBjb25zdCB7IGVudHJ5IH0gPSByb3cubm9kZTtcblxuICAgICAgICAgIGlmIChlbnRyeS5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICAgICAgZW50cnkubmFtZSA9IG5vZGUubmFtZTtcbiAgICAgICAgICAgIGVudHJ5LnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHt9LCBub2RlLnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgZW50cnkuc2VhcmNoID0gT2JqZWN0LmFzc2lnbih7fSwgbm9kZS5zZWFyY2gpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZXMoKSB7XG5cbiAgICB0aGlzLm5vZGUgPSB0aGlzLmNvbnRleHQucm93Lm5vZGU7XG5cbiAgICBjb25zdCBoaWdobGlnaHRBbGwgPSAodGhpcy5ub2RlLmVudHJ5WydzZWFyY2gnXSAmJiB0aGlzLm5vZGUuZW50cnlbJ3NlYXJjaCddWydoaWdobGlnaHQnXSkgPyB0aGlzLm5vZGUuZW50cnlbJ3NlYXJjaCddWydoaWdobGlnaHQnXSA6IFtdO1xuXG4gICAgY29uc3QgeyBuYW1lLCBwcm9wZXJ0aWVzIH0gPSB0aGlzLm5vZGUuZW50cnk7XG4gICAgY29uc3QgdGl0bGUgPSBwcm9wZXJ0aWVzID8gcHJvcGVydGllc1snY206dGl0bGUnXSA6ICcnO1xuXG4gICAgdGhpcy5uYW1lJC5uZXh0KG5hbWUpO1xuXG4gICAgaWYgKHRpdGxlICE9PSBuYW1lKSB7XG4gICAgICB0aGlzLnRpdGxlJC5uZXh0KHRpdGxlID8gYCggJHt0aXRsZX0gKWAgOiAnJyk7XG4gICAgfVxuXG4gICAgaGlnaGxpZ2h0QWxsLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICBpZiAoZWxlbS5maWVsZCA9PT0gXCJjbTpuYW1lXCIpIHtcbiAgICAgICAgdGhpcy5uYW1lJC5uZXh0KGVsZW0uc25pcHBldHNbMF0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbS5maWVsZCA9PT0gXCJjbTp0aXRsZVwiICYmIHRpdGxlICE9PSBuYW1lKSB7XG4gICAgICAgIHRoaXMudGl0bGUkLm5leHQoYCggJHtlbGVtLnNuaXBwZXRzWzBdfSApYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtLmZpZWxkID09PSBcImNtOmNvbnRlbnRcIikge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodCA9IGVsZW0uc25pcHBldHM7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm9uRGVzdHJveSQubmV4dCh0cnVlKTtcbiAgICB0aGlzLm9uRGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgcHJvcGVydGllcyB9ID0gdGhpcy5ub2RlLmVudHJ5O1xuICAgIHJldHVybiBwcm9wZXJ0aWVzID8gcHJvcGVydGllc1snY206ZGVzY3JpcHRpb24nXSA6ICcnO1xuICB9XG5cbiAgZ2V0IG1vZGlmaWVkQXQoKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5lbnRyeS5tb2RpZmllZEF0O1xuICB9XG5cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGNvbnRlbnQgfSA9IHRoaXMubm9kZS5lbnRyeTtcbiAgICByZXR1cm4gY29udGVudCA/IGNvbnRlbnQuc2l6ZUluQnl0ZXMgOiBudWxsO1xuICB9XG5cbiAgZ2V0IHVzZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmVudHJ5Lm1vZGlmaWVkQnlVc2VyLmRpc3BsYXlOYW1lO1xuICB9XG5cbiAgZ2V0IGlzRmlsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmVudHJ5LmlzRmlsZTtcbiAgfVxuXG4gIHNob3dQcmV2aWV3KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBWaWV3Tm9kZUFjdGlvbih0aGlzLm5vZGUuZW50cnkuaWQsIHsgbG9jYXRpb246IHRoaXMucm91dGVyLnVybCB9KVxuICAgICk7XG4gIH1cblxuICBuYXZpZ2F0ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IE5hdmlnYXRlVG9Gb2xkZXIodGhpcy5ub2RlKSk7XG4gIH1cbn1cbiJdfQ==