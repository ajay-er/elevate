import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FoundersService } from '../../data-access/founders.service';
import { AddOneMonthPipe } from 'src/app/shared/resolvers/addOneMonth.pipe';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule,AddOneMonthPipe],
  template: `
   <section class="min-h-screen sm:ml-16 sm:px-10 ml-2 px-2 md:px-20 pt-24">
  <p class="md:text-4xl text-xl mb-2">Subscription history</p>

  <table class="w-full">
    <thead>
      <tr class="bg-white bg-opacity-20 rounded-lg ">
        <th class="border-white border bg-opacity-50 p-3">Plan type</th>
        <th class="border-white border bg-opacity-50 p-3">Expiry At</th>
        <th class="border-white border bg-opacity-50 p-3">Status</th>
      </tr>
    </thead>
    <tbody>
      <ng-container *ngIf="allSubscriptions.length > 0">
        <tr *ngFor="let item of allSubscriptions" class="bg-white  cursor-pointer bg-opacity-5 border border-white sm:mt-8 rounded-lg sm:p-4 p-2 text-center">
          <td class="rounded-lg bg-opacity-70 p-1 sm:p-3">{{ item.plan }}</td>
          <td class="rounded-lg bg-opacity-70 sm:p-3">{{item.createdAt | appAddOneMonth | date:'short'}}</td>
          <td *ngIf="item.status;failed" class="bg-green-100 text-green-800 text-xs font-medium text-center  p-1 ">
            {{item.status}}
          </td>
            <!-- <td  class="bg-yellow-100 text-yellow-800 text-xs font-medium min-w-[80px] text-center rounded-lg p-1 sm:p-3 ">
              pending
            </td> -->
            <ng-template #failed>
              <td class="bg-red-100 text-red-800 rounded-lg p-1 sm:p-3 min-w-[80px] text-center text-xs font-medium px-3 dark:bg-red-900 dark:text-red-300">
                failed
              </td>
            </ng-template>
            
        </tr>
      </ng-container>
    </tbody>
  </table>
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
