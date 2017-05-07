module app.productList {
  interface IProductListModel {
    title: string;
    showImage: boolean;
    products: app.domain.IProduct[];
    toggleImage(): void;
  }

  class ProductListCtrl implements IProductListModel {
    // title: string;
    // showImage: boolean;
    // products: app.domain.IProduct[];

    static $inject = ['dataAccessService'];
    constructor(private dataAccessService: app.common.DataAccessService,
                public title: string = 'Product List',
                public showImage: boolean = true,
                public products: app.domain.IProduct[]) {

    // static $inject = ['dataAccessService'];
    // constructor(private dataAccessService: app.common.DataAccessService) {
      // this.title = 'Product Listttt Boiiii';
      // this.showImage = false;
      // this.products = [];

      var productResource = dataAccessService.getProductResource();
      productResource.query((data: app.domain.IProduct[]) => {
        this.products = data;
      });
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }
  }

  angular.module('productManagement').
    controller('ProductListCtrl', ProductListCtrl);
}
