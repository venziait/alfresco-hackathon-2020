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
import * as navigation from './navigation.rules';
import * as repository from './repository.rules';
/**
 * @record
 */
export function AcaRuleContext() { }
if (false) {
    /** @type {?} */
    AcaRuleContext.prototype.languagePicker;
    /** @type {?} */
    AcaRuleContext.prototype.withCredentials;
}
/**
 * Checks if user can copy selected node.
 * JSON ref: `app.canCopyNode`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canCopyNode(context) {
    return [
        hasSelection(context),
        navigation.isNotTrashcan(context),
        navigation.isNotLibraries(context)
    ].every(Boolean);
}
/**
 * Checks if user can mark selected nodes as **Favorite**.
 * JSON ref: `app.selection.canAddFavorite`
 * @param {?} context
 * @return {?}
 */
export function canAddFavorite(context) {
    if (!context.selection.isEmpty) {
        if (navigation.isFavorites(context) ||
            navigation.isLibraries(context) ||
            navigation.isTrashcan(context)) {
            return false;
        }
        return context.selection.nodes.some(function (node) { return !node.entry.isFavorite; });
    }
    return false;
}
/**
 * Checks if user can un-mark selected nodes as **Favorite**.
 * JSON ref: `app.selection.canRemoveFavorite`
 * @param {?} context
 * @return {?}
 */
export function canRemoveFavorite(context) {
    if (!context.selection.isEmpty && !navigation.isTrashcan(context)) {
        if (navigation.isFavorites(context)) {
            return true;
        }
        return context.selection.nodes.every(function (node) { return node.entry.isFavorite; });
    }
    return false;
}
/**
 * Checks if user can share selected file.
 * JSON ref: `app.selection.file.canShare`
 * @param {?} context
 * @return {?}
 */
export function canShareFile(context) {
    return [
        context.selection.file,
        navigation.isNotTrashcan(context),
        repository.hasQuickShareEnabled(context),
        !isShared(context)
    ].every(Boolean);
}
/**
 * Checks if user can perform "Join" or "Cancel Join Request" on a library.
 * JSON ref: `canToggleJoinLibrary`
 * @param {?} context
 * @return {?}
 */
export function canToggleJoinLibrary(context) {
    return [
        hasLibrarySelected(context),
        !isPrivateLibrary(context),
        hasNoLibraryRole(context)
    ].every(Boolean);
}
/**
 * Checks if user can edit the selected folder.
 * JSON ref: `canEditFolder`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canEditFolder(context) {
    return [
        canUpdateSelectedFolder(context),
        navigation.isNotTrashcan(context)
    ].every(Boolean);
}
/**
 * Checks if the selected file is already shared.
 * JSON ref: `app.selection.file.isShared`
 * @param {?} context
 * @return {?}
 */
export function isShared(context) {
    if (navigation.isSharedFiles(context) && context.selection.file) {
        return true;
    }
    if ((navigation.isNotTrashcan(context),
        !context.selection.isEmpty && context.selection.file)) {
        return !!(context.selection.file.entry &&
            context.selection.file.entry.properties &&
            context.selection.file.entry.properties['qshare:sharedId']);
    }
    return false;
}
/**
 * Checks if user can delete selected nodes.
 * JSON ref: `app.selection.canDelete`
 * @param {?} context
 * @return {?}
 */
export function canDeleteSelection(context) {
    if (navigation.isNotTrashcan(context) &&
        navigation.isNotLibraries(context) &&
        navigation.isNotSearchResults(context) &&
        !context.selection.isEmpty) {
        if (hasLockedFiles(context)) {
            return false;
        }
        // temp workaround for Favorites api
        if (navigation.isFavorites(context)) {
            return true;
        }
        if (navigation.isPreview(context)) {
            return context.permissions.check(context.selection.nodes, ['delete']);
        }
        // workaround for Shared Files
        if (navigation.isSharedFiles(context)) {
            return context.permissions.check(context.selection.nodes, ['delete'], {
                target: 'allowableOperationsOnTarget'
            });
        }
        return context.permissions.check(context.selection.nodes, ['delete']);
    }
    return false;
}
/**
 * Checks if user can un-share selected nodes.
 * JSON ref: `app.selection.canUnshare`
 * @param {?} context
 * @return {?}
 */
export function canUnshareNodes(context) {
    if (!context.selection.isEmpty) {
        return context.permissions.check(context.selection.nodes, ['delete'], {
            target: 'allowableOperationsOnTarget'
        });
    }
    return false;
}
/**
 * Checks if user selected anything.
 * JSON ref: `app.selection.notEmpty`
 * @param {?} context
 * @return {?}
 */
export function hasSelection(context) {
    return !context.selection.isEmpty;
}
/**
 * Checks if user can create a new folder with current path.
 * JSON ref: `app.navigation.folder.canCreate`
 * @param {?} context
 * @return {?}
 */
export function canCreateFolder(context) {
    var currentFolder = context.navigation.currentFolder;
    if (currentFolder) {
        return context.permissions.check(currentFolder, ['create']);
    }
    return false;
}
/**
 * Checks if user can upload content to current folder.
 * JSON ref: `app.navigation.folder.canUpload`
 * @param {?} context
 * @return {?}
 */
export function canUpload(context) {
    var currentFolder = context.navigation.currentFolder;
    if (currentFolder) {
        return context.permissions.check(currentFolder, ['create']);
    }
    return false;
}
/**
 * Checks if user can download selected nodes (either files or folders).
 * JSON ref: `app.selection.canDownload`
 * @param {?} context
 * @return {?}
 */
export function canDownloadSelection(context) {
    if (!context.selection.isEmpty && navigation.isNotTrashcan(context)) {
        return context.selection.nodes.every(function (node) {
            return (node.entry &&
                (node.entry.isFile || node.entry.isFolder || !!node.entry.nodeId));
        });
    }
    return false;
}
/**
 * Checks if user has selected a folder.
 * JSON ref: `app.selection.folder`
 * @param {?} context
 * @return {?}
 */
