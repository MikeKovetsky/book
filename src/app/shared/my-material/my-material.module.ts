import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
} from "@angular/material";

const MAT_MODULES = [
    MatButtonModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatSelectModule, MatOptionModule
];

@NgModule({
    imports: MAT_MODULES,
    exports: MAT_MODULES
})
export class MyMaterialModule {
}
