(function(module) {
    module.directive('cropImage', cropeImage);
    module.directive('uploadImage', uploadImage);

    cropeImage.$inject = ['imageService'];

    function cropeImage(imageService) {
        var directive = {
            restrict: 'E',
            link: linkFunc,
            controller: imgUploadController,
            controllerAs: 'vm',
            bindToController: true
        };

        function linkFunc($scope, element, attrs) {
            var c = new Croppie(element[0], {
                viewport: {
                    width: 220,
                    height: 220
                },
                update: function() {
                    c.result('canvas').then(function(img) {
                        $scope.$apply(function() {
                            $scope.$parent.vm.croppedImage = img;
                            imageService.setSelectedImage(img);
                        });
                    });
                }
            });

            // bind an image to croppie
            c.bind({
                url: $scope.$parent.vm.uploadedImage
            });
        }
        return directive;
    }

    function uploadImage() {
        var directive = {
            link: linkFunc,
            controller: imgUploadController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function linkFunc($scope, element, attrs) {
            //Read selected image and show in photo area
            element.bind("change", function(e) {
                var file = (e.srcElement || e.target).files[0];
                $scope.vm.readFile(file);
            });
        }
    }
}(angular.module('profile-img-upload')));
