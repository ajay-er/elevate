import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { VerifyEmailFormComponent } from "./email-verify-form.component";

@NgModule({
  declarations: [VerifyEmailFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [VerifyEmailFormComponent],
})
export class VerifyEmailFormModule {}
