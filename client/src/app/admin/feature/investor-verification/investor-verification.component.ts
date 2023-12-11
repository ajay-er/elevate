import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IInvestorData } from 'src/app/shared/interfaces';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';
import { FormatInvestmentAmountPipe } from "../../../shared/resolvers/FormatInvestmentAmount.pipe";
import { CommonApiService } from 'src/app/shared/data-access/api.service';

@Component({
  selector: 'app-investor-verification',
  standalone: true,
  template: `
<div class="p-4 pt-24 sm:ml-64 min-h-screen">
  <div class="container mx-auto py-8">
    <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
      <div class="col-span-4 sm:col-span-3">
        <div *ngIf="investor" class="bg-gray-300 shadow rounded-lg p-6">
          <div class="flex flex-col items-center">
            <img
              [src]="investor.user.profileImgUrl"
              class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
            />

            <p class="text-2xl uppercase font-bold">{{investor.user.firstName + ' ' + investor.user.lastName }}</p>
            <p class="font-bold">{{investor.user.email}}</p>
            <p class="font-bold">{{investor.phone}}</p>
            <div class="mt-3 flex flex-wrap gap-4 justify-center">
              <app-loading-button
                [label]="'Verify'"
                [buttonClass]="'bg-blue-700 text-white px-6 py-2'"
              ></app-loading-button>
            </div>
          </div>
          <hr class="my-6 border-t border-gray-300" />
          <div class="items-center justify-center flex">
            <!-- linkdin -->
            <div class="p-2">
              <a
                class="text-white hover:text-blue-500"
                aria-label="Visit TrendyMinds LinkedIn"
                [href]="investor.socialMediaLinks.linkedin"
                target="_blank"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="h-6"
                >
                  <path
                    fill="currentColor"
d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  ></path>
                </svg>
              </a>
            </div>
            <!-- yt -->
            <div class="p-2">
              <a
                class="text-white hover:text-orange-500"
                aria-label="Visit TrendyMinds YouTube"
                [href]="investor.socialMediaLinks.youtube"
                target="_blank"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  class="h-6"
                >
                  <path
                    fill="currentColor"
                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                  ></path>
                </svg>
              </a>
            </div>
            <!-- fb -->
            <div class="p-2">
              <a
                class="text-white hover:text-blue-600"
                aria-label="Visit TrendyMinds Facebook"
                [href]="investor.socialMediaLinks.facebook"
                target="_blank"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  class="h-6"
                >
                  <path
                    fill="currentColor"
                    d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  ></path>
                </svg>
              </a>
            </div>
            <!-- twitter -->
            <div class="p-2">
              <a
                class="text-white hover:text-blue-500"
                aria-label="Visit TrendyMinds Twitter"
                [href]="investor.socialMediaLinks.twitter"
                target="_blank"
                ><svg
                  class="h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div  *ngIf="investor" class="col-span-4 sm:col-span-9">
        <div class="bg-gray-300 shadow rounded-lg p-6">
          <h2 class="text-xl font-bold mb-4">Bio</h2>
          <p class="text-white opacity-80">
            {{investor.bio}}
          </p>
          <h2 class="text-xl font-bold mt-6 mb-4">Locations</h2>
          <div class="flex-wrap flex gap-2" *ngFor="let location of investor.investmentLocations">
            <div 
              class="bg-red-200 rounded-lg shadow-lg w-fit text-black px-4 py-2"
            >
              {{ location }}
            </div>
          </div>
          <div class="mt-6">
            <h2 class="text-xl font-bold">Markets</h2>
            <div class="flex-wrap flex gap-2" *ngFor="let market of investor.investmentMarkets">
              <div 
                class="bg-red-200 rounded-lg shadow-lg w-fit text-black px-4 py-2"
              >
                {{market}}
              </div>
            </div>
          </div>
          <div class="mt-4">
            <p class="font-extrabold text-lg">
              Investment Count:
              <span class="text-blue-400 text-md"> {{investor.totalInvestmentCount }}  <span class="text-sm text-blue-200">investments</span></span>
            </p>
          </div>
          <div class="mt-4">
            <p class="font-extrabold text-lg">
              Investment Amount:
              <span class="text-blue-400 text-md"> {{investor.investmentAmount | appFormatInvestmentAmount }} <span class="text-sm text-blue-200">rupees</span></span>
            </p>
          </div>
          <div class="flex justify-center mt-3">
            <p class="text-xl sm:text-3xl font-semibold uppercase text-gray-200">
              Past Investments
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div>
              <a
                class="block md:max-w-[30%] p-6 bg-white bg-opacity-80 border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
              >
                <p
                  class="mb-2 md:text-xl text-lg font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  Noteworthy
                </p>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./investor-verification.component.css'],
  imports: [
    CommonModule, LoadingButtonModule, RouterModule,
    FormatInvestmentAmountPipe
  ]
})
export class InvestorVerificationComponent { 
  investor!: IInvestorData;
  private route = inject(ActivatedRoute);
  private common = inject(CommonApiService);
  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      const id  = param.get('id');
      if (!id) { return; }
      this.common.getProfileInvestors(id).subscribe((res:any) => {
        this.investor = res.investor;
      });
    });
    console.log(this.investor);
  }
}
