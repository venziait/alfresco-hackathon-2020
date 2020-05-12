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
/** @enum {string} */
var AppActionTypes = {
    SetSettingsParameter: 'SET_SETTINGS_PARAMETER',
    SetInitialState: 'SET_INITIAL_STATE',
    SetHeaderColor: 'SET_HEADER_COLOR',
    SetCurrentFolder: 'SET_CURRENT_FOLDER',
    SetCurrentUrl: 'SET_CURRENT_URL',
    SetUserProfile: 'SET_USER_PROFILE',
    SetRepositoryInfo: 'SET_REPOSITORY_INFO',
    ToggleInfoDrawer: 'TOGGLE_INFO_DRAWER',
    ToggleDocumentDisplayMode: 'TOGGLE_DOCUMENT_DISPLAY_MODE',
    Logout: 'LOGOUT',
    ReloadDocumentList: 'RELOAD_DOCUMENT_LIST',
    ResetSelection: 'RESET_SELECTION',
    SetInfoDrawerState: 'SET_INFO_DRAWER_STATE',
    SetInfoDrawerMetadataAspect: 'SET_INFO_DRAWER_METADATA_ASPECT',
    CloseModalDialogs: 'CLOSE_MODAL_DIALOGS',
};
export { AppActionTypes };
var SetSettingsParameterAction = /** @class */ (function () {
    function SetSettingsParameterAction(payload) {
        this.payload = payload;
        this.type = AppActionTypes.SetSettingsParameter;
    }
    return SetSettingsParameterAction;
}());
export { SetSettingsParameterAction };
if (false) {
    /** @type {?} */
    SetSettingsParameterAction.prototype.type;
    /** @type {?} */
    SetSettingsParameterAction.prototype.payload;
}
var SetInitialStateAction = /** @class */ (function () {
    function SetInitialStateAction(payload) {
        this.payload = payload;
        this.type = AppActionTypes.SetInitialState;
    }
    return SetInitialStateAction;
}());
export { SetInitialStateAction };
if (false) {
    /** @type {?} */
    SetInitialStateAction.prototype.type;
    /** @type {?} */
    SetInitialStateAction.prototype.payload;
}
var SetHeaderColorAction = /** @class */ (function () {
    function SetHeaderColorAction(color) {
        this.color = color;
        this.type = AppActionTypes.SetHeaderColor;
    }
    return SetHeaderColorAction;
}());
export { SetHeaderColorAction };
if (false) {
    /** @type {?} */
    SetHeaderColorAction.prototype.type;
    /** @type {?} */
    SetHeaderColorAction.prototype.color;
}
var SetCurrentFolderAction = /** @class */ (function () {
    function SetCurrentFolderAction(payload) {
        this.payload = payload;
        this.type = AppActionTypes.SetCurrentFolder;
    }
    return SetCurrentFolderAction;
}());
export { SetCurrentFolderAction };
if (false) {
    /** @type {?} */
    SetCurrentFolderAction.prototype.type;
    /** @type {?} */
    SetCurrentFolderAction.prototype.payload;
}
var SetCurrentUrlAction = /** @class */ (function () {
    function SetCurrentUrlAction(payload) {
        this.payload = payload;
        this.type = AppActionTypes.SetCurrentUrl;
    }
    return SetCurrentUrlAction;
}());
export { SetCurrentUrlAction };
if (false) {
    /** @type {?} */
    SetCurrentUrlAction.prototype.type;
    /** @type {?} */
    SetCurrentUrlAction.prototype.payload;
}
var SetUserProfileAction = /** @class */ (function () {
    function SetUserProfileAction(payload) {
        this.payload = payload;
        this.type = AppActionTypes.SetUserProfile;
    }
    return SetUserProfileAction;
}());
export { SetUserProfileAction };
if (false) {
    /** @type {?} */
    SetUserProfileAction.prototype.type;
    /** @type {?} */
    SetUserProfileAction.prototype.payload;
}
var ToggleInfoDrawerAction = /** @class */ (function () {
    function ToggleInfoDrawerAction() {
        this.type = AppActionTypes.ToggleInfoDrawer;
    }
    return ToggleInfoDrawerAction;
}());
export { ToggleInfoDrawerAction };
if (false) {
    /** @type {?} */
    ToggleInfoDrawerAction.prototype.type;
}
var ToggleDocumentDisplayMode = /** @class */ (function () {
    function ToggleDocumentDisplayMode() {
        this.type = AppActionTypes.ToggleDocumentDisplayMode;
    }
    return ToggleDocumentDisplayMode;
}());
export { ToggleDocumentDisplayMode };
if (false) {
    /** @type {?} */
    ToggleDocumentDisplayMode.prototype.type;
}
var LogoutAction = /** @class */ (function () {
    function LogoutAction() {
        this.type = AppActionTypes.Logout;
    }
    return LogoutAction;
}());
export { LogoutAction };
if (false) {
    /** @type {?} */
    LogoutAction.prototype.type;
}
var ReloadDocumentListAction = /** @class */ (function () {
    function ReloadDocumentListAction(payload) {
        this.payload = payload;
        this.type = AppActionTypes.ReloadDocumentList;
    }
    return ReloadDocumentListAction;
}());
export { ReloadDocumentListAction };
if (false) {
    /** @type {?} */
    ReloadDocumentListAction.prototype.type;
    /** @type {?} */
    ReloadDocumentListAction.prototype.payload;
}
var ResetSelectionAction = /** @class */ (function () {
    function ResetSelectionAction(payload) {
        this.payload = payload;
        this.type = AppActionTypes.ResetSelection;
    }
    return ResetSelectionAction;
}());
export { ResetSelectionAction };
if (false) {
    /** @type {?} */
    ResetSelectionAction.prototype.type;
    /** @type {?} */
    ResetSelectionAction.prototype.payload;
}
var SetInfoDrawerStateAction = /** @class */ (function () {
    function SetInfoDrawerStateAction(payload) {
        this.payload = payload;
        this.type = AppActionTypes.SetInfoDrawerState;
    }
    return SetInfoDrawerStateAction;
}());
export { SetInfoDrawerStateAction };
if (false) {
    /** @type {?} */
    SetInfoDrawerStateAction.prototype.type;
    /** @type {?} */
    SetInfoDrawerStateAction.prototype.payload;
}
var CloseModalDialogsAction = /** @class */ (function () {
    function CloseModalDialogsAction() {
        this.type = AppActionTypes.CloseModalDialogs;
    }
    return CloseModalDialogsAction;
}());
export { CloseModalDialogsAction };
if (false) {
    /** @type {?} */
    CloseModalDialogsAction.prototype.type;
}
var SetRepositoryInfoAction = /** @class */ (function () {
    function SetRepositoryInfoAction(payload) {
        this.payload = payload;
        this.type = AppActionTypes.SetRepositoryInfo;
    }
    return SetRepositoryInfoAction;
}());
export { SetRepositoryInfoAction };
if (false) {
    /** @type {?} */
    SetRepositoryInfoAction.prototype.type;
    /** @type {?} */
    SetRepositoryInfoAction.prototype.payload;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWxmcmVzY28vYWNhLXNoYXJlZC9zdG9yZS8iLCJzb3VyY2VzIjpbImFjdGlvbnMvYXBwLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBOEJFLHNCQUF1Qix3QkFBd0I7SUFDL0MsaUJBQWtCLG1CQUFtQjtJQUNyQyxnQkFBaUIsa0JBQWtCO0lBQ25DLGtCQUFtQixvQkFBb0I7SUFDdkMsZUFBZ0IsaUJBQWlCO0lBQ2pDLGdCQUFpQixrQkFBa0I7SUFDbkMsbUJBQW9CLHFCQUFxQjtJQUN6QyxrQkFBbUIsb0JBQW9CO0lBQ3ZDLDJCQUE0Qiw4QkFBOEI7SUFDMUQsUUFBUyxRQUFRO0lBQ2pCLG9CQUFxQixzQkFBc0I7SUFDM0MsZ0JBQWlCLGlCQUFpQjtJQUNsQyxvQkFBcUIsdUJBQXVCO0lBQzVDLDZCQUE4QixpQ0FBaUM7SUFDL0QsbUJBQW9CLHFCQUFxQjs7O0FBRzNDO0lBR0Usb0NBQW1CLE9BQXFDO1FBQXJDLFlBQU8sR0FBUCxPQUFPLENBQThCO1FBRi9DLFNBQUksR0FBRyxjQUFjLENBQUMsb0JBQW9CLENBQUM7SUFFTyxDQUFDO0lBQzlELGlDQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQywwQ0FBb0Q7O0lBRXhDLDZDQUE0Qzs7QUFHMUQ7SUFHRSwrQkFBbUIsT0FBaUI7UUFBakIsWUFBTyxHQUFQLE9BQU8sQ0FBVTtRQUYzQixTQUFJLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQztJQUVSLENBQUM7SUFDMUMsNEJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLHFDQUErQzs7SUFFbkMsd0NBQXdCOztBQUd0QztJQUdFLDhCQUFtQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUZ2QixTQUFJLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztJQUVYLENBQUM7SUFDdEMsMkJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLG9DQUE4Qzs7SUFFbEMscUNBQW9COztBQUdsQztJQUdFLGdDQUFtQixPQUFhO1FBQWIsWUFBTyxHQUFQLE9BQU8sQ0FBTTtRQUZ2QixTQUFJLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDO0lBRWIsQ0FBQztJQUN0Qyw2QkFBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEMsc0NBQWdEOztJQUVwQyx5Q0FBb0I7O0FBR2xDO0lBR0UsNkJBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRnpCLFNBQUksR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDO0lBRVIsQ0FBQztJQUN4QywwQkFBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEMsbUNBQTZDOztJQUVqQyxzQ0FBc0I7O0FBR3BDO0lBR0UsOEJBQW1CLE9BQTRDO1FBQTVDLFlBQU8sR0FBUCxPQUFPLENBQXFDO1FBRnRELFNBQUksR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDO0lBRW9CLENBQUM7SUFDckUsMkJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLG9DQUE4Qzs7SUFFbEMsdUNBQW1EOztBQUdqRTtJQUFBO1FBQ1csU0FBSSxHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNsRCxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7OztJQURDLHNDQUFnRDs7QUFHbEQ7SUFBQTtRQUNXLFNBQUksR0FBRyxjQUFjLENBQUMseUJBQXlCLENBQUM7SUFDM0QsQ0FBQztJQUFELGdDQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7Ozs7SUFEQyx5Q0FBeUQ7O0FBRzNEO0lBQUE7UUFDVyxTQUFJLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUN4QyxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7OztJQURDLDRCQUFzQzs7QUFHeEM7SUFHRSxrQ0FBbUIsT0FBYTtRQUFiLFlBQU8sR0FBUCxPQUFPLENBQU07UUFGdkIsU0FBSSxHQUFHLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQztJQUVmLENBQUM7SUFDdEMsK0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLHdDQUFrRDs7SUFFdEMsMkNBQW9COztBQUdsQztJQUdFLDhCQUFtQixPQUFhO1FBQWIsWUFBTyxHQUFQLE9BQU8sQ0FBTTtRQUZ2QixTQUFJLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztJQUVYLENBQUM7SUFDdEMsMkJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhDLG9DQUE4Qzs7SUFFbEMsdUNBQW9COztBQUdsQztJQUdFLGtDQUFtQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBRjFCLFNBQUksR0FBRyxjQUFjLENBQUMsa0JBQWtCLENBQUM7SUFFWixDQUFDO0lBQ3pDLCtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQyx3Q0FBa0Q7O0lBRXRDLDJDQUF1Qjs7QUFHckM7SUFBQTtRQUNXLFNBQUksR0FBRyxjQUFjLENBQUMsaUJBQWlCLENBQUM7SUFDbkQsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7Ozs7SUFEQyx1Q0FBaUQ7O0FBR25EO0lBR0UsaUNBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBRmpDLFNBQUksR0FBRyxjQUFjLENBQUMsaUJBQWlCLENBQUM7SUFFSixDQUFDO0lBQ2hELDhCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQyx1Q0FBaUQ7O0lBRXJDLDBDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvblxuICpcbiAqIENvcHlyaWdodCAoQykgMjAwNSAtIDIwMjAgQWxmcmVzY28gU29mdHdhcmUgTGltaXRlZFxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBbGZyZXNjbyBFeGFtcGxlIENvbnRlbnQgQXBwbGljYXRpb24uXG4gKiBJZiB0aGUgc29mdHdhcmUgd2FzIHB1cmNoYXNlZCB1bmRlciBhIHBhaWQgQWxmcmVzY28gbGljZW5zZSwgdGhlIHRlcm1zIG9mXG4gKiB0aGUgcGFpZCBsaWNlbnNlIGFncmVlbWVudCB3aWxsIHByZXZhaWwuICBPdGhlcndpc2UsIHRoZSBzb2Z0d2FyZSBpc1xuICogcHJvdmlkZWQgdW5kZXIgdGhlIGZvbGxvd2luZyBvcGVuIHNvdXJjZSBsaWNlbnNlIHRlcm1zOlxuICpcbiAqIFRoZSBBbGZyZXNjbyBFeGFtcGxlIENvbnRlbnQgQXBwbGljYXRpb24gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGUgQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFsZnJlc2NvLiBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTm9kZSwgUGVyc29uLCBHcm91cCwgUmVwb3NpdG9yeUluZm8gfSBmcm9tICdAYWxmcmVzY28vanMtYXBpJztcbmltcG9ydCB7IEFwcFN0YXRlIH0gZnJvbSAnLi4vc3RhdGVzL2FwcC5zdGF0ZSc7XG5cbmV4cG9ydCBlbnVtIEFwcEFjdGlvblR5cGVzIHtcbiAgU2V0U2V0dGluZ3NQYXJhbWV0ZXIgPSAnU0VUX1NFVFRJTkdTX1BBUkFNRVRFUicsXG4gIFNldEluaXRpYWxTdGF0ZSA9ICdTRVRfSU5JVElBTF9TVEFURScsXG4gIFNldEhlYWRlckNvbG9yID0gJ1NFVF9IRUFERVJfQ09MT1InLFxuICBTZXRDdXJyZW50Rm9sZGVyID0gJ1NFVF9DVVJSRU5UX0ZPTERFUicsXG4gIFNldEN1cnJlbnRVcmwgPSAnU0VUX0NVUlJFTlRfVVJMJyxcbiAgU2V0VXNlclByb2ZpbGUgPSAnU0VUX1VTRVJfUFJPRklMRScsXG4gIFNldFJlcG9zaXRvcnlJbmZvID0gJ1NFVF9SRVBPU0lUT1JZX0lORk8nLFxuICBUb2dnbGVJbmZvRHJhd2VyID0gJ1RPR0dMRV9JTkZPX0RSQVdFUicsXG4gIFRvZ2dsZURvY3VtZW50RGlzcGxheU1vZGUgPSAnVE9HR0xFX0RPQ1VNRU5UX0RJU1BMQVlfTU9ERScsXG4gIExvZ291dCA9ICdMT0dPVVQnLFxuICBSZWxvYWREb2N1bWVudExpc3QgPSAnUkVMT0FEX0RPQ1VNRU5UX0xJU1QnLFxuICBSZXNldFNlbGVjdGlvbiA9ICdSRVNFVF9TRUxFQ1RJT04nLFxuICBTZXRJbmZvRHJhd2VyU3RhdGUgPSAnU0VUX0lORk9fRFJBV0VSX1NUQVRFJyxcbiAgU2V0SW5mb0RyYXdlck1ldGFkYXRhQXNwZWN0ID0gJ1NFVF9JTkZPX0RSQVdFUl9NRVRBREFUQV9BU1BFQ1QnLFxuICBDbG9zZU1vZGFsRGlhbG9ncyA9ICdDTE9TRV9NT0RBTF9ESUFMT0dTJ1xufVxuXG5leHBvcnQgY2xhc3MgU2V0U2V0dGluZ3NQYXJhbWV0ZXJBY3Rpb24gaW1wbGVtZW50cyBBY3Rpb24ge1xuICByZWFkb25seSB0eXBlID0gQXBwQWN0aW9uVHlwZXMuU2V0U2V0dGluZ3NQYXJhbWV0ZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IHsgbmFtZTogc3RyaW5nOyB2YWx1ZTogYW55IH0pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXRJbml0aWFsU3RhdGVBY3Rpb24gaW1wbGVtZW50cyBBY3Rpb24ge1xuICByZWFkb25seSB0eXBlID0gQXBwQWN0aW9uVHlwZXMuU2V0SW5pdGlhbFN0YXRlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBBcHBTdGF0ZSkge31cbn1cblxuZXhwb3J0IGNsYXNzIFNldEhlYWRlckNvbG9yQWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEFwcEFjdGlvblR5cGVzLlNldEhlYWRlckNvbG9yO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb2xvcjogc3RyaW5nKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU2V0Q3VycmVudEZvbGRlckFjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHJlYWRvbmx5IHR5cGUgPSBBcHBBY3Rpb25UeXBlcy5TZXRDdXJyZW50Rm9sZGVyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBOb2RlKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU2V0Q3VycmVudFVybEFjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHJlYWRvbmx5IHR5cGUgPSBBcHBBY3Rpb25UeXBlcy5TZXRDdXJyZW50VXJsO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBzdHJpbmcpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXRVc2VyUHJvZmlsZUFjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHJlYWRvbmx5IHR5cGUgPSBBcHBBY3Rpb25UeXBlcy5TZXRVc2VyUHJvZmlsZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogeyBwZXJzb246IFBlcnNvbjsgZ3JvdXBzOiBHcm91cFtdIH0pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBUb2dnbGVJbmZvRHJhd2VyQWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEFwcEFjdGlvblR5cGVzLlRvZ2dsZUluZm9EcmF3ZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBUb2dnbGVEb2N1bWVudERpc3BsYXlNb2RlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEFwcEFjdGlvblR5cGVzLlRvZ2dsZURvY3VtZW50RGlzcGxheU1vZGU7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2dvdXRBY3Rpb24gaW1wbGVtZW50cyBBY3Rpb24ge1xuICByZWFkb25seSB0eXBlID0gQXBwQWN0aW9uVHlwZXMuTG9nb3V0O1xufVxuXG5leHBvcnQgY2xhc3MgUmVsb2FkRG9jdW1lbnRMaXN0QWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEFwcEFjdGlvblR5cGVzLlJlbG9hZERvY3VtZW50TGlzdDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZD86IGFueSkge31cbn1cblxuZXhwb3J0IGNsYXNzIFJlc2V0U2VsZWN0aW9uQWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEFwcEFjdGlvblR5cGVzLlJlc2V0U2VsZWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkPzogYW55KSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU2V0SW5mb0RyYXdlclN0YXRlQWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEFwcEFjdGlvblR5cGVzLlNldEluZm9EcmF3ZXJTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogYm9vbGVhbikge31cbn1cblxuZXhwb3J0IGNsYXNzIENsb3NlTW9kYWxEaWFsb2dzQWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEFwcEFjdGlvblR5cGVzLkNsb3NlTW9kYWxEaWFsb2dzO1xufVxuXG5leHBvcnQgY2xhc3MgU2V0UmVwb3NpdG9yeUluZm9BY3Rpb24gaW1wbGVtZW50cyBBY3Rpb24ge1xuICByZWFkb25seSB0eXBlID0gQXBwQWN0aW9uVHlwZXMuU2V0UmVwb3NpdG9yeUluZm87XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IFJlcG9zaXRvcnlJbmZvKSB7fVxufVxuIl19