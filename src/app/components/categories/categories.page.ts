import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  categories: any = [];
  constructor(
    private menu: MenuController,
    private categoryService: CategoryService,
    private loading: LoadingService,
    private alertCtrl: AlertController,
    private router: Router


  ) { }

  ngOnInit() {
    this.menu.enable(true, 'menuUser');
    this.getAllCategories()
  }

  getAllCategories() {
    this.loading.show()
    this.categoryService.category().subscribe(res => {
      if (res) {
        this.loading.hide()
        this.categories = res
      } else {
        this.loading.hide()
        this.loading.showFailure("Something went wrong")
      }
    }, err => {
      this.loading.hide()
      this.loading.showFailure("Something went wrong")
    })
  }

  async editProfile(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Category',
      buttons: [
        {
          text: 'Update',
          handler: data => {
            const inputData = {
              Name: data[0],
              Description: data[1],
              Id: 1,
              ModifiedBy: 3
            }
            this.loading.show()
            this.categoryService.updateCategory(inputData).subscribe(data => {
              this.getAllCategories()
              if (data) {
                this.loading.hide()
                this.router.navigate(['/categories'])
                this.loading.showSuccess('Category updated successfully')
              } else {
                this.loading.hide()
                this.loading.showFailure("Something went wrong")
              }
            }, err => {
              this.loading.hide()
              this.loading.showFailure("Something went wrong")
            })
            this.loading.hide()
          }
        },
        {
          text: 'Cancel',
          handler: data => { }
        }
      ],
      cssClass: 'alert-wrapper',
      inputs: [
        {
          placeholder: 'Name',
          value: item.name,
        },
        {
          placeholder: 'Description',
          value: item.description,

        }
      ]
    });

    await alert.present();
  }



}
