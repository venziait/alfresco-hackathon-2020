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
import { OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
export declare class SearchHighlightComponent implements OnInit, OnDestroy {
    private store;
    private alfrescoApiService;
    private router;
    context: any;
    locationField: TemplateRef<any>;
    private node;
    private onDestroy$;
    name$: BehaviorSubject<string>;
    title$: BehaviorSubject<string>;
    highlight: [];
    constructor(store: Store<any>, alfrescoApiService: AlfrescoApiService, router: Router);
    ngOnInit(): void;
    private updateValues;
    ngOnDestroy(): void;
    readonly description: string;
    readonly modifiedAt: Date;
    readonly size: number;
    readonly user: string;
    readonly isFile: boolean;
    showPreview(event: MouseEvent): void;
    navigate(event: MouseEvent): void;
}
