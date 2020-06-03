# NgxDhis2PeriodFilter

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Installation

`npm i @iapps/ngx-dhis2-period-filter --save`

## Contents

`ngx-dhis2-period-filter` provides three period selection types

- Fixed periods
- Relative periods
- Periods range (Dates range)

## Usage

**1. Import NgxDhis2PeriodFilterModule**

```ts
.........
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';

........
@NgModule({
  declarations: [AppComponent],
  imports: [
   ..........
    NgxDhis2PeriodFilterModule
    .......
    ]
    ......
    })
```

**2. Injecting into components.ts to use**

```ts
.........
@Component({
  selector: 'app-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.scss']
})
export class PeriodFilterComponent {
    periodFilterConfig: any = {
        singleSelection: true,
        emitOnSelection: false,
        childrenPeriodSortOrder: 'ASC',
        allowDateRangeSelection: true,
        allowRelativePeriodSelection: true,
        allowFixedPeriodSelection: true
    };
    selectedPeriodItems: any[] = [
        {
        id: '201102',
        type: 'Monthly',
        name: 'February 2011'
        },
        {
        id: '201101',
        type: 'Monthly',
        name: 'January 2011'
        }
    ];

    ........

    onPeriodUpdate(periodObject, action) {
        this.periodObject = periodObject; // see on example of outputs
        this.action = action; // See on example outputs
    }

 }


```

**3. Injecting into components.html to use**
The selection period types to be see depends on the setting of the configuration, just set it true to allow a required selection type (Fixed, Relative or Range)

```
<div>
    <ngx-dhis2-period-filter
        [selectedPeriods]="selectedPeriodItems"
        [periodFilterConfig]="periodFilterConfig"
        [selectedPeriodType]="'Monthly'"
        (update)="onPeriodUpdate($event, 'UPDATE')"
        (change)="onPeriodUpdate($event, 'CHANGE')"
        (close)="onPeriodUpdate($event, 'CLOSE')"
        >
    </ngx-dhis2-period-filter>
</div>

```

Others

- Fixed period Only (set true `allowFixedPeriodSelection: true`)

```
<div>
    <ngx-dhis2-period-filter
        [selectedPeriods]="selectedPeriodItems"
        [periodFilterConfig]="periodFilterConfig"
        [selectedPeriodType]="'Relative Year'"
        (update)="onPeriodUpdate($event, 'UPDATE')"
        (change)="onPeriodUpdate($event, 'CHANGE')"
        (close)="onPeriodUpdate($event, 'CLOSE')"
        >
    </ngx-dhis2-period-filter>
</div>

```

- Relative period Only (set true `allowRelativePeriodSelection: true`)

```
<div>
    <ngx-dhis2-period-filter
        [selectedPeriods]="selectedPeriodItems"
        [periodFilterConfig]="periodFilterConfig"
        [selectedPeriodType]="'Relative Year'"
        (update)="onPeriodUpdate($event, 'UPDATE')"
        (change)="onPeriodUpdate($event, 'CHANGE')"
        (close)="onPeriodUpdate($event, 'CLOSE')"
        >
    </ngx-dhis2-period-filter>
</div>

```

- Range period Only (set true `allowDateRangeSelection: true`)

```
<div>
    <ngx-dhis2-period-filter
        [selectedPeriods]="selectedPeriodItems"
        [periodFilterConfig]="periodFilterConfig"
        [selectedPeriodType]="'Range'"
        (update)="onPeriodUpdate($event, 'UPDATE')"
        (change)="onPeriodUpdate($event, 'CHANGE')"
        (close)="onPeriodUpdate($event, 'CLOSE')"
        >
    </ngx-dhis2-period-filter>
</div>

```

**3. Sample outputs**

- Example 1: Fixed periods

  - action
    `UPDATE`
  - payload

  ````
   {
      "items": [
          {
              "id": "201109",
              "type": "Monthly",
              "name": "Genbot 2011"
          },
          {
              "id": "201108",
              "type": "Monthly",
              "name": "Miazia 2011"
          },
          {
              "id": "201107",
              "type": "Monthly",
              "name": "Megabit 2011"
          },
          {
              "id": "201106",
              "type": "Monthly",
              "name": "Yekatit 2011"
          }
          ],
          "dimension": "pe",
          "changed": true
      }

      ```

  ````

- Example 2: Relative periods

  - action
    `UPDATE`
  - payload

  ````
   {
      "items": [
          {
          "id": "LAST_6_MONTHS",
          "type": "RelativeMonth",
          "name": "Last 6 Months"
          }
      ],
      "dimension": "pe",
      "changed": true
      }

      ```

  ````

- Example 3: Range periods
  - action
    `UPDATE`
  - payload
  ````
   {
  "items": [
      {
      "id": "dates-range",
      "type": "dates-range",
      "name": "2020-04-01 to 2020-05-22",
      "dimension": "ou",
      "startDate": {
          "id": "2020-04-01",
          "name": "2020-04-01"
      },
      "endDate": {
          "id": "2020-05-22",
          "name": "2020-05-22"
      }
      }
  ],
  "dimension": "pe",
  "changed": true
  }

      ```
  ````
