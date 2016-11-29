(function(module) {
    function imageService() {
        var service = {};
        var selectedImage = "../resources/user_default.png";
        service.setSelectedImage = function(_selectedImage) {
            if (selectedImage) {
                selectedImage = _selectedImage;
            }
        };

        service.getSelectedImage = function() {
            return selectedImage;
        };

        return service;
    }
    module.factory('imageService', imageService);
})(angular.module('profile-img-upload'));
