var app = angular.module("myApp", [])
app.controller("mainCtrl", mainCtrl)

function mainCtrl($scope, $http){
    
    $scope.Update = function(form){
        $scope.resultList = [];
        var lat = form.lat;
        var lng = form.long;
        var alt = form.ele;

        $.ajax({
        type: 'GET',
        dataType: 'json',
        beforeSend: function(request) {
            request.setRequestHeader('x-access-token', 'e5ccbce54b12fb250b608eeb2109c65d');
        },
        url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lng + '&alt=' + alt ,
        success: function(response) {
            //handle successful response
            console.log(response);
            var currentUV = response.result.uv;
            var curCategory = "";
            
            if (currentUV < 11) {
                if (currentUV < 8) {
                    if (currentUV < 6) {
                        if (currentUV < 3) {
                            curCategory = "Low";
                        }
                        else {
                            curCategory = "Moderate";
                        }
                    }
                    else {
                        curCategory = "High";
                    }
                }
                else {
                    curCategory = "Very High";
                }
            }
            else {
                curCategory = "Extreme";
            }
            $scope.resultList.push({
                level: currentUV,
                category: curCategory
            });

            var maxUV = response.result.uv_max;
            var maxCategory = "";
            if (maxUV < 11) {
                if (maxUV < 8) {
                    if (maxUV < 6) {
                        if (maxUV < 3) {
                            maxCategory = "Low";
                        }
                        else {
                            maxCategory = "Moderate";
                        }
                    }
                    else {
                        maxCategory = "High";
                    }
                }
                else {
                    maxCategory = "Very High";
                }
            }
            else {
                maxCategory = "Extreme";
            }
            $scope.resultList.push({
                level: maxUV,
                category: maxCategory
            });
            console.log($scope.resultList[0]);
            console.log($scope.resultList[1]);
        },
        error: function(response) {
            console.log("error");
        }
        });
    }
}

