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
/**
 * @record
 */
export function AppState() { }
if (false) {
    /** @type {?} */
    AppState.prototype.appName;
    /** @type {?} */
    AppState.prototype.headerColor;
    /** @type {?} */
    AppState.prototype.logoPath;
    /** @type {?} */
    AppState.prototype.languagePicker;
    /** @type {?} */
    AppState.prototype.sharedUrl;
    /** @type {?} */
    AppState.prototype.selection;
    /** @type {?} */
    AppState.prototype.user;
    /** @type {?} */
    AppState.prototype.navigation;
    /** @type {?} */
    AppState.prototype.infoDrawerOpened;
    /** @type {?} */
    AppState.prototype.infoDrawerMetadataAspect;
    /** @type {?} */
    AppState.prototype.showFacetFilter;
    /** @type {?} */
    AppState.prototype.documentDisplayMode;
    /** @type {?} */
    AppState.prototype.repository;
}
/**
 * @record
 */
export function AppStore() { }
if (false) {
    /** @type {?} */
    AppStore.prototype.app;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFsZnJlc2NvL2FjYS1zaGFyZWQvc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZXMvYXBwLnN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ0EsOEJBY0M7OztJQWJDLDJCQUFnQjs7SUFDaEIsK0JBQW9COztJQUNwQiw0QkFBaUI7O0lBQ2pCLGtDQUF3Qjs7SUFDeEIsNkJBQWtCOztJQUNsQiw2QkFBMEI7O0lBQzFCLHdCQUFtQjs7SUFDbkIsOEJBQTRCOztJQUM1QixvQ0FBMEI7O0lBQzFCLDRDQUFpQzs7SUFDakMsbUNBQXlCOztJQUN6Qix1Q0FBNEI7O0lBQzVCLDhCQUEyQjs7Ozs7QUFHN0IsOEJBRUM7OztJQURDLHVCQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uXG4gKlxuICogQ29weXJpZ2h0IChDKSAyMDA1IC0gMjAyMCBBbGZyZXNjbyBTb2Z0d2FyZSBMaW1pdGVkXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvbi5cbiAqIElmIHRoZSBzb2Z0d2FyZSB3YXMgcHVyY2hhc2VkIHVuZGVyIGEgcGFpZCBBbGZyZXNjbyBsaWNlbnNlLCB0aGUgdGVybXMgb2ZcbiAqIHRoZSBwYWlkIGxpY2Vuc2UgYWdyZWVtZW50IHdpbGwgcHJldmFpbC4gIE90aGVyd2lzZSwgdGhlIHNvZnR3YXJlIGlzXG4gKiBwcm92aWRlZCB1bmRlciB0aGUgZm9sbG93aW5nIG9wZW4gc291cmNlIGxpY2Vuc2UgdGVybXM6XG4gKlxuICogVGhlIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvbiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoZSBBbGZyZXNjbyBFeGFtcGxlIENvbnRlbnQgQXBwbGljYXRpb24gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWxmcmVzY28uIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQge1xuICBTZWxlY3Rpb25TdGF0ZSxcbiAgUHJvZmlsZVN0YXRlLFxuICBOYXZpZ2F0aW9uU3RhdGVcbn0gZnJvbSAnQGFsZnJlc2NvL2FkZi1leHRlbnNpb25zJztcbmltcG9ydCB7IFJlcG9zaXRvcnlJbmZvIH0gZnJvbSAnQGFsZnJlc2NvL2pzLWFwaSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwU3RhdGUge1xuICBhcHBOYW1lOiBzdHJpbmc7XG4gIGhlYWRlckNvbG9yOiBzdHJpbmc7XG4gIGxvZ29QYXRoOiBzdHJpbmc7XG4gIGxhbmd1YWdlUGlja2VyOiBib29sZWFuO1xuICBzaGFyZWRVcmw6IHN0cmluZztcbiAgc2VsZWN0aW9uOiBTZWxlY3Rpb25TdGF0ZTtcbiAgdXNlcjogUHJvZmlsZVN0YXRlO1xuICBuYXZpZ2F0aW9uOiBOYXZpZ2F0aW9uU3RhdGU7XG4gIGluZm9EcmF3ZXJPcGVuZWQ6IGJvb2xlYW47XG4gIGluZm9EcmF3ZXJNZXRhZGF0YUFzcGVjdDogc3RyaW5nO1xuICBzaG93RmFjZXRGaWx0ZXI6IGJvb2xlYW47XG4gIGRvY3VtZW50RGlzcGxheU1vZGU6IHN0cmluZztcbiAgcmVwb3NpdG9yeTogUmVwb3NpdG9yeUluZm87XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwU3RvcmUge1xuICBhcHA6IEFwcFN0YXRlO1xufVxuIl19