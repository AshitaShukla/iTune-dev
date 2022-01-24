var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.searchStr = "";
  $scope.tuneDataList = [];

  $scope.searchFunction = function () {
    let str = $scope.searchStr;
    str.trim();
    let newStr = str.replace(/\s/g, '+');
    let url = "https://itunes.apple.com/search?media=music&term=" + newStr + "&entity=allTrack&attribute=songTerm";
    getRequest(url);
    $scope.criteria = angular.copy($scope.tuneDataList);
  }

  function getRequest(url) {
    $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
      let data = response.data.results;
      let newData = checkJson(data);
      $scope.tuneDataList = newData;
    });
  }

  function checkJson(data) {
    data.filter(function (obj, i) {
      if (obj.hasOwnProperty("trackName")) {
        data.splice(obj, 1);
      }

    })
    return data;
  }
  $scope.filter2 = function (p) {
    if (p.trackName !== null) {
      return p.trackName;
    } else {
      return;
    }
  };

  $scope.sortTable = function (n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }



});



