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
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function DefaultExtensionLoaderFactory() {
    return [];
}
/** @type {?} */
export const EXTENSION_DATA_LOADERS = new InjectionToken('EXTENSION_DATA_LOADERS', {
    providedIn: 'root',
    factory: DefaultExtensionLoaderFactory
});
export class ExtensionsDataLoaderGuard {
    /**
     * @param {?} extensionDataLoaders
     */
    constructor(extensionDataLoaders) {
        this.extensionDataLoaders = extensionDataLoaders;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    canActivate(route) {
        if (!this.extensionDataLoaders.length) {
            return of(true);
        }
        /** @type {?} */
        const dataLoaderCallbacks = this.extensionDataLoaders.map(callback => callback(route));
        // Undocumented forkJoin behaviour/bug:
        // https://github.com/ReactiveX/rxjs/issues/3246
        // So all callbacks need to emit before completion, otherwise forkJoin will short circuit
        return forkJoin(...dataLoaderCallbacks).pipe(map(() => true), catchError(e => {
            // tslint:disable-next-line
            console.error('Some of the extension data loader guards has been errored.');
            // tslint:disable-next-line
            console.error(e);
            return of(true);
        }));
    }
}
ExtensionsDataLoaderGuard.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ExtensionsDataLoaderGuard.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [EXTENSION_DATA_LOADERS,] }] }
];
/** @nocollapse */ ExtensionsDataLoaderGuard.ngInjectableDef = i0.defineInjectable({ factory: function ExtensionsDataLoaderGuard_Factory() { return new ExtensionsDataLoaderGuard(i0.inject(EXTENSION_DATA_LOADERS)); }, token: ExtensionsDataLoaderGuard, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    ExtensionsDataLoaderGuard.prototype.extensionDataLoaders;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9ucy1kYXRhLWxvYWRlci5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbGZyZXNjby9hY2Etc2hhcmVkLyIsInNvdXJjZXMiOlsibGliL2FkZi1leHRlbnNpb25zL2V4dGVuc2lvbnMtZGF0YS1sb2FkZXIuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkUsT0FBTyxFQUFjLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFNakQsTUFBTSxVQUFVLDZCQUE2QjtJQUMzQyxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7O0FBRUQsTUFBTSxPQUFPLHNCQUFzQixHQUFHLElBQUksY0FBYyxDQUV0RCx3QkFBd0IsRUFBRTtJQUMxQixVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsNkJBQTZCO0NBQ3ZDLENBQUM7QUFHRixNQUFNLE9BQU8seUJBQXlCOzs7O0lBQ3BDLFlBRVUsb0JBQStDO1FBQS9DLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBMkI7SUFDdEQsQ0FBQzs7Ozs7SUFFSixXQUFXLENBQUMsS0FBNkI7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7WUFDckMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7O2NBRUssbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUNuRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQ2hCO1FBRUQsdUNBQXVDO1FBQ3ZDLGdEQUFnRDtRQUNoRCx5RkFBeUY7UUFDekYsT0FBTyxRQUFRLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FDMUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUNmLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLDJCQUEyQjtZQUMzQixPQUFPLENBQUMsS0FBSyxDQUNYLDREQUE0RCxDQUM3RCxDQUFDO1lBQ0YsMkJBQTJCO1lBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OztZQS9CRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7O3dDQUc3QixNQUFNLFNBQUMsc0JBQXNCOzs7Ozs7OztJQUE5Qix5REFDdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBBbGZyZXNjbyBFeGFtcGxlIENvbnRlbnQgQXBwbGljYXRpb25cbiAqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMDUgLSAyMDIwIEFsZnJlc2NvIFNvZnR3YXJlIExpbWl0ZWRcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uLlxuICogSWYgdGhlIHNvZnR3YXJlIHdhcyBwdXJjaGFzZWQgdW5kZXIgYSBwYWlkIEFsZnJlc2NvIGxpY2Vuc2UsIHRoZSB0ZXJtcyBvZlxuICogdGhlIHBhaWQgbGljZW5zZSBhZ3JlZW1lbnQgd2lsbCBwcmV2YWlsLiAgT3RoZXJ3aXNlLCB0aGUgc29mdHdhcmUgaXNcbiAqIHByb3ZpZGVkIHVuZGVyIHRoZSBmb2xsb3dpbmcgb3BlbiBzb3VyY2UgbGljZW5zZSB0ZXJtczpcbiAqXG4gKiBUaGUgQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhlIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvbiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBbGZyZXNjby4gSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZvcmtKb2luLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgdHlwZSBFeHRlbnNpb25Mb2FkZXJDYWxsYmFjayA9IChcbiAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3RcbikgPT4gT2JzZXJ2YWJsZTx0cnVlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIERlZmF1bHRFeHRlbnNpb25Mb2FkZXJGYWN0b3J5KCkge1xuICByZXR1cm4gW107XG59XG5cbmV4cG9ydCBjb25zdCBFWFRFTlNJT05fREFUQV9MT0FERVJTID0gbmV3IEluamVjdGlvblRva2VuPFxuICBFeHRlbnNpb25Mb2FkZXJDYWxsYmFja1tdXG4+KCdFWFRFTlNJT05fREFUQV9MT0FERVJTJywge1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIGZhY3Rvcnk6IERlZmF1bHRFeHRlbnNpb25Mb2FkZXJGYWN0b3J5XG59KTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25zRGF0YUxvYWRlckd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVYVEVOU0lPTl9EQVRBX0xPQURFUlMpXG4gICAgcHJpdmF0ZSBleHRlbnNpb25EYXRhTG9hZGVyczogRXh0ZW5zaW9uTG9hZGVyQ2FsbGJhY2tbXVxuICApIHt9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMuZXh0ZW5zaW9uRGF0YUxvYWRlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YUxvYWRlckNhbGxiYWNrcyA9IHRoaXMuZXh0ZW5zaW9uRGF0YUxvYWRlcnMubWFwKGNhbGxiYWNrID0+XG4gICAgICBjYWxsYmFjayhyb3V0ZSlcbiAgICApO1xuXG4gICAgLy8gVW5kb2N1bWVudGVkIGZvcmtKb2luIGJlaGF2aW91ci9idWc6XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0aXZlWC9yeGpzL2lzc3Vlcy8zMjQ2XG4gICAgLy8gU28gYWxsIGNhbGxiYWNrcyBuZWVkIHRvIGVtaXQgYmVmb3JlIGNvbXBsZXRpb24sIG90aGVyd2lzZSBmb3JrSm9pbiB3aWxsIHNob3J0IGNpcmN1aXRcbiAgICByZXR1cm4gZm9ya0pvaW4oLi4uZGF0YUxvYWRlckNhbGxiYWNrcykucGlwZShcbiAgICAgIG1hcCgoKSA9PiB0cnVlKSxcbiAgICAgIGNhdGNoRXJyb3IoZSA9PiB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICdTb21lIG9mIHRoZSBleHRlbnNpb24gZGF0YSBsb2FkZXIgZ3VhcmRzIGhhcyBiZWVuIGVycm9yZWQuJ1xuICAgICAgICApO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgcmV0dXJuIG9mKHRydWUpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=