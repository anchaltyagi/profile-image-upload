var imgUploadController = function($scope, $modal, fileReader, imageService) {
    var vm = this;
    vm.uploadedImage = "";
    vm.croppedImage = "";

    vm.openUploadImageModal = function() {
        $modal.open({
            templateUrl: '../views/upload-img-modal.html',
            controller: imgUploadController,
            controllerAs: 'vm',
            bindToController: true
        });
    };

    vm.readFile = function(input, callback) {
        if (input) {
            fileReader.readAsDataUrl(input, $scope)
                .then(function(result) {
                    vm.uploadedImage = result;
                });
        } else {
            console.log("Sorry - you're browser doesn't support the FileReader API");
        }
    };

    vm.getSelectedProfileImage = function() {
        return imageService.getSelectedImage();
    };

    vm.selectProfileImage = function() {
        if (vm.webCamPicture) {
            imageService.setSelectedImage(vm.webCamPicture);
        }
    };
};
imgUploadController.$inject = ['$scope', '$modal', 'fileReader', 'imageService'];
angular.module('profile-img-upload').controller('imgUploadController', imgUploadController);
