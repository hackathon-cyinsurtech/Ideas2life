import { Component, EventEmitter, NgModule, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

const Days = [
  {
    formatted: 'all',
    string: 'All Days',
  },
  {
    formatted: 'weekdays',
    string: 'Monday to Friday',
  },
  {
    formatted: 'monday',
    string: 'Monday',
  },
  {
    formatted: 'tuesday',
    string: 'Tuesday',
  },
  {
    formatted: 'wednesday',
    string: 'Wednesday',
  },
  {
    formatted: 'thursday',
    string: 'Thursday',
  },
  {
    formatted: 'friday',
    string: 'Friday',
  },
  {
    formatted: 'saturday',
    string: 'Saturday',
  },
  {
    formatted: 'sunday',
    string: 'Sunday',
  },
];
const MapDays = {
  'all': 'All Days',
  'weekdays': 'Monday to Friday',
  'monday': 'Monday',
  'tuesday': 'Tuesday',
  'wednesday': 'Wednesday',
  'thursday': 'Thursday',
  'friday': 'Friday',
  'saturday': 'Saturday',
  'sunday': 'Sunday',
};
const Hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const Minutes = ['00', '15', '30', '45'];
const DefaultObject = {
  'day': 'monday',
  'from_hour': '01',
  'from_minutes': '00',
  'to_hour': '02',
  'to_minutes': '00',
};

@Component({
  selector: 'i2l-datescheduling',
  template: `
      <div class="ui-date--scheduling">
          <table cellspacing="0" cellpadding="0">
              <tbody>
              <tr>
                  <td align="left">
                      <div *ngFor="let x of constructedObject; let i = index;" class="ui--date-period-widget"
                           [attr.data-key]="i">
                          <div class="date cDe-a cUd-c cUe-d cUe-c" (click)="showDays($event)">
                              <div class="cDe-a cUd-d">{{mapDays[x.day]}}</div>
                              <div class="cDe-a cUd-a"></div>
                          </div>
                          <div class="hours cDe-a cUd-c cUe-d" (click)="showHours($event, 'from')">
                              <div class="cDe-a cUd-d">{{x.from_hour}}</div>
                              <div class="cDe-a cUd-a"></div>
                          </div>
                          <span>:</span>
                          <div class="cDe-a cUd-c cUe-d" (click)="showMinute($event, 'from')">
                              <div class="cDe-a cUd-d">{{x.from_minutes}}</div>
                              <div class="cDe-a cUd-a"></div>
                          </div>
                          <span class="aw-setting-ad-schedule-smaller-text" style="margin: 0 2px;"> to </span>
                          <div class="cDe-a cUd-c cUe-d" (click)="showHours($event, 'to')">
                              <div class="cDe-a cUd-d">{{x.to_hour}}</div>
                              <div class="cDe-a cUd-a"></div>
                          </div>
                          <span>:</span>
                          <div class="cDe-a cUd-c cUe-d" (click)="showMinute($event, 'to')">
                              <div class="cDe-a cUd-d">{{x.to_minutes}}</div>
                              <div class="cDe-a cUd-a"></div>
                          </div>
                          <span class="aw-setting-widget-horizontal-spacing">
                        <a class="aw-setting-ad-schedule-remove cUe-a" title="Remove"></a>
                    </span>
                      </div>
                      <a href="#" (click)="add($event)">+ Add</a>
                  </td>
              </tr>
              </tbody>
          </table>
          <!--<div class="aw-savecancel-panel">
              <button class="btn btn-primary">Save</button>
              <button class="btn btn-danger">Clear</button>
          </div>-->
      </div>
      <div #dateDropdown class="ui--date-period-widget--dropdown days-dropdown"
           [ngClass]="{'is-active': showingDropdowns.days}" [attr.data-key]="currentKey">
          <ul class="cUd-f" (click)="selectDate($event)">
              <ng-container *ngFor="let day of days">
                  <li class="cUd-e" [attr.data-date]="day.formatted">{{day.string}}</li>
              </ng-container>
          </ul>
      </div>
      <div #hoursDropdown class="ui--date-period-widget--dropdown hours-dropdown"
           [ngClass]="{'is-active': showingDropdowns.hours}">
          <ul class="cUd-f" (click)="selectHour($event)">
              <ng-container *ngFor="let hour of hours">
                  <li class="cUd-e" [attr.data-hour]="hour">{{hour}}</li>
              </ng-container>
          </ul>
      </div>
      <div #minutesDropdown class="ui--date-period-widget--dropdown minutes-dropdown is-active"
           [ngClass]="{'is-active': showingDropdowns.minutes}">
          <ul class="cUd-f" (click)="selectMinute($event)">
              <ng-container *ngFor="let minute of minutes">
                  <li class="cUd-e" [attr.data-minute]="minute">{{minute}}</li>
              </ng-container>
          </ul>
      </div>
  `,
})
export class DateScheduling implements OnInit {
  days = Days;
  mapDays = MapDays;
  hours = Hours;
  minutes = Minutes;
  showingDropdowns = {
    days: false,
    hours: false,
    minutes: false,
  };
  constructedObject = [{
    'day': 'monday',
    'from_hour': '01',
    'from_minutes': '00',
    'to_hour': '02',
    'to_minutes': '00',
  }];
  offsetLeft = 0;
  offsetTop = 0;
  currentKey: number;
  hoursType = 'from';
  minutesType = 'from';
  @ViewChild('dateDropdown') dateDropdown;
  @ViewChild('hoursDropdown') hoursDropdown;
  @ViewChild('minutesDropdown') minutesDropdown;
  @Output() onComponentInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDateChanged: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.onComponentInit.emit({
      value: this.constructedObject,
    });
  }
  add(ev) {
    ev.preventDefault();
    this.constructedObject.push(Object.assign({}, DefaultObject));
    this.onDateChanged.emit({
      value: this.constructedObject
    });
  }

  showDays(ev: MouseEvent) {
    this.closeAll();
    this.showingDropdowns.days = !this.showingDropdowns.days;
    const target = ev.target['classList'].contains('date') ? ev.target : ev.target['parentNode'];
    this.currentKey = target.parentNode.getAttribute('data-key');
    this.dateDropdown.nativeElement.style.left = target.offsetLeft + 'px';
    this.dateDropdown.nativeElement.style.top = target.offsetTop + 'px';
  }

  showHours(ev, type) {
    this.closeAll();
    this.showingDropdowns.hours = !this.showingDropdowns.hours;
    const target = ev.target['classList'].contains('hours') ? ev.target : ev.target['parentNode'];
    this.currentKey = target.parentNode.getAttribute('data-key');
    this.hoursDropdown.nativeElement.style.left = target.offsetLeft + 'px';
    this.hoursDropdown.nativeElement.style.top = target.offsetTop + 'px';
    this.hoursType = type;
  }

  showMinute(ev, type) {
    this.closeAll();
    this.showingDropdowns.minutes = !this.showingDropdowns.minutes;
    const target = ev.target['classList'].contains('minutes') ? ev.target : ev.target['parentNode'];
    this.currentKey = target.parentNode.getAttribute('data-key');
    this.minutesDropdown.nativeElement.style.left = target.offsetLeft + 'px';
    this.minutesDropdown.nativeElement.style.top = target.offsetTop + 'px';
    this.minutesType = type;
  }

  closeAll() {
    for (const x in this.showingDropdowns) {
      this.showingDropdowns[x] = false;
    }
  }

  selectDate(ev) {
    this.constructedObject[this.currentKey].day = ev.target.getAttribute('data-date');
    this.showingDropdowns.days = !this.showingDropdowns.days;
    this.onDateChanged.emit({
      value: this.constructedObject
    });
  }

  selectHour(ev) {
    this.constructedObject[this.currentKey][`${this.hoursType}_hour`] = ev.target.getAttribute('data-hour');
    this.showingDropdowns.hours = !this.showingDropdowns.hours;
    this.onDateChanged.emit({
      value: this.constructedObject
    });
  }

  selectMinute(ev) {
    this.constructedObject[this.currentKey][`${this.minutesType}_minutes`] = ev.target.getAttribute('data-minute');
    this.showingDropdowns.minutes = !this.showingDropdowns.minutes;
    this.onDateChanged.emit({
      value: this.constructedObject
    });
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [DateScheduling],
  declarations: [DateScheduling],
})
export class DateSchedulingModule {}