export function hasFolderSelected(context) {
    /** @type {?} */
    var folder = context.selection.folder;
    return folder ? true : false;
}
/**
 * Checks if user has selected a library (site).
 * JSON ref: `app.selection.library`
 * @param {?} context
 * @return {?}
 */
export function hasLibrarySelected(context) {
    /** @type {?} */
    var library = context.selection.library;
    return library ? true : false;
}
/**
 * Checks if user has selected a **private** library (site)
 * JSON ref: `app.selection.isPrivateLibrary`
 * @param {?} context
 * @return {?}
 */
export function isPrivateLibrary(context) {
    /** @type {?} */
    var library = context.selection.library;
    return library
        ? !!(library.entry &&
            library.entry.visibility &&
            library.entry.visibility === 'PRIVATE')
        : false;
}
/**
 * Checks if the selected library has a **role** property defined.
 * JSON ref: `app.selection.hasLibraryRole`
 * @param {?} context
 * @return {?}
 */
export function hasLibraryRole(context) {
    /** @type {?} */
    var library = context.selection.library;
    return library ? !!(library.entry && library.entry.role) : false;
}
/**
 * Checks if the selected library has no **role** property defined.
 * JSON ref: `app.selection.hasNoLibraryRole`
 * @param {?} context
 * @return {?}
 */
export function hasNoLibraryRole(context) {
    return !hasLibraryRole(context);
}
/**
 * Checks if user has selected a file.
 * JSON ref: `app.selection.file`
 * @param {?} context
 * @return {?}
 */
export function hasFileSelected(context) {
    if (context && context.selection && context.selection.file) {
        return true;
    }
    return false;
}
/**
 * Checks if user can update the first selected node.
 * JSON ref: `app.selection.first.canUpdate`
 * @param {?} context
 * @return {?}
 */
export function canUpdateSelectedNode(context) {
    if (context.selection && !context.selection.isEmpty) {
        /** @type {?} */
        var node = context.selection.first;
        if (node.entry.isFile && hasLockedFiles(context)) {
            return false;
        }
        return context.permissions.check(node, ['update']);
    }
    return false;
}
/**
 * Checks if user can update the first selected folder.
 * JSON ref: `app.selection.folder.canUpdate`
 * @param {?} context
 * @return {?}
 */
export function canUpdateSelectedFolder(context) {
    var folder = context.selection.folder;
    if (folder) {
        return (
        // workaround for Favorites Api
        navigation.isFavorites(context) ||
            context.permissions.check(folder.entry, ['update']));
    }
    return false;
}
/**
 * Checks if user has selected a **locked** file node.
 * JSON ref: `app.selection.file.isLocked`
 * @param {?} context
 * @return {?}
 */
export function hasLockedFiles(context) {
    if (context && context.selection && context.selection.nodes) {
        return context.selection.nodes.some(function (node) {
            if (!node.entry.isFile) {
                return false;
            }
            return (node.entry.isLocked ||
                (node.entry.properties &&
                    node.entry.properties['cm:lockType'] === 'READ_ONLY_LOCK'));
        });
    }
    return false;
}
/**
 * Checks if the selected file has **write** or **read-only** locks specified.
 * JSON ref: `app.selection.file.isLocked`
 * @param {?} context
 * @return {?}
 */
export function isWriteLocked(context) {
    return !!(context &&
        context.selection &&
        context.selection.file &&
        context.selection.file.entry &&
        context.selection.file.entry.properties &&
        (context.selection.file.entry.properties['cm:lockType'] === 'WRITE_LOCK' ||
            context.selection.file.entry.properties['cm:lockType'] ===
                'READ_ONLY_LOCK'));
}
/**
 * Checks if the selected file has **write** or **read-only** locks specified,
 * and that current user is the owner of the lock.
 * JSON ref: `app.selection.file.isLockOwner`
 * @param {?} context
 * @return {?}
 */
export function isUserWriteLockOwner(context) {
    return (isWriteLocked(context) &&
        (context.selection.file.entry.properties['cm:lockOwner'] &&
            context.selection.file.entry.properties['cm:lockOwner'].id ===
                context.profile.id));
}
/**
 * Checks if user can lock selected file.
 * JSON ref: `app.selection.file.canLock`
 * @param {?} context
 * @return {?}
 */
export function canLockFile(context) {
    return !isWriteLocked(context) && canUpdateSelectedNode(context);
}
/**
 * Checks if user can unlock selected file.
 * JSON ref: `app.selection.file.canUnlock`
 * @param {?} context
 * @return {?}
 */
export function canUnlockFile(context) {
    var file = context.selection.file;
    return (isWriteLocked(context) &&
        (context.permissions.check(file.entry, ['delete']) ||
            isUserWriteLockOwner(context)));
}
/**
 * Checks if user can upload a new version of the file.
 * JSON ref: `app.selection.file.canUploadVersion`
 * @param {?} context
 * @return {?}
 */
