import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
} from "@angular/material";
import { SelectComponent } from "../components/select/select.component";

const MAT_MODULES = [
    MatButtonModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatSelectModule, MatOptionModule,
    MatCardModule
];

@NgModule({
    imports: MAT_MODULES,
    exports: MAT_MODULES
})
export class MyMaterialModule {
}
