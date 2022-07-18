import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Validator } from 'src/app/utils/validator';
import { Category } from 'src/app/@model/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage implements OnInit {

  myForm: FormGroup;
  errorMessages: any = [];

  productCategory: Category = {
    Name: '',
    Description: '',
    CreatedBy: 0
  }

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private router: Router
) {
    this.errorMessages = Validator.errorMessages
    this.myForm = this.formBuilder.group({
        name: Validator.nameValidator,
        description: Validator.description,
        createdBy: ''
    })
}

  ngOnInit() {
  }

  createCategory(){
    const {name,description} = this.myForm.value 
    let id = parseInt('5')
    this.productCategory.Name = name
    this.productCategory.Description = description
    this.productCategory.CreatedBy = id
    console.log(this.productCategory)
    this.loading.show()
    this.categoryService.createCategory(this.productCategory).subscribe(res => {
      if(res){
        this.loading.hide()
        this.router.navigate(['/categories'])
        this.resetData()
        this.loading.showSuccess('Category Created successfully')
      }else{  
        this.loading.hide()
        this.loading.showFailure('Error while creating category')
      } 
    }, err => {
      this.loading.hide()
      this.loading.showFailure(err.error.title)
    })
  }

  resetData() {
    this.myForm.reset({
      name: '',
      description: '',
    })
  }

}
