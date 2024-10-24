import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AlertController, AnimationController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { GroupModalComponent } from 'src/app/components/group-modal/group-modal.component';
import { Group } from 'src/app/core/models/group.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { GroupsService } from 'src/app/core/services/impl/groups.service';
import { MyGroupsService } from 'src/app/core/services/my-groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  _groups:BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
  groups$:Observable<Group[]> = this._groups.asObservable();

  constructor(
    private alertCtrl: AlertController,
    private animationCtrl: AnimationController,
    private groupsSvc:GroupsService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.getMorePeople();
  }


  @ViewChildren('avatar') avatars!: QueryList<ElementRef>;
  @ViewChild('animatedAvatar') animatedAvatar!: ElementRef;
  @ViewChild('animatedAvatarContainer') animatedAvatarContainer!: ElementRef;

  selectedGroup: any = null;
  isAnimating = false;
  page:number = 1;
  pageSize:number = 25;

  
  refresh(){
    this.page=1;
    this.groupsSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Group>)=>{
        this._groups.next([...response.data]);
        this.page++;
      }
    });
  }

  getMorePeople(notify:HTMLIonInfiniteScrollElement | null = null) {
    this.groupsSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Group>)=>{
        this._groups.next([...this._groups.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    });
  }

  async openGroupDetail(Group: any, index: number) {
    this.selectedGroup = Group;
    const avatarElements = this.avatars.toArray();
    const clickedAvatar = avatarElements[index].nativeElement;

    // Obtener las coordenadas del avatar clicado
    const avatarRect = clickedAvatar.getBoundingClientRect();

    // Mostrar el contenedor animado
    this.isAnimating = true;
    

    // Configurar la posición inicial de la imagen animada
    const animatedAvatarElement = this.animatedAvatar.nativeElement as HTMLElement;
    animatedAvatarElement.style.position = 'absolute';
    animatedAvatarElement.style.top = `${avatarRect.top}px`;
    animatedAvatarElement.style.left = `${avatarRect.left}px`;
    animatedAvatarElement.style.width = `${avatarRect.width}px`;
    animatedAvatarElement.style.height = `${avatarRect.height}px`;

    // Crear la animación
    const animation = this.animationCtrl.create()
      .addElement(animatedAvatarElement)
      .duration(500)
      .easing('ease-out')
      .fromTo('transform', 'translate(0, 0) scale(1)', `translate(${window.innerWidth / 2 - avatarRect.left - avatarRect.width / 2}px, ${window.innerHeight / 2 - avatarRect.top - avatarRect.height / 2}px) scale(5)`);

    // Iniciar la animación
    await animation.play();

    // Opcional: Puedes agregar lógica adicional después de la animación
    // Por ejemplo, mostrar más información, navegar a otra página, etc.

    // Resetear la animación después de completarla
    //this.isAnimating = false;
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.getMorePeople(ev.target); 
  }

  private async presentModalGroups(mode:'new'|'edit', group:Group|undefined=undefined){
    const modal = await this.modalCtrl.create({
      component:GroupModalComponent,
      componentProps:(mode=='edit'?{
        group: group
      }:{})
    });
    modal.onDidDismiss().then((response:any)=>{
      switch (response.role) {
        case 'new':
          this.groupsSvc.add(response.data).subscribe({
            next:res=>{
              this.refresh();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.groupsSvc.update(group!.id, response.data).subscribe({
            next:res=>{
              this.refresh();
            },
            error:err=>{}
          });
          break;
        default:
          break;
      }
    });
    await modal.present();
  }

  async onAddGroups(){
    await this.presentModalGroups('new');
  }

  deleteGroups(id:string){
    this.groupsSvc.delete(id).subscribe({
      next:res=>{
        this.refresh();
      },
      error:err=>{}
    });
    
  }

  async onDeleteGroupsConfirm(id:string){
    const alert = await this.alertCtrl.create({
      header: 'ATENCIÓN',
      message: '¿Desea borrar este usuario?',
      buttons: [
        {
          text: 'Yes',
          handler:() =>{
            this.deleteGroups(id)
          }
        },
        {
          text: 'No',
          htmlAttributes: {
            'aria-label': 'close',
          },
        },
      ],
    });

    await alert.present();
  }

}