export function canUploadVersion(context) {
    if (navigation.isFavorites(context) || navigation.isSharedFiles(context)) {
        return hasFileSelected(context);
    }
    return [
        hasFileSelected(context),
        navigation.isNotTrashcan(context),
        isWriteLocked(context)
            ? isUserWriteLockOwner(context)
            : canUpdateSelectedNode(context)
    ].every(Boolean);
}
/**
 * Checks if user has trashcan item selected.
 * JSON ref: `isTrashcanItemSelected`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function isTrashcanItemSelected(context) {
    return [navigation.isTrashcan(context), hasSelection(context)].every(Boolean);
}
/**
 * Checks if user can view the file.
 * JSON ref: `canViewFile`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canViewFile(context) {
    return [hasFileSelected(context), navigation.isNotTrashcan(context)].every(Boolean);
}
/**
 * Checks if user can **Leave** selected library.
 * JSON ref: `canLeaveLibrary`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canLeaveLibrary(context) {
    return [hasLibrarySelected(context), hasLibraryRole(context)].every(Boolean);
}
/**
 * Checks if user can toggle shared link mode.
 * JSON ref: `canToggleSharedLink`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canToggleSharedLink(context) {
    return [
        hasFileSelected(context),
        [canShareFile(context), isShared(context)].some(Boolean)
    ].every(Boolean);
}
/**
 * Checks if user can show **Info Drawer** for the selected node.
 * JSON ref: `canShowInfoDrawer`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canShowInfoDrawer(context) {
    return [
        hasSelection(context),
        navigation.isNotLibraries(context),
        navigation.isNotTrashcan(context)
    ].every(Boolean);
}
/**
 * Checks if user can manage file versions for the selected node.
 * JSON ref: `canManageFileVersions`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canManageFileVersions(context) {
    return [
        hasFileSelected(context),
        navigation.isNotTrashcan(context),
        !hasLockedFiles(context)
    ].every(Boolean);
}
/**
 * Checks if user can manage permissions for the selected node.
 * JSON ref: `canManagePermissions`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canManagePermissions(context) {
    return [
        canUpdateSelectedNode(context),
        navigation.isNotTrashcan(context)
    ].every(Boolean);
}
/**
 * Checks if user can toggle **Edit Offline** mode for selected node.
 * JSON ref: `canToggleEditOffline`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canToggleEditOffline(context) {
    return [
        hasFileSelected(context),
        navigation.isNotTrashcan(context),
        canLockFile(context) || canUnlockFile(context)
    ].every(Boolean);
}
/**
 * @deprecated Uses workarounds for for recent files and search api issues.
 * Checks if user can toggle **Favorite** state for a node.
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canToggleFavorite(context) {
    return [
        [canAddFavorite(context), canRemoveFavorite(context)].some(Boolean),
        [
            navigation.isRecentFiles(context),
            navigation.isSharedFiles(context),
            navigation.isSearchResults(context),
            navigation.isFavorites(context)
        ].some(Boolean)
    ].every(Boolean);
}
/**
 * Checks if application should render language picker menu.
 * JSON ref: `canShowLanguagePicker`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canShowLanguagePicker(context) {
    return context.languagePicker;
}
/**
 * Checks if application should render logout option.
 * JSON ref: `canShowLogout`
 * @param {?} context Rule execution context
 * @return {?}
 */
