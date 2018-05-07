import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numObservableSubscription: Subscription;
  customObservableSubscription: Subscription; 

  constructor() { }

  ngOnInit() {
   const myNum = Observable.interval(1000).map(
     (data: number)=> {
        return data*2;
     }
   );
    this.numObservableSubscription = myNum.subscribe(
        (data: number)=> {
          console.log(data);
        }
      )

    const obsTest = Observable.create((obser: Observer<string>) => {
      setTimeout(()=> {
        obser.next("This is my first package");
      }, 2000); 
      setTimeout(() => {
        obser.next("This is my second package");
      }, 4000);
      setTimeout(()=> {
        obser.error("This is error! Not working!!");
      }, 6000);

    });

    this.customObservableSubscription = obsTest.subscribe(
      (data: string)=> {console.log(data)},
      (err: string) => {console.log(err)},
      ()=> {console.log("Completed the Action")}
    )


  }

  ngOnDestroy(){
    this.numObservableSubscription.unsubscribe();
    this.customObservableSubscription.unsubscribe();
  }

}
