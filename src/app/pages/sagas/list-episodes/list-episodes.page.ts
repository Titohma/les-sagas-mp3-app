import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Episode } from 'src/app/entities/episode';
import { Saga } from 'src/app/entities/saga';
import { Season } from 'src/app/entities/season';
import { SeasonModel } from 'src/app/models/season.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { EpisodesService } from 'src/app/services/episodes/episodes.service';
import { SagaService } from 'src/app/services/sagas/saga.service';
import { SeasonService } from 'src/app/services/seasons/season.service';

@Component({
  selector: 'app-list-episodes',
  templateUrl: './list-episodes.page.html',
  styleUrls: ['./list-episodes.page.scss'],
})
export class ListSeasonsPage implements OnInit {

  public item: Saga = new Saga();

  constructor(
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    private authService: AuthService,
    public configService: ConfigService,
    private episodeService: EpisodesService,
    private sagaService: SagaService,
    private seasonService: SeasonService) { }


  ngOnInit() {
    var itemId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadingController.create({
      message: 'Téléchargement...'
    }).then((loading) => {
      loading.present();
      this.sagaService.getById(itemId)
        .subscribe(data => {
          this.item = Saga.fromModel(data);
          this.seasonService.getAllByIds(data.seasonsRef)
            .subscribe(data => {
              this.item.seasons = Season.fromModels(data);
              let episodeIds = [];
              this.item.seasons.forEach(season => {
                episodeIds.push(season.episodesRef);
              });
              this.episodeService.getAllByIds(episodeIds)
                .subscribe(data => {
                  const episodes = Episode.fromModels(data);
                  episodes.forEach(episode => {
                    this.item.seasons.find(season => season.id === episode.seasonRef).episodes.push(episode);
                  })
                  loading.dismiss();
                })
            });
        });
    });
  }

  create() {
    const season = new SeasonModel();
    season.sagaRef = this.item.id;
    season.number = this.item.seasons.length + 1;
    this.seasonService.create(season)
      .subscribe(() => {
        this.ngOnInit();
      })
  }

}