export function canShowLogout(context) {
    return !context.withCredentials;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJ1bGVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFsZnJlc2NvL2FjYS1zaGFyZWQvcnVsZXMvIiwic291cmNlcyI6WyJhcHAucnVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxPQUFPLEtBQUssVUFBVSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sS0FBSyxVQUFVLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFFakQsb0NBR0M7OztJQUZDLHdDQUF3Qjs7SUFDeEIseUNBQXlCOzs7Ozs7OztBQVEzQixNQUFNLFVBQVUsV0FBVyxDQUFDLE9BQW9CO0lBQzlDLE9BQU87UUFDTCxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQ2pDLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO0tBQ25DLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7QUFNRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE9BQW9CO0lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtRQUM5QixJQUNFLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQzlCO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO0tBQ3JFO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDOzs7Ozs7O0FBTUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BQW9CO0lB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QyxPQUFPLENBQUMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDO0tBQy9DLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsT0FBb0I7SUFDcEQsT0FBTztRQUNMLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNuRTtZQUNFLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ2pDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ2pDLFVBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQ25DLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1NBQ2hDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNoQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQixDQUFDOzs7Ozs7O0FBT0QsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE9BQXVCO0lBQzNELE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQztBQUNoQyxDQUFDOzs7Ozs7O0FBT0QsTUFBTSxVQUFVLGFBQWEsQ0FBQyxPQUF1QjtJQUNuRCxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uXG4gKlxuICogQ29weXJpZ2h0IChDKSAyMDA1IC0gMjAyMCBBbGZyZXNjbyBTb2Z0d2FyZSBMaW1pdGVkXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvbi5cbiAqIElmIHRoZSBzb2Z0d2FyZSB3YXMgcHVyY2hhc2VkIHVuZGVyIGEgcGFpZCBBbGZyZXNjbyBsaWNlbnNlLCB0aGUgdGVybXMgb2ZcbiAqIHRoZSBwYWlkIGxpY2Vuc2UgYWdyZWVtZW50IHdpbGwgcHJldmFpbC4gIE90aGVyd2lzZSwgdGhlIHNvZnR3YXJlIGlzXG4gKiBwcm92aWRlZCB1bmRlciB0aGUgZm9sbG93aW5nIG9wZW4gc291cmNlIGxpY2Vuc2UgdGVybXM6XG4gKlxuICogVGhlIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvbiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoZSBBbGZyZXNjbyBFeGFtcGxlIENvbnRlbnQgQXBwbGljYXRpb24gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWxmcmVzY28uIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgeyBSdWxlQ29udGV4dCB9IGZyb20gJ0BhbGZyZXNjby9hZGYtZXh0ZW5zaW9ucyc7XG5pbXBvcnQgKiBhcyBuYXZpZ2F0aW9uIGZyb20gJy4vbmF2aWdhdGlvbi5ydWxlcyc7XG5pbXBvcnQgKiBhcyByZXBvc2l0b3J5IGZyb20gJy4vcmVwb3NpdG9yeS5ydWxlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNhUnVsZUNvbnRleHQgZXh0ZW5kcyBSdWxlQ29udGV4dCB7XG4gIGxhbmd1YWdlUGlja2VyOiBib29sZWFuO1xuICB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIGNvcHkgc2VsZWN0ZWQgbm9kZS5cbiAqIEpTT04gcmVmOiBgYXBwLmNhbkNvcHlOb2RlYFxuICogQHBhcmFtIGNvbnRleHQgUnVsZSBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuQ29weU5vZGUoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuIFtcbiAgICBoYXNTZWxlY3Rpb24oY29udGV4dCksXG4gICAgbmF2aWdhdGlvbi5pc05vdFRyYXNoY2FuKGNvbnRleHQpLFxuICAgIG5hdmlnYXRpb24uaXNOb3RMaWJyYXJpZXMoY29udGV4dClcbiAgXS5ldmVyeShCb29sZWFuKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gbWFyayBzZWxlY3RlZCBub2RlcyBhcyAqKkZhdm9yaXRlKiouXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uY2FuQWRkRmF2b3JpdGVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5BZGRGYXZvcml0ZShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBpZiAoIWNvbnRleHQuc2VsZWN0aW9uLmlzRW1wdHkpIHtcbiAgICBpZiAoXG4gICAgICBuYXZpZ2F0aW9uLmlzRmF2b3JpdGVzKGNvbnRleHQpIHx8XG4gICAgICBuYXZpZ2F0aW9uLmlzTGlicmFyaWVzKGNvbnRleHQpIHx8XG4gICAgICBuYXZpZ2F0aW9uLmlzVHJhc2hjYW4oY29udGV4dClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQuc2VsZWN0aW9uLm5vZGVzLnNvbWUobm9kZSA9PiAhbm9kZS5lbnRyeS5pc0Zhdm9yaXRlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIHVuLW1hcmsgc2VsZWN0ZWQgbm9kZXMgYXMgKipGYXZvcml0ZSoqLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmNhblJlbW92ZUZhdm9yaXRlYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuUmVtb3ZlRmF2b3JpdGUoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgaWYgKCFjb250ZXh0LnNlbGVjdGlvbi5pc0VtcHR5ICYmICFuYXZpZ2F0aW9uLmlzVHJhc2hjYW4oY29udGV4dCkpIHtcbiAgICBpZiAobmF2aWdhdGlvbi5pc0Zhdm9yaXRlcyhjb250ZXh0KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0LnNlbGVjdGlvbi5ub2Rlcy5ldmVyeShub2RlID0+IG5vZGUuZW50cnkuaXNGYXZvcml0ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiBzaGFyZSBzZWxlY3RlZCBmaWxlLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmZpbGUuY2FuU2hhcmVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5TaGFyZUZpbGUoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuIFtcbiAgICBjb250ZXh0LnNlbGVjdGlvbi5maWxlLFxuICAgIG5hdmlnYXRpb24uaXNOb3RUcmFzaGNhbihjb250ZXh0KSxcbiAgICByZXBvc2l0b3J5Lmhhc1F1aWNrU2hhcmVFbmFibGVkKGNvbnRleHQpLFxuICAgICFpc1NoYXJlZChjb250ZXh0KVxuICBdLmV2ZXJ5KEJvb2xlYW4pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiBwZXJmb3JtIFwiSm9pblwiIG9yIFwiQ2FuY2VsIEpvaW4gUmVxdWVzdFwiIG9uIGEgbGlicmFyeS5cbiAqIEpTT04gcmVmOiBgY2FuVG9nZ2xlSm9pbkxpYnJhcnlgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5Ub2dnbGVKb2luTGlicmFyeShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gW1xuICAgIGhhc0xpYnJhcnlTZWxlY3RlZChjb250ZXh0KSxcbiAgICAhaXNQcml2YXRlTGlicmFyeShjb250ZXh0KSxcbiAgICBoYXNOb0xpYnJhcnlSb2xlKGNvbnRleHQpXG4gIF0uZXZlcnkoQm9vbGVhbik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIGVkaXQgdGhlIHNlbGVjdGVkIGZvbGRlci5cbiAqIEpTT04gcmVmOiBgY2FuRWRpdEZvbGRlcmBcbiAqIEBwYXJhbSBjb250ZXh0IFJ1bGUgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbkVkaXRGb2xkZXIoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuIFtcbiAgICBjYW5VcGRhdGVTZWxlY3RlZEZvbGRlcihjb250ZXh0KSxcbiAgICBuYXZpZ2F0aW9uLmlzTm90VHJhc2hjYW4oY29udGV4dClcbiAgXS5ldmVyeShCb29sZWFuKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHNlbGVjdGVkIGZpbGUgaXMgYWxyZWFkeSBzaGFyZWQuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uZmlsZS5pc1NoYXJlZGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU2hhcmVkKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIGlmIChuYXZpZ2F0aW9uLmlzU2hhcmVkRmlsZXMoY29udGV4dCkgJiYgY29udGV4dC5zZWxlY3Rpb24uZmlsZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKFxuICAgIChuYXZpZ2F0aW9uLmlzTm90VHJhc2hjYW4oY29udGV4dCksXG4gICAgIWNvbnRleHQuc2VsZWN0aW9uLmlzRW1wdHkgJiYgY29udGV4dC5zZWxlY3Rpb24uZmlsZSlcbiAgKSB7XG4gICAgcmV0dXJuICEhKFxuICAgICAgY29udGV4dC5zZWxlY3Rpb24uZmlsZS5lbnRyeSAmJlxuICAgICAgY29udGV4dC5zZWxlY3Rpb24uZmlsZS5lbnRyeS5wcm9wZXJ0aWVzICYmXG4gICAgICBjb250ZXh0LnNlbGVjdGlvbi5maWxlLmVudHJ5LnByb3BlcnRpZXNbJ3FzaGFyZTpzaGFyZWRJZCddXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gZGVsZXRlIHNlbGVjdGVkIG5vZGVzLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmNhbkRlbGV0ZWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbkRlbGV0ZVNlbGVjdGlvbihjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBpZiAoXG4gICAgbmF2aWdhdGlvbi5pc05vdFRyYXNoY2FuKGNvbnRleHQpICYmXG4gICAgbmF2aWdhdGlvbi5pc05vdExpYnJhcmllcyhjb250ZXh0KSAmJlxuICAgIG5hdmlnYXRpb24uaXNOb3RTZWFyY2hSZXN1bHRzKGNvbnRleHQpICYmXG4gICAgIWNvbnRleHQuc2VsZWN0aW9uLmlzRW1wdHlcbiAgKSB7XG4gICAgaWYgKGhhc0xvY2tlZEZpbGVzKGNvbnRleHQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gdGVtcCB3b3JrYXJvdW5kIGZvciBGYXZvcml0ZXMgYXBpXG4gICAgaWYgKG5hdmlnYXRpb24uaXNGYXZvcml0ZXMoY29udGV4dCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChuYXZpZ2F0aW9uLmlzUHJldmlldyhjb250ZXh0KSkge1xuICAgICAgcmV0dXJuIGNvbnRleHQucGVybWlzc2lvbnMuY2hlY2soY29udGV4dC5zZWxlY3Rpb24ubm9kZXMsIFsnZGVsZXRlJ10pO1xuICAgIH1cblxuICAgIC8vIHdvcmthcm91bmQgZm9yIFNoYXJlZCBGaWxlc1xuICAgIGlmIChuYXZpZ2F0aW9uLmlzU2hhcmVkRmlsZXMoY29udGV4dCkpIHtcbiAgICAgIHJldHVybiBjb250ZXh0LnBlcm1pc3Npb25zLmNoZWNrKGNvbnRleHQuc2VsZWN0aW9uLm5vZGVzLCBbJ2RlbGV0ZSddLCB7XG4gICAgICAgIHRhcmdldDogJ2FsbG93YWJsZU9wZXJhdGlvbnNPblRhcmdldCdcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0LnBlcm1pc3Npb25zLmNoZWNrKGNvbnRleHQuc2VsZWN0aW9uLm5vZGVzLCBbJ2RlbGV0ZSddKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIHVuLXNoYXJlIHNlbGVjdGVkIG5vZGVzLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmNhblVuc2hhcmVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5VbnNoYXJlTm9kZXMoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgaWYgKCFjb250ZXh0LnNlbGVjdGlvbi5pc0VtcHR5KSB7XG4gICAgcmV0dXJuIGNvbnRleHQucGVybWlzc2lvbnMuY2hlY2soY29udGV4dC5zZWxlY3Rpb24ubm9kZXMsIFsnZGVsZXRlJ10sIHtcbiAgICAgIHRhcmdldDogJ2FsbG93YWJsZU9wZXJhdGlvbnNPblRhcmdldCdcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgc2VsZWN0ZWQgYW55dGhpbmcuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24ubm90RW1wdHlgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNTZWxlY3Rpb24oY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuICFjb250ZXh0LnNlbGVjdGlvbi5pc0VtcHR5O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiBjcmVhdGUgYSBuZXcgZm9sZGVyIHdpdGggY3VycmVudCBwYXRoLlxuICogSlNPTiByZWY6IGBhcHAubmF2aWdhdGlvbi5mb2xkZXIuY2FuQ3JlYXRlYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuQ3JlYXRlRm9sZGVyKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIGNvbnN0IHsgY3VycmVudEZvbGRlciB9ID0gY29udGV4dC5uYXZpZ2F0aW9uO1xuICBpZiAoY3VycmVudEZvbGRlcikge1xuICAgIHJldHVybiBjb250ZXh0LnBlcm1pc3Npb25zLmNoZWNrKGN1cnJlbnRGb2xkZXIsIFsnY3JlYXRlJ10pO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gdXBsb2FkIGNvbnRlbnQgdG8gY3VycmVudCBmb2xkZXIuXG4gKiBKU09OIHJlZjogYGFwcC5uYXZpZ2F0aW9uLmZvbGRlci5jYW5VcGxvYWRgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5VcGxvYWQoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgY29uc3QgeyBjdXJyZW50Rm9sZGVyIH0gPSBjb250ZXh0Lm5hdmlnYXRpb247XG4gIGlmIChjdXJyZW50Rm9sZGVyKSB7XG4gICAgcmV0dXJuIGNvbnRleHQucGVybWlzc2lvbnMuY2hlY2soY3VycmVudEZvbGRlciwgWydjcmVhdGUnXSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiBkb3dubG9hZCBzZWxlY3RlZCBub2RlcyAoZWl0aGVyIGZpbGVzIG9yIGZvbGRlcnMpLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmNhbkRvd25sb2FkYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuRG93bmxvYWRTZWxlY3Rpb24oY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgaWYgKCFjb250ZXh0LnNlbGVjdGlvbi5pc0VtcHR5ICYmIG5hdmlnYXRpb24uaXNOb3RUcmFzaGNhbihjb250ZXh0KSkge1xuICAgIHJldHVybiBjb250ZXh0LnNlbGVjdGlvbi5ub2Rlcy5ldmVyeSgobm9kZTogYW55KSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLmVudHJ5ICYmXG4gICAgICAgIChub2RlLmVudHJ5LmlzRmlsZSB8fCBub2RlLmVudHJ5LmlzRm9sZGVyIHx8ICEhbm9kZS5lbnRyeS5ub2RlSWQpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBoYXMgc2VsZWN0ZWQgYSBmb2xkZXIuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uZm9sZGVyYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzRm9sZGVyU2VsZWN0ZWQoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgY29uc3QgZm9sZGVyID0gY29udGV4dC5zZWxlY3Rpb24uZm9sZGVyO1xuICByZXR1cm4gZm9sZGVyID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGhhcyBzZWxlY3RlZCBhIGxpYnJhcnkgKHNpdGUpLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmxpYnJhcnlgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNMaWJyYXJ5U2VsZWN0ZWQoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgY29uc3QgbGlicmFyeSA9IGNvbnRleHQuc2VsZWN0aW9uLmxpYnJhcnk7XG4gIHJldHVybiBsaWJyYXJ5ID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGhhcyBzZWxlY3RlZCBhICoqcHJpdmF0ZSoqIGxpYnJhcnkgKHNpdGUpXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uaXNQcml2YXRlTGlicmFyeWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJpdmF0ZUxpYnJhcnkoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgY29uc3QgbGlicmFyeSA9IGNvbnRleHQuc2VsZWN0aW9uLmxpYnJhcnk7XG4gIHJldHVybiBsaWJyYXJ5XG4gICAgPyAhIShcbiAgICAgICAgbGlicmFyeS5lbnRyeSAmJlxuICAgICAgICBsaWJyYXJ5LmVudHJ5LnZpc2liaWxpdHkgJiZcbiAgICAgICAgbGlicmFyeS5lbnRyeS52aXNpYmlsaXR5ID09PSAnUFJJVkFURSdcbiAgICAgIClcbiAgICA6IGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgc2VsZWN0ZWQgbGlicmFyeSBoYXMgYSAqKnJvbGUqKiBwcm9wZXJ0eSBkZWZpbmVkLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmhhc0xpYnJhcnlSb2xlYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzTGlicmFyeVJvbGUoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgY29uc3QgbGlicmFyeSA9IGNvbnRleHQuc2VsZWN0aW9uLmxpYnJhcnk7XG4gIHJldHVybiBsaWJyYXJ5ID8gISEobGlicmFyeS5lbnRyeSAmJiBsaWJyYXJ5LmVudHJ5LnJvbGUpIDogZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBzZWxlY3RlZCBsaWJyYXJ5IGhhcyBubyAqKnJvbGUqKiBwcm9wZXJ0eSBkZWZpbmVkLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmhhc05vTGlicmFyeVJvbGVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNOb0xpYnJhcnlSb2xlKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiAhaGFzTGlicmFyeVJvbGUoY29udGV4dCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgaGFzIHNlbGVjdGVkIGEgZmlsZS5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5maWxlYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzRmlsZVNlbGVjdGVkKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIGlmIChjb250ZXh0ICYmIGNvbnRleHQuc2VsZWN0aW9uICYmIGNvbnRleHQuc2VsZWN0aW9uLmZpbGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIHVwZGF0ZSB0aGUgZmlyc3Qgc2VsZWN0ZWQgbm9kZS5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5maXJzdC5jYW5VcGRhdGVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5VcGRhdGVTZWxlY3RlZE5vZGUoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgaWYgKGNvbnRleHQuc2VsZWN0aW9uICYmICFjb250ZXh0LnNlbGVjdGlvbi5pc0VtcHR5KSB7XG4gICAgY29uc3Qgbm9kZSA9IGNvbnRleHQuc2VsZWN0aW9uLmZpcnN0O1xuXG4gICAgaWYgKG5vZGUuZW50cnkuaXNGaWxlICYmIGhhc0xvY2tlZEZpbGVzKGNvbnRleHQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRleHQucGVybWlzc2lvbnMuY2hlY2sobm9kZSwgWyd1cGRhdGUnXSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiB1cGRhdGUgdGhlIGZpcnN0IHNlbGVjdGVkIGZvbGRlci5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5mb2xkZXIuY2FuVXBkYXRlYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuVXBkYXRlU2VsZWN0ZWRGb2xkZXIoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgY29uc3QgeyBmb2xkZXIgfSA9IGNvbnRleHQuc2VsZWN0aW9uO1xuICBpZiAoZm9sZGVyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIHdvcmthcm91bmQgZm9yIEZhdm9yaXRlcyBBcGlcbiAgICAgIG5hdmlnYXRpb24uaXNGYXZvcml0ZXMoY29udGV4dCkgfHxcbiAgICAgIGNvbnRleHQucGVybWlzc2lvbnMuY2hlY2soZm9sZGVyLmVudHJ5LCBbJ3VwZGF0ZSddKVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGhhcyBzZWxlY3RlZCBhICoqbG9ja2VkKiogZmlsZSBub2RlLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmZpbGUuaXNMb2NrZWRgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNMb2NrZWRGaWxlcyhjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBpZiAoY29udGV4dCAmJiBjb250ZXh0LnNlbGVjdGlvbiAmJiBjb250ZXh0LnNlbGVjdGlvbi5ub2Rlcykge1xuICAgIHJldHVybiBjb250ZXh0LnNlbGVjdGlvbi5ub2Rlcy5zb21lKG5vZGUgPT4ge1xuICAgICAgaWYgKCFub2RlLmVudHJ5LmlzRmlsZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIG5vZGUuZW50cnkuaXNMb2NrZWQgfHxcbiAgICAgICAgKG5vZGUuZW50cnkucHJvcGVydGllcyAmJlxuICAgICAgICAgIG5vZGUuZW50cnkucHJvcGVydGllc1snY206bG9ja1R5cGUnXSA9PT0gJ1JFQURfT05MWV9MT0NLJylcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBzZWxlY3RlZCBmaWxlIGhhcyAqKndyaXRlKiogb3IgKipyZWFkLW9ubHkqKiBsb2NrcyBzcGVjaWZpZWQuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uZmlsZS5pc0xvY2tlZGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzV3JpdGVMb2NrZWQoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuICEhKFxuICAgIGNvbnRleHQgJiZcbiAgICBjb250ZXh0LnNlbGVjdGlvbiAmJlxuICAgIGNvbnRleHQuc2VsZWN0aW9uLmZpbGUgJiZcbiAgICBjb250ZXh0LnNlbGVjdGlvbi5maWxlLmVudHJ5ICYmXG4gICAgY29udGV4dC5zZWxlY3Rpb24uZmlsZS5lbnRyeS5wcm9wZXJ0aWVzICYmXG4gICAgKGNvbnRleHQuc2VsZWN0aW9uLmZpbGUuZW50cnkucHJvcGVydGllc1snY206bG9ja1R5cGUnXSA9PT0gJ1dSSVRFX0xPQ0snIHx8XG4gICAgICBjb250ZXh0LnNlbGVjdGlvbi5maWxlLmVudHJ5LnByb3BlcnRpZXNbJ2NtOmxvY2tUeXBlJ10gPT09XG4gICAgICAgICdSRUFEX09OTFlfTE9DSycpXG4gICk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBzZWxlY3RlZCBmaWxlIGhhcyAqKndyaXRlKiogb3IgKipyZWFkLW9ubHkqKiBsb2NrcyBzcGVjaWZpZWQsXG4gKiBhbmQgdGhhdCBjdXJyZW50IHVzZXIgaXMgdGhlIG93bmVyIG9mIHRoZSBsb2NrLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmZpbGUuaXNMb2NrT3duZXJgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VzZXJXcml0ZUxvY2tPd25lcihjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIGlzV3JpdGVMb2NrZWQoY29udGV4dCkgJiZcbiAgICAoY29udGV4dC5zZWxlY3Rpb24uZmlsZS5lbnRyeS5wcm9wZXJ0aWVzWydjbTpsb2NrT3duZXInXSAmJlxuICAgICAgY29udGV4dC5zZWxlY3Rpb24uZmlsZS5lbnRyeS5wcm9wZXJ0aWVzWydjbTpsb2NrT3duZXInXS5pZCA9PT1cbiAgICAgICAgY29udGV4dC5wcm9maWxlLmlkKVxuICApO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiBsb2NrIHNlbGVjdGVkIGZpbGUuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uZmlsZS5jYW5Mb2NrYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuTG9ja0ZpbGUoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc1dyaXRlTG9ja2VkKGNvbnRleHQpICYmIGNhblVwZGF0ZVNlbGVjdGVkTm9kZShjb250ZXh0KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gdW5sb2NrIHNlbGVjdGVkIGZpbGUuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uZmlsZS5jYW5VbmxvY2tgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5VbmxvY2tGaWxlKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIGNvbnN0IHsgZmlsZSB9ID0gY29udGV4dC5zZWxlY3Rpb247XG4gIHJldHVybiAoXG4gICAgaXNXcml0ZUxvY2tlZChjb250ZXh0KSAmJlxuICAgIChjb250ZXh0LnBlcm1pc3Npb25zLmNoZWNrKGZpbGUuZW50cnksIFsnZGVsZXRlJ10pIHx8XG4gICAgICBpc1VzZXJXcml0ZUxvY2tPd25lcihjb250ZXh0KSlcbiAgKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gdXBsb2FkIGEgbmV3IHZlcnNpb24gb2YgdGhlIGZpbGUuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uZmlsZS5jYW5VcGxvYWRWZXJzaW9uYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuVXBsb2FkVmVyc2lvbihjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBpZiAobmF2aWdhdGlvbi5pc0Zhdm9yaXRlcyhjb250ZXh0KSB8fCBuYXZpZ2F0aW9uLmlzU2hhcmVkRmlsZXMoY29udGV4dCkpIHtcbiAgICByZXR1cm4gaGFzRmlsZVNlbGVjdGVkKGNvbnRleHQpO1xuICB9XG5cbiAgcmV0dXJuIFtcbiAgICBoYXNGaWxlU2VsZWN0ZWQoY29udGV4dCksXG4gICAgbmF2aWdhdGlvbi5pc05vdFRyYXNoY2FuKGNvbnRleHQpLFxuICAgIGlzV3JpdGVMb2NrZWQoY29udGV4dClcbiAgICAgID8gaXNVc2VyV3JpdGVMb2NrT3duZXIoY29udGV4dClcbiAgICAgIDogY2FuVXBkYXRlU2VsZWN0ZWROb2RlKGNvbnRleHQpXG4gIF0uZXZlcnkoQm9vbGVhbik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgaGFzIHRyYXNoY2FuIGl0ZW0gc2VsZWN0ZWQuXG4gKiBKU09OIHJlZjogYGlzVHJhc2hjYW5JdGVtU2VsZWN0ZWRgXG4gKiBAcGFyYW0gY29udGV4dCBSdWxlIGV4ZWN1dGlvbiBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1RyYXNoY2FuSXRlbVNlbGVjdGVkKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBbbmF2aWdhdGlvbi5pc1RyYXNoY2FuKGNvbnRleHQpLCBoYXNTZWxlY3Rpb24oY29udGV4dCldLmV2ZXJ5KEJvb2xlYW4pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiB2aWV3IHRoZSBmaWxlLlxuICogSlNPTiByZWY6IGBjYW5WaWV3RmlsZWBcbiAqIEBwYXJhbSBjb250ZXh0IFJ1bGUgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblZpZXdGaWxlKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBbaGFzRmlsZVNlbGVjdGVkKGNvbnRleHQpLCBuYXZpZ2F0aW9uLmlzTm90VHJhc2hjYW4oY29udGV4dCldLmV2ZXJ5KFxuICAgIEJvb2xlYW5cbiAgKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gKipMZWF2ZSoqIHNlbGVjdGVkIGxpYnJhcnkuXG4gKiBKU09OIHJlZjogYGNhbkxlYXZlTGlicmFyeWBcbiAqIEBwYXJhbSBjb250ZXh0IFJ1bGUgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbkxlYXZlTGlicmFyeShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gW2hhc0xpYnJhcnlTZWxlY3RlZChjb250ZXh0KSwgaGFzTGlicmFyeVJvbGUoY29udGV4dCldLmV2ZXJ5KEJvb2xlYW4pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiB0b2dnbGUgc2hhcmVkIGxpbmsgbW9kZS5cbiAqIEpTT04gcmVmOiBgY2FuVG9nZ2xlU2hhcmVkTGlua2BcbiAqIEBwYXJhbSBjb250ZXh0IFJ1bGUgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblRvZ2dsZVNoYXJlZExpbmsoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuIFtcbiAgICBoYXNGaWxlU2VsZWN0ZWQoY29udGV4dCksXG4gICAgW2NhblNoYXJlRmlsZShjb250ZXh0KSwgaXNTaGFyZWQoY29udGV4dCldLnNvbWUoQm9vbGVhbilcbiAgXS5ldmVyeShCb29sZWFuKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gc2hvdyAqKkluZm8gRHJhd2VyKiogZm9yIHRoZSBzZWxlY3RlZCBub2RlLlxuICogSlNPTiByZWY6IGBjYW5TaG93SW5mb0RyYXdlcmBcbiAqIEBwYXJhbSBjb250ZXh0IFJ1bGUgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblNob3dJbmZvRHJhd2VyKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBbXG4gICAgaGFzU2VsZWN0aW9uKGNvbnRleHQpLFxuICAgIG5hdmlnYXRpb24uaXNOb3RMaWJyYXJpZXMoY29udGV4dCksXG4gICAgbmF2aWdhdGlvbi5pc05vdFRyYXNoY2FuKGNvbnRleHQpXG4gIF0uZXZlcnkoQm9vbGVhbik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIG1hbmFnZSBmaWxlIHZlcnNpb25zIGZvciB0aGUgc2VsZWN0ZWQgbm9kZS5cbiAqIEpTT04gcmVmOiBgY2FuTWFuYWdlRmlsZVZlcnNpb25zYFxuICogQHBhcmFtIGNvbnRleHQgUnVsZSBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuTWFuYWdlRmlsZVZlcnNpb25zKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBbXG4gICAgaGFzRmlsZVNlbGVjdGVkKGNvbnRleHQpLFxuICAgIG5hdmlnYXRpb24uaXNOb3RUcmFzaGNhbihjb250ZXh0KSxcbiAgICAhaGFzTG9ja2VkRmlsZXMoY29udGV4dClcbiAgXS5ldmVyeShCb29sZWFuKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gbWFuYWdlIHBlcm1pc3Npb25zIGZvciB0aGUgc2VsZWN0ZWQgbm9kZS5cbiAqIEpTT04gcmVmOiBgY2FuTWFuYWdlUGVybWlzc2lvbnNgXG4gKiBAcGFyYW0gY29udGV4dCBSdWxlIGV4ZWN1dGlvbiBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5NYW5hZ2VQZXJtaXNzaW9ucyhjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gW1xuICAgIGNhblVwZGF0ZVNlbGVjdGVkTm9kZShjb250ZXh0KSxcbiAgICBuYXZpZ2F0aW9uLmlzTm90VHJhc2hjYW4oY29udGV4dClcbiAgXS5ldmVyeShCb29sZWFuKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gdG9nZ2xlICoqRWRpdCBPZmZsaW5lKiogbW9kZSBmb3Igc2VsZWN0ZWQgbm9kZS5cbiAqIEpTT04gcmVmOiBgY2FuVG9nZ2xlRWRpdE9mZmxpbmVgXG4gKiBAcGFyYW0gY29udGV4dCBSdWxlIGV4ZWN1dGlvbiBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5Ub2dnbGVFZGl0T2ZmbGluZShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gW1xuICAgIGhhc0ZpbGVTZWxlY3RlZChjb250ZXh0KSxcbiAgICBuYXZpZ2F0aW9uLmlzTm90VHJhc2hjYW4oY29udGV4dCksXG4gICAgY2FuTG9ja0ZpbGUoY29udGV4dCkgfHwgY2FuVW5sb2NrRmlsZShjb250ZXh0KVxuICBdLmV2ZXJ5KEJvb2xlYW4pO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZXMgd29ya2Fyb3VuZHMgZm9yIGZvciByZWNlbnQgZmlsZXMgYW5kIHNlYXJjaCBhcGkgaXNzdWVzLlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIHRvZ2dsZSAqKkZhdm9yaXRlKiogc3RhdGUgZm9yIGEgbm9kZS5cbiAqIEBwYXJhbSBjb250ZXh0IFJ1bGUgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblRvZ2dsZUZhdm9yaXRlKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBbXG4gICAgW2NhbkFkZEZhdm9yaXRlKGNvbnRleHQpLCBjYW5SZW1vdmVGYXZvcml0ZShjb250ZXh0KV0uc29tZShCb29sZWFuKSxcbiAgICBbXG4gICAgICBuYXZpZ2F0aW9uLmlzUmVjZW50RmlsZXMoY29udGV4dCksXG4gICAgICBuYXZpZ2F0aW9uLmlzU2hhcmVkRmlsZXMoY29udGV4dCksXG4gICAgICBuYXZpZ2F0aW9uLmlzU2VhcmNoUmVzdWx0cyhjb250ZXh0KSxcbiAgICAgIG5hdmlnYXRpb24uaXNGYXZvcml0ZXMoY29udGV4dClcbiAgICBdLnNvbWUoQm9vbGVhbilcbiAgXS5ldmVyeShCb29sZWFuKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYXBwbGljYXRpb24gc2hvdWxkIHJlbmRlciBsYW5ndWFnZSBwaWNrZXIgbWVudS5cbiAqIEpTT04gcmVmOiBgY2FuU2hvd0xhbmd1YWdlUGlja2VyYFxuICogQHBhcmFtIGNvbnRleHQgUnVsZSBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuU2hvd0xhbmd1YWdlUGlja2VyKGNvbnRleHQ6IEFjYVJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBjb250ZXh0Lmxhbmd1YWdlUGlja2VyO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhcHBsaWNhdGlvbiBzaG91bGQgcmVuZGVyIGxvZ291dCBvcHRpb24uXG4gKiBKU09OIHJlZjogYGNhblNob3dMb2dvdXRgXG4gKiBAcGFyYW0gY29udGV4dCBSdWxlIGV4ZWN1dGlvbiBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5TaG93TG9nb3V0KGNvbnRleHQ6IEFjYVJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiAhY29udGV4dC53aXRoQ3JlZGVudGlhbHM7XG59XG4iXX0=