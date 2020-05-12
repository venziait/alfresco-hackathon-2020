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
import { Directive, HostListener, Input } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ContextMenu } from '@alfresco/aca-shared/store';
export class ContextActionsDirective {
    /**
     * @param {?} store
     */
    constructor(store) {
        this.store = store;
        this.execute$ = new Subject();
        this.onDestroy$ = new Subject();
        // tslint:disable-next-line:no-input-rename
        this.enabled = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onContextMenuEvent(event) {
        if (event) {
            event.preventDefault();
            if (this.enabled) {
                /** @type {?} */
                const target = this.getTarget(event);
                if (target) {
                    this.execute(event, target);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.execute$
            .pipe(debounceTime(300), takeUntil(this.onDestroy$))
            .subscribe((event) => {
            this.store.dispatch(new ContextMenu(event));
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
     * @param {?} event
     * @param {?} target
     * @return {?}
     */
    execute(event, target) {
        if (!this.isSelected(target)) {
            target.dispatchEvent(new MouseEvent('click'));
        }
        this.execute$.next(event);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    getTarget(event) {
        /** @type {?} */
        const target = (/** @type {?} */ (event.target));
        return this.findAncestor(target, 'adf-datatable-cell');
    }
    /**
     * @private
     * @param {?} target
     * @return {?}
     */
    isSelected(target) {
        if (!target) {
            return false;
        }
        return this.findAncestor(target, 'adf-datatable-row').classList.contains('adf-is-selected');
    }
    /**
     * @private
     * @param {?} el
     * @param {?} className
     * @return {?}
     */
    findAncestor(el, className) {
        if (el.classList.contains(className)) {
            return el;
        }
        // tslint:disable-next-line:curly
        while ((el = el.parentElement) && !el.classList.contains(className))
            ;
        return el;
    }
}
ContextActionsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[acaContextActions]',
                exportAs: 'acaContextActions'
            },] }
];
/** @nocollapse */
ContextActionsDirective.ctorParameters = () => [
    { type: Store }
];
ContextActionsDirective.propDecorators = {
    enabled: [{ type: Input, args: ['acaContextEnable',] }],
    onContextMenuEvent: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextActionsDirective.prototype.execute$;
    /** @type {?} */
    ContextActionsDirective.prototype.onDestroy$;
    /** @type {?} */
    ContextActionsDirective.prototype.enabled;
    /**
     * @type {?}
     * @private
     */
    ContextActionsDirective.prototype.store;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dG1lbnUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFsZnJlc2NvL2FjYS1zaGFyZWQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jb250ZXh0bWVudS9jb250ZXh0bWVudS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFZLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTW5FLE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFzQmxDLFlBQW9CLEtBQXNCO1FBQXRCLFVBQUssR0FBTCxLQUFLLENBQWlCO1FBckJsQyxhQUFRLEdBQWlCLElBQUksT0FBTyxFQUFFLENBQUM7UUFDL0MsZUFBVSxHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDOztRQUl0RCxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBZ0I4QixDQUFDOzs7OztJQWI5QyxrQkFBa0IsQ0FBQyxLQUFpQjtRQUNsQyxJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV2QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7O3NCQUNWLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFDcEMsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzdCO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7SUFJRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVE7YUFDVixJQUFJLENBQ0gsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUMzQjthQUNBLFNBQVMsQ0FBQyxDQUFDLEtBQWlCLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7OztJQUVELE9BQU8sQ0FBQyxLQUFpQixFQUFFLE1BQWU7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBRU8sU0FBUyxDQUFDLEtBQWlCOztjQUMzQixNQUFNLEdBQUcsbUJBQUEsS0FBSyxDQUFDLE1BQU0sRUFBVztRQUN0QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7O0lBRU8sVUFBVSxDQUFDLE1BQWU7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDdEUsaUJBQWlCLENBQ2xCLENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRU8sWUFBWSxDQUFDLEVBQVcsRUFBRSxTQUFpQjtRQUNqRCxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxpQ0FBaUM7UUFDakMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFBQyxDQUFDO1FBQ3JFLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7O1lBMUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsbUJBQW1CO2FBQzlCOzs7O1lBTlEsS0FBSzs7O3NCQVlYLEtBQUssU0FBQyxrQkFBa0I7aUNBR3hCLFlBQVksU0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7SUFQdkMsMkNBQStDOztJQUMvQyw2Q0FBc0Q7O0lBR3RELDBDQUNlOzs7OztJQWdCSCx3Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBBbGZyZXNjbyBFeGFtcGxlIENvbnRlbnQgQXBwbGljYXRpb25cbiAqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMDUgLSAyMDIwIEFsZnJlc2NvIFNvZnR3YXJlIExpbWl0ZWRcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uLlxuICogSWYgdGhlIHNvZnR3YXJlIHdhcyBwdXJjaGFzZWQgdW5kZXIgYSBwYWlkIEFsZnJlc2NvIGxpY2Vuc2UsIHRoZSB0ZXJtcyBvZlxuICogdGhlIHBhaWQgbGljZW5zZSBhZ3JlZW1lbnQgd2lsbCBwcmV2YWlsLiAgT3RoZXJ3aXNlLCB0aGUgc29mdHdhcmUgaXNcbiAqIHByb3ZpZGVkIHVuZGVyIHRoZSBmb2xsb3dpbmcgb3BlbiBzb3VyY2UgbGljZW5zZSB0ZXJtczpcbiAqXG4gKiBUaGUgQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhlIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvbiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBbGZyZXNjby4gSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQXBwU3RvcmUsIENvbnRleHRNZW51IH0gZnJvbSAnQGFsZnJlc2NvL2FjYS1zaGFyZWQvc3RvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYWNhQ29udGV4dEFjdGlvbnNdJyxcbiAgZXhwb3J0QXM6ICdhY2FDb250ZXh0QWN0aW9ucydcbn0pXG5leHBvcnQgY2xhc3MgQ29udGV4dEFjdGlvbnNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZXhlY3V0ZSQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gIG9uRGVzdHJveSQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdhY2FDb250ZXh0RW5hYmxlJylcbiAgZW5hYmxlZCA9IHRydWU7XG5cbiAgQEhvc3RMaXN0ZW5lcignY29udGV4dG1lbnUnLCBbJyRldmVudCddKVxuICBvbkNvbnRleHRNZW51RXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRUYXJnZXQoZXZlbnQpO1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgdGhpcy5leGVjdXRlKGV2ZW50LCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmU8QXBwU3RvcmU+KSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXhlY3V0ZSRcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMub25EZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IENvbnRleHRNZW51KGV2ZW50KSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMub25EZXN0cm95JC5uZXh0KHRydWUpO1xuICAgIHRoaXMub25EZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgZXhlY3V0ZShldmVudDogTW91c2VFdmVudCwgdGFyZ2V0OiBFbGVtZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuICAgIH1cblxuICAgIHRoaXMuZXhlY3V0ZSQubmV4dChldmVudCk7XG4gIH1cblxuICBwcml2YXRlIGdldFRhcmdldChldmVudDogTW91c2VFdmVudCk6IEVsZW1lbnQge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBFbGVtZW50O1xuICAgIHJldHVybiB0aGlzLmZpbmRBbmNlc3Rvcih0YXJnZXQsICdhZGYtZGF0YXRhYmxlLWNlbGwnKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNTZWxlY3RlZCh0YXJnZXQ6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmZpbmRBbmNlc3Rvcih0YXJnZXQsICdhZGYtZGF0YXRhYmxlLXJvdycpLmNsYXNzTGlzdC5jb250YWlucyhcbiAgICAgICdhZGYtaXMtc2VsZWN0ZWQnXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZEFuY2VzdG9yKGVsOiBFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y3VybHlcbiAgICB3aGlsZSAoKGVsID0gZWwucGFyZW50RWxlbWVudCkgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbn1cbiJdfQ==