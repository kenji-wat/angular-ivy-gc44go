import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `
  <input type="text" name="monkey" (blur)="validateDate($event)"/>
  <input type="text" value="timestamp" name="date" (blur)="quarter($event)" />
  `,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {
  @Input() name: string;

  validateDate(val: any) {
    let v = val.target.value;
    if (this.dateValid(v)) {
      console.log('format ok');
      let d: Date = this.prepTzDateField(v);
      console.log(
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      );
    }
  }

  dateValid(val: any): boolean {
    let d: Date = new Date(Date.parse(val));
    console.log(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
    let b = val.match(/^([0-9]{1,2})-([0-9]{1,2})-([0-9]{4})$/);
    console.log(b);
    return b;
  }

  quarter(date: any) {
    // https://github.com/ungap/structured-clone/
    // let d: Date = new Date('2021-12-08T10:12:32.123Z');
    let c: Date;
    let d: Date = new Date(Date.parse(date.target.value));
    /*
    let utcDate = new Date(
      Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
        d.getMilliseconds()
      )
    );
    let stringValue = utcDate
      .toJSON()
      .split(/.\d{3}Z/)[0]
      .toString();
    console.log(stringValue);
    console.log(d.toDateString()); //Sat Dec 11 2021
    let previousDate = this.previousDate(d);
    console.log(previousDate.toDateString()); //Fri Dec 10 2021
    console.log(this.getYesterday());
    */
    /*
    this.checkNull(c);
    this.checkNull(new Date());
    this.getPrepTimezone();
    */
    this.isQuarterEndDate(d);
  }

  getPrepTimezone() {
    const today: Date = new Date();
    const todayTime: number = today.getTime();
    const timeZone: number = Math.abs(new Date().getTimezoneOffset());
    console.log(
      'todayTime:' + todayTime + ' and timeZone as [GMT + minutes]:' + timeZone
    );
  }

  isQuarterEndDate(date: Date) {
    console.log(new Date().toDateString());
    console.log(date.toDateString());
    console.log(date === new Date());
    console.log(date.toDateString() === new Date().toDateString());
    console.log(
      date.toDateString() ===
        new Date(date.getFullYear(), 12, 8, 0, 0, 0, 0).toDateString()
    );
    const newDate: Date = new Date(date.getFullYear(), 11, 8, 0, 0, 0, 0);
    console.log(date.toDateString() === newDate.toDateString());

    let quarterBeginDate;
    switch (this.getQuarter(date)) {
      case 1:
        quarterBeginDate = new Date(date.getFullYear(), 0, 1);
        break;
      case 2:
        quarterBeginDate = new Date(date.getFullYear(), 3, 1);
        break;
      case 3:
        quarterBeginDate = new Date(date.getFullYear(), 6, 1);
        break;
      case 4:
        quarterBeginDate = new Date(date.getFullYear(), 9, 1);
        break;
    }
    console.log(date.toDateString() == quarterBeginDate.toDateString());
  }

  getQuarter(date: Date) {
    return Math.floor(date.getMonth() / 3) + 1;
  }

  checkNull(dte: any) {
    console.log('1. null: ' + dte === null);
    console.log('2. undefined: ' + dte === undefined);
    console.log('3. value: ' + dte);
    if (dte) {
      console.log('4. exists: ' + dte);
    }
  }

  previousDate(dte: Date) {
    return new Date(dte.setDate(dte.getDate() - 1));
  }

  getYesterday() {
    const today: Date = new Date();
    return this.prepTzDate(new Date(today.setDate(today.getDate() - 1)));
  }

  isBeginOfYear(date: Date) {
    return (
      date.toDateString() == new Date(date.getFullYear(), 0, 1).toDateString()
    );
  }

  isEndOfYear(date: Date) {
    return (
      date.toDateString() == new Date(date.getFullYear(), 11, 31).toDateString()
    );
  }

  prepTzDateField(dte: any) {
    const dteTime = new Date(Date.parse(dte)).getTime();
    return new Date(dteTime + Math.abs(new Date().getTimezoneOffset()) * 60000);
  }

  prepTzDate(dte: Date) {
    return new Date(
      dte.getTime() + Math.abs(new Date().getTimezoneOffset()) * 60000
    );
  }
}
