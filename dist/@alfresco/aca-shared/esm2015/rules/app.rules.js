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
        return context.selection.nodes.some(node => !node.entry.isFavorite);
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
        return context.selection.nodes.every(node => node.entry.isFavorite);
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
    const { currentFolder } = context.navigation;
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
    const { currentFolder } = context.navigation;
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
        return context.selection.nodes.every((node) => {
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
    const folder = context.selection.folder;
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
    const library = context.selection.library;
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
    const library = context.selection.library;
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
    const library = context.selection.library;
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
        const node = context.selection.first;
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
    const { folder } = context.selection;
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
        return context.selection.nodes.some(node => {
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
    const { file } = context.selection;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJ1bGVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFsZnJlc2NvL2FjYS1zaGFyZWQvcnVsZXMvIiwic291cmNlcyI6WyJhcHAucnVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxPQUFPLEtBQUssVUFBVSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sS0FBSyxVQUFVLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFFakQsb0NBR0M7OztJQUZDLHdDQUF3Qjs7SUFDeEIseUNBQXlCOzs7Ozs7OztBQVEzQixNQUFNLFVBQVUsV0FBVyxDQUFDLE9BQW9CO0lBQzlDLE9BQU87UUFDTCxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQ2pDLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO0tBQ25DLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7QUFNRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE9BQW9CO0lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtRQUM5QixJQUNFLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQzlCO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3JFO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDOzs7Ozs7O0FBTUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BQW9CO0lBQ3BELElBQUksQ0FB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b0I7SUFDdkQsT0FBTztRQUNMLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFDeEIsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDakMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUM7S0FDL0MsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkIsQ0FBQzs7Ozs7OztBQU9ELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxPQUFvQjtJQUNwRCxPQUFPO1FBQ0wsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ25FO1lBQ0UsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDakMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDakMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7WUFDbkMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDaEMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ2hCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsT0FBdUI7SUFDM0QsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDO0FBQ2hDLENBQUM7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsYUFBYSxDQUFDLE9BQXVCO0lBQ25ELE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO0FBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBBbGZyZXNjbyBFeGFtcGxlIENvbnRlbnQgQXBwbGljYXRpb25cbiAqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMDUgLSAyMDIwIEFsZnJlc2NvIFNvZnR3YXJlIExpbWl0ZWRcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uLlxuICogSWYgdGhlIHNvZnR3YXJlIHdhcyBwdXJjaGFzZWQgdW5kZXIgYSBwYWlkIEFsZnJlc2NvIGxpY2Vuc2UsIHRoZSB0ZXJtcyBvZlxuICogdGhlIHBhaWQgbGljZW5zZSBhZ3JlZW1lbnQgd2lsbCBwcmV2YWlsLiAgT3RoZXJ3aXNlLCB0aGUgc29mdHdhcmUgaXNcbiAqIHByb3ZpZGVkIHVuZGVyIHRoZSBmb2xsb3dpbmcgb3BlbiBzb3VyY2UgbGljZW5zZSB0ZXJtczpcbiAqXG4gKiBUaGUgQWxmcmVzY28gRXhhbXBsZSBDb250ZW50IEFwcGxpY2F0aW9uIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhlIEFsZnJlc2NvIEV4YW1wbGUgQ29udGVudCBBcHBsaWNhdGlvbiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBbGZyZXNjby4gSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IFJ1bGVDb250ZXh0IH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1leHRlbnNpb25zJztcbmltcG9ydCAqIGFzIG5hdmlnYXRpb24gZnJvbSAnLi9uYXZpZ2F0aW9uLnJ1bGVzJztcbmltcG9ydCAqIGFzIHJlcG9zaXRvcnkgZnJvbSAnLi9yZXBvc2l0b3J5LnJ1bGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBBY2FSdWxlQ29udGV4dCBleHRlbmRzIFJ1bGVDb250ZXh0IHtcbiAgbGFuZ3VhZ2VQaWNrZXI6IGJvb2xlYW47XG4gIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gY29weSBzZWxlY3RlZCBub2RlLlxuICogSlNPTiByZWY6IGBhcHAuY2FuQ29weU5vZGVgXG4gKiBAcGFyYW0gY29udGV4dCBSdWxlIGV4ZWN1dGlvbiBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5Db3B5Tm9kZShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gW1xuICAgIGhhc1NlbGVjdGlvbihjb250ZXh0KSxcbiAgICBuYXZpZ2F0aW9uLmlzTm90VHJhc2hjYW4oY29udGV4dCksXG4gICAgbmF2aWdhdGlvbi5pc05vdExpYnJhcmllcyhjb250ZXh0KVxuICBdLmV2ZXJ5KEJvb2xlYW4pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiBtYXJrIHNlbGVjdGVkIG5vZGVzIGFzICoqRmF2b3JpdGUqKi5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5jYW5BZGRGYXZvcml0ZWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbkFkZEZhdm9yaXRlKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIGlmICghY29udGV4dC5zZWxlY3Rpb24uaXNFbXB0eSkge1xuICAgIGlmIChcbiAgICAgIG5hdmlnYXRpb24uaXNGYXZvcml0ZXMoY29udGV4dCkgfHxcbiAgICAgIG5hdmlnYXRpb24uaXNMaWJyYXJpZXMoY29udGV4dCkgfHxcbiAgICAgIG5hdmlnYXRpb24uaXNUcmFzaGNhbihjb250ZXh0KVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dC5zZWxlY3Rpb24ubm9kZXMuc29tZShub2RlID0+ICFub2RlLmVudHJ5LmlzRmF2b3JpdGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gdW4tbWFyayBzZWxlY3RlZCBub2RlcyBhcyAqKkZhdm9yaXRlKiouXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uY2FuUmVtb3ZlRmF2b3JpdGVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5SZW1vdmVGYXZvcml0ZShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBpZiAoIWNvbnRleHQuc2VsZWN0aW9uLmlzRW1wdHkgJiYgIW5hdmlnYXRpb24uaXNUcmFzaGNhbihjb250ZXh0KSkge1xuICAgIGlmIChuYXZpZ2F0aW9uLmlzRmF2b3JpdGVzKGNvbnRleHQpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQuc2VsZWN0aW9uLm5vZGVzLmV2ZXJ5KG5vZGUgPT4gbm9kZS5lbnRyeS5pc0Zhdm9yaXRlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIHNoYXJlIHNlbGVjdGVkIGZpbGUuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uZmlsZS5jYW5TaGFyZWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblNoYXJlRmlsZShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gW1xuICAgIGNvbnRleHQuc2VsZWN0aW9uLmZpbGUsXG4gICAgbmF2aWdhdGlvbi5pc05vdFRyYXNoY2FuKGNvbnRleHQpLFxuICAgIHJlcG9zaXRvcnkuaGFzUXVpY2tTaGFyZUVuYWJsZWQoY29udGV4dCksXG4gICAgIWlzU2hhcmVkKGNvbnRleHQpXG4gIF0uZXZlcnkoQm9vbGVhbik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIHBlcmZvcm0gXCJKb2luXCIgb3IgXCJDYW5jZWwgSm9pbiBSZXF1ZXN0XCIgb24gYSBsaWJyYXJ5LlxuICogSlNPTiByZWY6IGBjYW5Ub2dnbGVKb2luTGlicmFyeWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblRvZ2dsZUpvaW5MaWJyYXJ5KGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBbXG4gICAgaGFzTGlicmFyeVNlbGVjdGVkKGNvbnRleHQpLFxuICAgICFpc1ByaXZhdGVMaWJyYXJ5KGNvbnRleHQpLFxuICAgIGhhc05vTGlicmFyeVJvbGUoY29udGV4dClcbiAgXS5ldmVyeShCb29sZWFuKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gZWRpdCB0aGUgc2VsZWN0ZWQgZm9sZGVyLlxuICogSlNPTiByZWY6IGBjYW5FZGl0Rm9sZGVyYFxuICogQHBhcmFtIGNvbnRleHQgUnVsZSBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuRWRpdEZvbGRlcihjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gW1xuICAgIGNhblVwZGF0ZVNlbGVjdGVkRm9sZGVyKGNvbnRleHQpLFxuICAgIG5hdmlnYXRpb24uaXNOb3RUcmFzaGNhbihjb250ZXh0KVxuICBdLmV2ZXJ5KEJvb2xlYW4pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgc2VsZWN0ZWQgZmlsZSBpcyBhbHJlYWR5IHNoYXJlZC5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5maWxlLmlzU2hhcmVkYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTaGFyZWQoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgaWYgKG5hdmlnYXRpb24uaXNTaGFyZWRGaWxlcyhjb250ZXh0KSAmJiBjb250ZXh0LnNlbGVjdGlvbi5maWxlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoXG4gICAgKG5hdmlnYXRpb24uaXNOb3RUcmFzaGNhbihjb250ZXh0KSxcbiAgICAhY29udGV4dC5zZWxlY3Rpb24uaXNFbXB0eSAmJiBjb250ZXh0LnNlbGVjdGlvbi5maWxlKVxuICApIHtcbiAgICByZXR1cm4gISEoXG4gICAgICBjb250ZXh0LnNlbGVjdGlvbi5maWxlLmVudHJ5ICYmXG4gICAgICBjb250ZXh0LnNlbGVjdGlvbi5maWxlLmVudHJ5LnByb3BlcnRpZXMgJiZcbiAgICAgIGNvbnRleHQuc2VsZWN0aW9uLmZpbGUuZW50cnkucHJvcGVydGllc1sncXNoYXJlOnNoYXJlZElkJ11cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiBkZWxldGUgc2VsZWN0ZWQgbm9kZXMuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uY2FuRGVsZXRlYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuRGVsZXRlU2VsZWN0aW9uKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIGlmIChcbiAgICBuYXZpZ2F0aW9uLmlzTm90VHJhc2hjYW4oY29udGV4dCkgJiZcbiAgICBuYXZpZ2F0aW9uLmlzTm90TGlicmFyaWVzKGNvbnRleHQpICYmXG4gICAgbmF2aWdhdGlvbi5pc05vdFNlYXJjaFJlc3VsdHMoY29udGV4dCkgJiZcbiAgICAhY29udGV4dC5zZWxlY3Rpb24uaXNFbXB0eVxuICApIHtcbiAgICBpZiAoaGFzTG9ja2VkRmlsZXMoY29udGV4dCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyB0ZW1wIHdvcmthcm91bmQgZm9yIEZhdm9yaXRlcyBhcGlcbiAgICBpZiAobmF2aWdhdGlvbi5pc0Zhdm9yaXRlcyhjb250ZXh0KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG5hdmlnYXRpb24uaXNQcmV2aWV3KGNvbnRleHQpKSB7XG4gICAgICByZXR1cm4gY29udGV4dC5wZXJtaXNzaW9ucy5jaGVjayhjb250ZXh0LnNlbGVjdGlvbi5ub2RlcywgWydkZWxldGUnXSk7XG4gICAgfVxuXG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgU2hhcmVkIEZpbGVzXG4gICAgaWYgKG5hdmlnYXRpb24uaXNTaGFyZWRGaWxlcyhjb250ZXh0KSkge1xuICAgICAgcmV0dXJuIGNvbnRleHQucGVybWlzc2lvbnMuY2hlY2soY29udGV4dC5zZWxlY3Rpb24ubm9kZXMsIFsnZGVsZXRlJ10sIHtcbiAgICAgICAgdGFyZ2V0OiAnYWxsb3dhYmxlT3BlcmF0aW9uc09uVGFyZ2V0J1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRleHQucGVybWlzc2lvbnMuY2hlY2soY29udGV4dC5zZWxlY3Rpb24ubm9kZXMsIFsnZGVsZXRlJ10pO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gdW4tc2hhcmUgc2VsZWN0ZWQgbm9kZXMuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uY2FuVW5zaGFyZWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblVuc2hhcmVOb2Rlcyhjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBpZiAoIWNvbnRleHQuc2VsZWN0aW9uLmlzRW1wdHkpIHtcbiAgICByZXR1cm4gY29udGV4dC5wZXJtaXNzaW9ucy5jaGVjayhjb250ZXh0LnNlbGVjdGlvbi5ub2RlcywgWydkZWxldGUnXSwge1xuICAgICAgdGFyZ2V0OiAnYWxsb3dhYmxlT3BlcmF0aW9uc09uVGFyZ2V0J1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBzZWxlY3RlZCBhbnl0aGluZy5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5ub3RFbXB0eWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc1NlbGVjdGlvbihjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWNvbnRleHQuc2VsZWN0aW9uLmlzRW1wdHk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIGNyZWF0ZSBhIG5ldyBmb2xkZXIgd2l0aCBjdXJyZW50IHBhdGguXG4gKiBKU09OIHJlZjogYGFwcC5uYXZpZ2F0aW9uLmZvbGRlci5jYW5DcmVhdGVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5DcmVhdGVGb2xkZXIoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgY29uc3QgeyBjdXJyZW50Rm9sZGVyIH0gPSBjb250ZXh0Lm5hdmlnYXRpb247XG4gIGlmIChjdXJyZW50Rm9sZGVyKSB7XG4gICAgcmV0dXJuIGNvbnRleHQucGVybWlzc2lvbnMuY2hlY2soY3VycmVudEZvbGRlciwgWydjcmVhdGUnXSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiB1cGxvYWQgY29udGVudCB0byBjdXJyZW50IGZvbGRlci5cbiAqIEpTT04gcmVmOiBgYXBwLm5hdmlnYXRpb24uZm9sZGVyLmNhblVwbG9hZGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblVwbG9hZChjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBjb25zdCB7IGN1cnJlbnRGb2xkZXIgfSA9IGNvbnRleHQubmF2aWdhdGlvbjtcbiAgaWYgKGN1cnJlbnRGb2xkZXIpIHtcbiAgICByZXR1cm4gY29udGV4dC5wZXJtaXNzaW9ucy5jaGVjayhjdXJyZW50Rm9sZGVyLCBbJ2NyZWF0ZSddKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIGRvd25sb2FkIHNlbGVjdGVkIG5vZGVzIChlaXRoZXIgZmlsZXMgb3IgZm9sZGVycykuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uY2FuRG93bmxvYWRgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5Eb3dubG9hZFNlbGVjdGlvbihjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBpZiAoIWNvbnRleHQuc2VsZWN0aW9uLmlzRW1wdHkgJiYgbmF2aWdhdGlvbi5pc05vdFRyYXNoY2FuKGNvbnRleHQpKSB7XG4gICAgcmV0dXJuIGNvbnRleHQuc2VsZWN0aW9uLm5vZGVzLmV2ZXJ5KChub2RlOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIG5vZGUuZW50cnkgJiZcbiAgICAgICAgKG5vZGUuZW50cnkuaXNGaWxlIHx8IG5vZGUuZW50cnkuaXNGb2xkZXIgfHwgISFub2RlLmVudHJ5Lm5vZGVJZClcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGhhcyBzZWxlY3RlZCBhIGZvbGRlci5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5mb2xkZXJgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNGb2xkZXJTZWxlY3RlZChjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBjb25zdCBmb2xkZXIgPSBjb250ZXh0LnNlbGVjdGlvbi5mb2xkZXI7XG4gIHJldHVybiBmb2xkZXIgPyB0cnVlIDogZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgaGFzIHNlbGVjdGVkIGEgbGlicmFyeSAoc2l0ZSkuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24ubGlicmFyeWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0xpYnJhcnlTZWxlY3RlZChjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBjb25zdCBsaWJyYXJ5ID0gY29udGV4dC5zZWxlY3Rpb24ubGlicmFyeTtcbiAgcmV0dXJuIGxpYnJhcnkgPyB0cnVlIDogZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgaGFzIHNlbGVjdGVkIGEgKipwcml2YXRlKiogbGlicmFyeSAoc2l0ZSlcbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5pc1ByaXZhdGVMaWJyYXJ5YFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcml2YXRlTGlicmFyeShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBjb25zdCBsaWJyYXJ5ID0gY29udGV4dC5zZWxlY3Rpb24ubGlicmFyeTtcbiAgcmV0dXJuIGxpYnJhcnlcbiAgICA/ICEhKFxuICAgICAgICBsaWJyYXJ5LmVudHJ5ICYmXG4gICAgICAgIGxpYnJhcnkuZW50cnkudmlzaWJpbGl0eSAmJlxuICAgICAgICBsaWJyYXJ5LmVudHJ5LnZpc2liaWxpdHkgPT09ICdQUklWQVRFJ1xuICAgICAgKVxuICAgIDogZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBzZWxlY3RlZCBsaWJyYXJ5IGhhcyBhICoqcm9sZSoqIHByb3BlcnR5IGRlZmluZWQuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uaGFzTGlicmFyeVJvbGVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNMaWJyYXJ5Um9sZShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBjb25zdCBsaWJyYXJ5ID0gY29udGV4dC5zZWxlY3Rpb24ubGlicmFyeTtcbiAgcmV0dXJuIGxpYnJhcnkgPyAhIShsaWJyYXJ5LmVudHJ5ICYmIGxpYnJhcnkuZW50cnkucm9sZSkgOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHNlbGVjdGVkIGxpYnJhcnkgaGFzIG5vICoqcm9sZSoqIHByb3BlcnR5IGRlZmluZWQuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uaGFzTm9MaWJyYXJ5Um9sZWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc05vTGlicmFyeVJvbGUoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuICFoYXNMaWJyYXJ5Um9sZShjb250ZXh0KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBoYXMgc2VsZWN0ZWQgYSBmaWxlLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmZpbGVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNGaWxlU2VsZWN0ZWQoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5zZWxlY3Rpb24gJiYgY29udGV4dC5zZWxlY3Rpb24uZmlsZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gdXBkYXRlIHRoZSBmaXJzdCBzZWxlY3RlZCBub2RlLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmZpcnN0LmNhblVwZGF0ZWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblVwZGF0ZVNlbGVjdGVkTm9kZShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBpZiAoY29udGV4dC5zZWxlY3Rpb24gJiYgIWNvbnRleHQuc2VsZWN0aW9uLmlzRW1wdHkpIHtcbiAgICBjb25zdCBub2RlID0gY29udGV4dC5zZWxlY3Rpb24uZmlyc3Q7XG5cbiAgICBpZiAobm9kZS5lbnRyeS5pc0ZpbGUgJiYgaGFzTG9ja2VkRmlsZXMoY29udGV4dCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGV4dC5wZXJtaXNzaW9ucy5jaGVjayhub2RlLCBbJ3VwZGF0ZSddKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIHVwZGF0ZSB0aGUgZmlyc3Qgc2VsZWN0ZWQgZm9sZGVyLlxuICogSlNPTiByZWY6IGBhcHAuc2VsZWN0aW9uLmZvbGRlci5jYW5VcGRhdGVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5VcGRhdGVTZWxlY3RlZEZvbGRlcihjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICBjb25zdCB7IGZvbGRlciB9ID0gY29udGV4dC5zZWxlY3Rpb247XG4gIGlmIChmb2xkZXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gd29ya2Fyb3VuZCBmb3IgRmF2b3JpdGVzIEFwaVxuICAgICAgbmF2aWdhdGlvbi5pc0Zhdm9yaXRlcyhjb250ZXh0KSB8fFxuICAgICAgY29udGV4dC5wZXJtaXNzaW9ucy5jaGVjayhmb2xkZXIuZW50cnksIFsndXBkYXRlJ10pXG4gICAgKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgaGFzIHNlbGVjdGVkIGEgKipsb2NrZWQqKiBmaWxlIG5vZGUuXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uZmlsZS5pc0xvY2tlZGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0xvY2tlZEZpbGVzKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIGlmIChjb250ZXh0ICYmIGNvbnRleHQuc2VsZWN0aW9uICYmIGNvbnRleHQuc2VsZWN0aW9uLm5vZGVzKSB7XG4gICAgcmV0dXJuIGNvbnRleHQuc2VsZWN0aW9uLm5vZGVzLnNvbWUobm9kZSA9PiB7XG4gICAgICBpZiAoIW5vZGUuZW50cnkuaXNGaWxlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5lbnRyeS5pc0xvY2tlZCB8fFxuICAgICAgICAobm9kZS5lbnRyeS5wcm9wZXJ0aWVzICYmXG4gICAgICAgICAgbm9kZS5lbnRyeS5wcm9wZXJ0aWVzWydjbTpsb2NrVHlwZSddID09PSAnUkVBRF9PTkxZX0xPQ0snKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHNlbGVjdGVkIGZpbGUgaGFzICoqd3JpdGUqKiBvciAqKnJlYWQtb25seSoqIGxvY2tzIHNwZWNpZmllZC5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5maWxlLmlzTG9ja2VkYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNXcml0ZUxvY2tlZChjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gISEoXG4gICAgY29udGV4dCAmJlxuICAgIGNvbnRleHQuc2VsZWN0aW9uICYmXG4gICAgY29udGV4dC5zZWxlY3Rpb24uZmlsZSAmJlxuICAgIGNvbnRleHQuc2VsZWN0aW9uLmZpbGUuZW50cnkgJiZcbiAgICBjb250ZXh0LnNlbGVjdGlvbi5maWxlLmVudHJ5LnByb3BlcnRpZXMgJiZcbiAgICAoY29udGV4dC5zZWxlY3Rpb24uZmlsZS5lbnRyeS5wcm9wZXJ0aWVzWydjbTpsb2NrVHlwZSddID09PSAnV1JJVEVfTE9DSycgfHxcbiAgICAgIGNvbnRleHQuc2VsZWN0aW9uLmZpbGUuZW50cnkucHJvcGVydGllc1snY206bG9ja1R5cGUnXSA9PT1cbiAgICAgICAgJ1JFQURfT05MWV9MT0NLJylcbiAgKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHNlbGVjdGVkIGZpbGUgaGFzICoqd3JpdGUqKiBvciAqKnJlYWQtb25seSoqIGxvY2tzIHNwZWNpZmllZCxcbiAqIGFuZCB0aGF0IGN1cnJlbnQgdXNlciBpcyB0aGUgb3duZXIgb2YgdGhlIGxvY2suXG4gKiBKU09OIHJlZjogYGFwcC5zZWxlY3Rpb24uZmlsZS5pc0xvY2tPd25lcmBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVXNlcldyaXRlTG9ja093bmVyKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgaXNXcml0ZUxvY2tlZChjb250ZXh0KSAmJlxuICAgIChjb250ZXh0LnNlbGVjdGlvbi5maWxlLmVudHJ5LnByb3BlcnRpZXNbJ2NtOmxvY2tPd25lciddICYmXG4gICAgICBjb250ZXh0LnNlbGVjdGlvbi5maWxlLmVudHJ5LnByb3BlcnRpZXNbJ2NtOmxvY2tPd25lciddLmlkID09PVxuICAgICAgICBjb250ZXh0LnByb2ZpbGUuaWQpXG4gICk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIGxvY2sgc2VsZWN0ZWQgZmlsZS5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5maWxlLmNhbkxvY2tgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5Mb2NrRmlsZShjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzV3JpdGVMb2NrZWQoY29udGV4dCkgJiYgY2FuVXBkYXRlU2VsZWN0ZWROb2RlKGNvbnRleHQpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiB1bmxvY2sgc2VsZWN0ZWQgZmlsZS5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5maWxlLmNhblVubG9ja2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblVubG9ja0ZpbGUoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgY29uc3QgeyBmaWxlIH0gPSBjb250ZXh0LnNlbGVjdGlvbjtcbiAgcmV0dXJuIChcbiAgICBpc1dyaXRlTG9ja2VkKGNvbnRleHQpICYmXG4gICAgKGNvbnRleHQucGVybWlzc2lvbnMuY2hlY2soZmlsZS5lbnRyeSwgWydkZWxldGUnXSkgfHxcbiAgICAgIGlzVXNlcldyaXRlTG9ja093bmVyKGNvbnRleHQpKVxuICApO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiB1cGxvYWQgYSBuZXcgdmVyc2lvbiBvZiB0aGUgZmlsZS5cbiAqIEpTT04gcmVmOiBgYXBwLnNlbGVjdGlvbi5maWxlLmNhblVwbG9hZFZlcnNpb25gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5VcGxvYWRWZXJzaW9uKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIGlmIChuYXZpZ2F0aW9uLmlzRmF2b3JpdGVzKGNvbnRleHQpIHx8IG5hdmlnYXRpb24uaXNTaGFyZWRGaWxlcyhjb250ZXh0KSkge1xuICAgIHJldHVybiBoYXNGaWxlU2VsZWN0ZWQoY29udGV4dCk7XG4gIH1cblxuICByZXR1cm4gW1xuICAgIGhhc0ZpbGVTZWxlY3RlZChjb250ZXh0KSxcbiAgICBuYXZpZ2F0aW9uLmlzTm90VHJhc2hjYW4oY29udGV4dCksXG4gICAgaXNXcml0ZUxvY2tlZChjb250ZXh0KVxuICAgICAgPyBpc1VzZXJXcml0ZUxvY2tPd25lcihjb250ZXh0KVxuICAgICAgOiBjYW5VcGRhdGVTZWxlY3RlZE5vZGUoY29udGV4dClcbiAgXS5ldmVyeShCb29sZWFuKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBoYXMgdHJhc2hjYW4gaXRlbSBzZWxlY3RlZC5cbiAqIEpTT04gcmVmOiBgaXNUcmFzaGNhbkl0ZW1TZWxlY3RlZGBcbiAqIEBwYXJhbSBjb250ZXh0IFJ1bGUgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVHJhc2hjYW5JdGVtU2VsZWN0ZWQoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuIFtuYXZpZ2F0aW9uLmlzVHJhc2hjYW4oY29udGV4dCksIGhhc1NlbGVjdGlvbihjb250ZXh0KV0uZXZlcnkoQm9vbGVhbik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIHZpZXcgdGhlIGZpbGUuXG4gKiBKU09OIHJlZjogYGNhblZpZXdGaWxlYFxuICogQHBhcmFtIGNvbnRleHQgUnVsZSBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuVmlld0ZpbGUoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuIFtoYXNGaWxlU2VsZWN0ZWQoY29udGV4dCksIG5hdmlnYXRpb24uaXNOb3RUcmFzaGNhbihjb250ZXh0KV0uZXZlcnkoXG4gICAgQm9vbGVhblxuICApO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiAqKkxlYXZlKiogc2VsZWN0ZWQgbGlicmFyeS5cbiAqIEpTT04gcmVmOiBgY2FuTGVhdmVMaWJyYXJ5YFxuICogQHBhcmFtIGNvbnRleHQgUnVsZSBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuTGVhdmVMaWJyYXJ5KGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBbaGFzTGlicmFyeVNlbGVjdGVkKGNvbnRleHQpLCBoYXNMaWJyYXJ5Um9sZShjb250ZXh0KV0uZXZlcnkoQm9vbGVhbik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHVzZXIgY2FuIHRvZ2dsZSBzaGFyZWQgbGluayBtb2RlLlxuICogSlNPTiByZWY6IGBjYW5Ub2dnbGVTaGFyZWRMaW5rYFxuICogQHBhcmFtIGNvbnRleHQgUnVsZSBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuVG9nZ2xlU2hhcmVkTGluayhjb250ZXh0OiBSdWxlQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gW1xuICAgIGhhc0ZpbGVTZWxlY3RlZChjb250ZXh0KSxcbiAgICBbY2FuU2hhcmVGaWxlKGNvbnRleHQpLCBpc1NoYXJlZChjb250ZXh0KV0uc29tZShCb29sZWFuKVxuICBdLmV2ZXJ5KEJvb2xlYW4pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiBzaG93ICoqSW5mbyBEcmF3ZXIqKiBmb3IgdGhlIHNlbGVjdGVkIG5vZGUuXG4gKiBKU09OIHJlZjogYGNhblNob3dJbmZvRHJhd2VyYFxuICogQHBhcmFtIGNvbnRleHQgUnVsZSBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuU2hvd0luZm9EcmF3ZXIoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuIFtcbiAgICBoYXNTZWxlY3Rpb24oY29udGV4dCksXG4gICAgbmF2aWdhdGlvbi5pc05vdExpYnJhcmllcyhjb250ZXh0KSxcbiAgICBuYXZpZ2F0aW9uLmlzTm90VHJhc2hjYW4oY29udGV4dClcbiAgXS5ldmVyeShCb29sZWFuKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gbWFuYWdlIGZpbGUgdmVyc2lvbnMgZm9yIHRoZSBzZWxlY3RlZCBub2RlLlxuICogSlNPTiByZWY6IGBjYW5NYW5hZ2VGaWxlVmVyc2lvbnNgXG4gKiBAcGFyYW0gY29udGV4dCBSdWxlIGV4ZWN1dGlvbiBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5NYW5hZ2VGaWxlVmVyc2lvbnMoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuIFtcbiAgICBoYXNGaWxlU2VsZWN0ZWQoY29udGV4dCksXG4gICAgbmF2aWdhdGlvbi5pc05vdFRyYXNoY2FuKGNvbnRleHQpLFxuICAgICFoYXNMb2NrZWRGaWxlcyhjb250ZXh0KVxuICBdLmV2ZXJ5KEJvb2xlYW4pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiBtYW5hZ2UgcGVybWlzc2lvbnMgZm9yIHRoZSBzZWxlY3RlZCBub2RlLlxuICogSlNPTiByZWY6IGBjYW5NYW5hZ2VQZXJtaXNzaW9uc2BcbiAqIEBwYXJhbSBjb250ZXh0IFJ1bGUgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbk1hbmFnZVBlcm1pc3Npb25zKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBbXG4gICAgY2FuVXBkYXRlU2VsZWN0ZWROb2RlKGNvbnRleHQpLFxuICAgIG5hdmlnYXRpb24uaXNOb3RUcmFzaGNhbihjb250ZXh0KVxuICBdLmV2ZXJ5KEJvb2xlYW4pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB1c2VyIGNhbiB0b2dnbGUgKipFZGl0IE9mZmxpbmUqKiBtb2RlIGZvciBzZWxlY3RlZCBub2RlLlxuICogSlNPTiByZWY6IGBjYW5Ub2dnbGVFZGl0T2ZmbGluZWBcbiAqIEBwYXJhbSBjb250ZXh0IFJ1bGUgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblRvZ2dsZUVkaXRPZmZsaW5lKGNvbnRleHQ6IFJ1bGVDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBbXG4gICAgaGFzRmlsZVNlbGVjdGVkKGNvbnRleHQpLFxuICAgIG5hdmlnYXRpb24uaXNOb3RUcmFzaGNhbihjb250ZXh0KSxcbiAgICBjYW5Mb2NrRmlsZShjb250ZXh0KSB8fCBjYW5VbmxvY2tGaWxlKGNvbnRleHQpXG4gIF0uZXZlcnkoQm9vbGVhbik7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlcyB3b3JrYXJvdW5kcyBmb3IgZm9yIHJlY2VudCBmaWxlcyBhbmQgc2VhcmNoIGFwaSBpc3N1ZXMuXG4gKiBDaGVja3MgaWYgdXNlciBjYW4gdG9nZ2xlICoqRmF2b3JpdGUqKiBzdGF0ZSBmb3IgYSBub2RlLlxuICogQHBhcmFtIGNvbnRleHQgUnVsZSBleGVjdXRpb24gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuVG9nZ2xlRmF2b3JpdGUoY29udGV4dDogUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuIFtcbiAgICBbY2FuQWRkRmF2b3JpdGUoY29udGV4dCksIGNhblJlbW92ZUZhdm9yaXRlKGNvbnRleHQpXS5zb21lKEJvb2xlYW4pLFxuICAgIFtcbiAgICAgIG5hdmlnYXRpb24uaXNSZWNlbnRGaWxlcyhjb250ZXh0KSxcbiAgICAgIG5hdmlnYXRpb24uaXNTaGFyZWRGaWxlcyhjb250ZXh0KSxcbiAgICAgIG5hdmlnYXRpb24uaXNTZWFyY2hSZXN1bHRzKGNvbnRleHQpLFxuICAgICAgbmF2aWdhdGlvbi5pc0Zhdm9yaXRlcyhjb250ZXh0KVxuICAgIF0uc29tZShCb29sZWFuKVxuICBdLmV2ZXJ5KEJvb2xlYW4pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhcHBsaWNhdGlvbiBzaG91bGQgcmVuZGVyIGxhbmd1YWdlIHBpY2tlciBtZW51LlxuICogSlNPTiByZWY6IGBjYW5TaG93TGFuZ3VhZ2VQaWNrZXJgXG4gKiBAcGFyYW0gY29udGV4dCBSdWxlIGV4ZWN1dGlvbiBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5TaG93TGFuZ3VhZ2VQaWNrZXIoY29udGV4dDogQWNhUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvbnRleHQubGFuZ3VhZ2VQaWNrZXI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGFwcGxpY2F0aW9uIHNob3VsZCByZW5kZXIgbG9nb3V0IG9wdGlvbi5cbiAqIEpTT04gcmVmOiBgY2FuU2hvd0xvZ291dGBcbiAqIEBwYXJhbSBjb250ZXh0IFJ1bGUgZXhlY3V0aW9uIGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblNob3dMb2dvdXQoY29udGV4dDogQWNhUnVsZUNvbnRleHQpOiBib29sZWFuIHtcbiAgcmV0dXJuICFjb250ZXh0LndpdGhDcmVkZW50aWFscztcbn1cbiJdfQ==