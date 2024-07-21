import { Component, OnInit  } from '@angular/core';
import { QueryService } from '../query.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';





@Component({
  selector: 'app-query-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `
  
   <div class="px-4 py-3 w-1/2">
  
    <label for="chat" class="sr-only">Your message</label>
    <div class="flex items-center  px-3 py-2 rounded-lg bg-gray-300 dark:bg-gray-700">
        <textarea
         id="chat" 
         rows="1" 
        [(ngModel)]="query"
         class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter SQL query here"
         ></textarea>
            <button 
            type="submit" 
             (click)="executeQuery()"
            class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
            <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
            </svg>
            <span class="sr-only">Send message</span>
        </button>
    </div>
   </div>
   
   
   <!-- <div *ngIf="query_error">
   </div> -->
   
    <!-- <div *ngIf="result.length; else errorFound"
    class="relative overflow-x-auto shadow-md sm:rounded-lg"
    >
  
    
      <table class="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th *ngFor="let col of columns"
            scope="col" class="px-6 py-3"
            >{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of result"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td *ngFor="let col of columns"
            class="w-4 p-4"
            ><p class="text-gray-800 dark:text-white">{{col}} :</p> {{ row[col] }}</td>
          </tr>
        </tbody>
      </table>
      </div>
     -->
  
    <ng-template #errorFound>
      <div *ngIf="query_error; else notFound">
      <p     
      class="text-red-500">
        {{(query_error)}}
      </p>
      </div> 

      <ng-template #notFound>
      <p     
      class="text-red-500">
         NO Data Found
      </p>
      </ng-template>

    </ng-template>
    
    
<div class="element">
<div class="block max-w-7xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<div *ngIf="result.length; else errorFound"
    class="relative overflow-x-auto shadow-md sm:rounded-lg"
    >
  
    
      <table datatable  class="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th *ngFor="let col of columns"
            scope="col" class="px-6 py-3"
            >{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of result"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td *ngFor="let col of columns"
            class="w-4 p-4"
            ><p class="text-gray-800 dark:text-white">{{col}} :</p> {{ row[col] }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    
</div>

</div>


  `,
  styleUrl: './query-form.component.css'
})
export class QueryFormComponent {
  query: string = '';
  result: any[] = [];
  columns: string[] = [];
  query_error: string |null = null;
  
  constructor(private queryService: QueryService) { }


  executeQuery() {
    this.queryService.executeQuery(this.query).subscribe({
      next: (data: any[]) => {
        this.result = data;
       
        if (data.length > 0) {
          this.columns = Object.keys(data[0]);
        }
      },
      error: (error) => {
        this.result=[];
        this.columns=[];
        console.error('Error executing query', error);
        this.query_error='Error Query in execution : '+error.error;
        console.error('Error Query in execution',error);
      },
      complete: () => {
        this.query_error=null;
        console.info('Query execution complete');
      }
    });
  }
  // executeQuery() {
  //   this.queryService.executeQuery(this.query).then(
  //     (data: any[]) => {
  //       this.result = data;
  //       if (data.length > 0) {
  //         this.columns = Object.keys(data[0]);
  //       }
  //     },
  //   );
  // }
  
}
