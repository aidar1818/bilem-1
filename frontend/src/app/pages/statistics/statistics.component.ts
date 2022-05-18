import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { Statistics } from '../../models/statistics.model';
import { fetchStatisticsRequest } from '../../store/statistics/statistics.actions';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  statisticsData: Observable<Statistics | null>;
  statistics!: Statistics;
  sub!: Subscription;
  loading: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.statisticsData = store.select(state => state.statistics.statistics);
    this.loading = store.select(state => state.statistics.fetchLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      this.store.dispatch(fetchStatisticsRequest({userId}));
    });

    this.sub = this.statisticsData.subscribe(statistics => {
      if(statistics) {
        this.statistics = statistics;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
