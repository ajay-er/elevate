import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FoundersService } from '../../data-access/founders.service';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen sm:ml-16 sm:px-10 ml-2 px-2 md:px-20 pt-24">
      <p class="md:text-4xl text-xl mb-2">Subscription history</p>

      <div
        class="bg-white bg-opacity-20 rounded-lg p-4 flex gap-2 justify-between"
      >
        <div class="bg-gray-400 rounded-lg bg-opacity-50 p-3">Plan type</div>
        <div class="bg-gray-400 rounded-lg bg-opacity-50 p-3">Expiry date</div>
        <div class="bg-gray-400 rounded-lg bg-opacity-50 p-3">Status</div>
      </div>
      <ng-container *ngIf="allSubscriptions.length > 0">
        <div
          *ngFor="let item of allSubscriptions"
          class="bg-white gap-2 mt-2 cursor-pointer bg-opacity-5 border border-white sm:mt-8 rounded-lg sm:p-4 p-2 flex  justify-between"
        >
          <div class="rounded-lg bg-opacity-70 p-1 sm:p-3">wow won</div>
          <div class=" rounded-lg bg-opacity-70  sm:p-3">10/12/2023</div>
          <div [ngSwitch]="item.paymentDetails.paymentStatus">
            <div *ngSwitchCase="'SUCCESS'" class="bg-green-100 text-green-800 text-xs font-medium min-w-[80px] text-center rounded-lg p-1 sm:p-3 dark:bg-green-900 dark:text-green-300">
              completed
            </div>
            <div *ngSwitchCase="'PENDING'" class="bg-yellow-100 text-yellow-800 text-xs font-medium min-w-[80px] text-center rounded-lg p-1 sm:p-3 ">
              pending
            </div>
            <div *ngSwitchDefault class="bg-red-100 text-red-800 rounded-lg p-1 sm:p-3 min-w-[80px] text-center text-xs font-medium px-3 dark:bg-red-900 dark:text-red-300">
              failed
            </div>
          </div>

        </div>
      </ng-container>
    </section>
  `,
  styleUrls: ['./subscriptions.component.css'],
})
export class SubscriptionsComponent {
  private founderService = inject(FoundersService);
  protected allSubscriptions: any[] = [];

  ngOnInit() {
    this.founderService.getAllSubscriptions().subscribe((res: any) => {
      this.allSubscriptions = res.result;
      console.log(res);
    });
  }
}
