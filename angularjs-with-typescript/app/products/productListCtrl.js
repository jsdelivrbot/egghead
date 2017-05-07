var app;
(function (app) {
    var productList;
    (function (productList) {
        var ProductListCtrl = (function () {
            function ProductListCtrl(dataAccessService, title, showImage, products) {
                // static $inject = ['dataAccessService'];
                // constructor(private dataAccessService: app.common.DataAccessService) {
                // this.title = 'Product Listttt Boiiii';
                // this.showImage = false;
                // this.products = [];
                if (title === void 0) { title = 'Product List'; }
                if (showImage === void 0) { showImage = true; }
                var _this = this;
                this.dataAccessService = dataAccessService;
                this.title = title;
                this.showImage = showImage;
                this.products = products;
                var productResource = dataAccessService.getProductResource();
                productResource.query(function (data) {
                    _this.products = data;
                });
            }
            ProductListCtrl.prototype.toggleImage = function () {
                this.showImage = !this.showImage;
            };
            return ProductListCtrl;
        }());
        // title: string;
        // showImage: boolean;
        // products: app.domain.IProduct[];
        ProductListCtrl.$inject = ['dataAccessService'];
        angular.module('productManagement').
            controller('ProductListCtrl', ProductListCtrl);
    })(productList = app.productList || (app.productList = {}));
})(app || (app = {}));
