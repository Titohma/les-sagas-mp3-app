import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Saga } from 'src/app/entities/saga';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { FileService } from 'src/app/services/file/file.service';
import { SagaService } from 'src/app/services/sagas/saga.service';

@Component({
  selector: 'app-edit-saga',
  templateUrl: './edit-saga.page.html',
  styleUrls: ['./edit-saga.page.scss'],
})
export class EditSagaPage implements OnInit {

  public saga: Saga = new Saga();

  sagaForm: FormGroup;
  attemptedSubmit = false;
  bannerSource = '';
  coverSource = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public authService: AuthService,
    public configService: ConfigService,
    private fileService: FileService,
    private sagaService: SagaService) {
      
      this.sagaForm = this.fb.group({
        title: ['', [Validators.required]],
        status: [],
        synopsis: [],
        origin: [],
        awards: [],
        banner: [''],
        bannerSource: [''],
        cover: [''],
        coverSource: ['']
      });
    }

  ngOnInit() {
    var sagaId: number = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadingController.create({
      message: 'Téléchargement...'
    }).then((loading) => {
      loading.present();
      this.sagaService.getById(sagaId)
        .subscribe(data => {
          this.saga = Saga.fromModel(data);
          loading.dismiss();
        });
    });
  }

  markFieldsDirty() {
    const controls = this.sagaForm.controls;
    for (const field in controls) {
      if (controls[field]) {
        controls[field].markAsDirty();
      }
    }
  }

  async save() {
    this.attemptedSubmit = true;
    if (this.sagaForm.valid) {      
      const controls = this.sagaForm.controls;
      this.loadingController.create({
        message: 'Sauvegarde en cours...'
      }).then((loading) => {
        loading.present();
        loading.dismiss();
      });
    } else {
      this.markFieldsDirty();
    }
  }

  onBannerChange(event : any) {  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(file.size <= this.fileService.maxFileSize) {
        this.sagaForm.patchValue({
          bannerSource: file
        });
        this.bannerSource = file.name;
      }
    }
  }

  onCoverChange(event : any) {  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(file.size <= this.fileService.maxFileSize) {
        this.sagaForm.patchValue({
          coverSource: file
        });
        this.coverSource = file.name;
      }
    }
  }

}
