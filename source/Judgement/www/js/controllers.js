angular.module('starter.controllers', ['ngResource'])

//*************************************//


  .controller('LoginCtrl', function ($scope, $state, $http, $window, $httpParamSerializerJQLike) {

    // $scope.data = {};
    $scope.pageClass = 'home';
    $scope.home = function () {
      console.log("home page !");
      $state.go('home');
    }
    $scope.pageClass = 'login';
    $scope.login = function (username, password) {
      //console.log("inside login function");


      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//judges?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function (response) {
        var list = response;
        var count = 0;
        for (i = 0; i < list.length; i++) {


          if (list[i].username == username && list[i].password == password) {
            localStorage.setItem("username", list[i].username);
            localStorage.setItem("password", list[i].password);
            localStorage.setItem("id_user", list[i]._id.$oid);
            //alert("Login success");
            console.log("inside if loop");
            $state.go('judgedetails');

          }
          else {
            //alert("Incorrect username/password");
            count++;

          }
        }
        if (count == list.length) {
          document.getElementById('x').innerHTML = "Invalid Creditials! Please try again....";

        }
      })
    }
  })
  //*************************************//
  //end of login controller


  //begin of adminloginCtrl controller
  .controller('adminloginCtrl', function ($scope, $state, $http, $ionicViewService, $ionicHistory, $window, $httpParamSerializerJQLike) {
    // $scope.data = {};
    $scope.pageClass = 'home';
    $scope.home = function () {
      console.log("home page !");
      $state.go('home');
    }
    $scope.pageClass = 'logout';
    $scope.logout = function () {

      console.log("logged out!");
      $state.go('login');
    }
    $scope.pageClass = 'adminlogin';
    $scope.adminlogin = function (username, password) {
      //console.log("inside login function");
      inside.getMethod();
      $scope.client = username;

      $scope.user1 = username;
      $scope.pass1 = password;
      console.log($scope.user1);
      console.log($scope.pass1);


      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//admin?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function (response) {
        var list = response;
        var count = 0;
        for (i = 0; i < list.length; i++) {


          if (list[i].username == username && list[i].password == password) {
            localStorage.setItem("username", list[i].username);
            localStorage.setItem("password", list[i].password);
            localStorage.setItem("id_user", list[i]._id.$oid);
            localStorage.setItem("email", list[i].email);
            //alert("Login success");
            console.log("inside if loop");
            $state.go('adminhome');

          }
          else {
            //alert("Incorrect username/password");
            count++;

          }
        }
        if (count == list.length) {
          document.getElementById('x').innerHTML = "Invalid Creditials! Please try again....";

        }
      })
    }
  })

  //end of adminloginCtrl controller

  //beginning of judgedetails controller

  .controller('judgedetails', function ($scope, $state, $ionicHistory, $http, $resource) {


    $scope.pageClass = 'skip';
    $scope.skip = function () {
      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//judgedeclaration?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function (response) {

        var list = response;
        var count=0;

        for (var i = 0; i < list.length; i++) {


          if(list[i].username!=localStorage.username)
          {
            count++;
          }

        }

        if(count==list.length){

          $state.go("judgeHome")
        }
        else{
          alert(" you had submitted your scores...!!! ")
        }
      })

    }

    $scope.pageClass = 'finaleresults';
    $scope.finaleresults = function () {
      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//declareresults?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function (response) {

        var list = response;
        var count=0;

        for (var i = 0; i < list.length; i++) {

          console.log(list.length);

              if(list[i].public=="yes")
              {
                $state.go('results');
              }

              else{
                count++;
              }
        }

        if(count==list.length){

          alert(" results are not declared yet!!! ")
        }
      })

    }

    function navhome(){

      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//judgedeclaration?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function (response) {

        var list = response;
        var count=0;

        for (var i = 0; i < list.length; i++) {


          if(list[i].username!=localStorage.username)
          {
            count++;
          }

        }

        if(count==list.length){

          $state.go("judgeHome")
        }
        else{
          alert(" you had submitted your scores...!!! ")
        }
      })




    }

    $scope.pageClass = 'update';
    $scope.update = function (name, company_name, interested_technologies) {

      var id = localStorage.getItem("id_user");
      console.log(id);
      //console.log("inside update function");
      $http({
        method: 'PUT',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//judges/' + id + '?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',
        data: JSON.stringify({
          "username": localStorage.username,
          "password": localStorage.password,
          "name": name,
          "company_name": company_name,
          "interested_technologies": interested_technologies
        }),

        contentType: "application/json"


      }).success(function () {
        $scope.name = "";
        $scope.company_name = "";
        $scope.interested_technologies = "";
        navhome();

        // $state.go('judgeHome');
      })
    }


  })
  //end of judgedetails controller

  //beginning of home controller

  //


  //begin of profile controller
  .controller('ProfileCtrl', function ($scope, $state, $http, $window, $httpParamSerializerJQLike) {
    $scope.pageClass = 'home';
    $scope.home = function () {
      console.log("home page !");
      $state.go('home');
    }
    $scope.data = {};
    $scope.pageclass = 'delete';
    $scope.delete = function () {
      var id = localStorage.getItem("id_user");
      inside.deleteMethod();
      //console.log("inside delete");
      $http({
        method: 'DELETE',
        url: 'https://api.mongolab.com/api/1/databases/roohub/collections//userdata/' + id + '?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function () {
        alert("Delete success!");
        $state.go('login');
      })
    }
    $scope.pageclass = 'update';
    $scope.update = function () {
      console.log("inside update function");
      $state.go('update')
    }
    $scope.pageClass = 'logout';
    $scope.logout = function () {
      console.log("logged out!");
      $state.go('login');
    }

  })
  //end of profile controller




  .controller('adminhomeCtrl', function ($scope, $state, $http, $window, $httpParamSerializerJQLike) {

    $scope.pageClass = 'listTeams1';
    $scope.listTeams1 = function () {

      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//teams?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function (response) {

        var list = response;

        for (i = 0; i < list.length; i++) {

          console.log(list[i].teamname);


          $('#dropdownteamsadmin').append("<option value='" + list[i].teamname + "'>" + list[i].teamname + "</option>");


        }
      })
    }

    $scope.pageclass = 'delete';
    $scope.delete = function (dropdownvalueadmin) {
      var id = localStorage.getItem("id_user");
      inside.deleteMethod();
      //console.log("inside delete");


      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//teams?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function (response) {

        var list = response;
        for ( var i = 0; i < list.length; i++) {


          if (list[i].teamname == dropdownvalueadmin) {

            $http({
              method: 'DELETE',
              url: 'https://api.mongolab.com/api/1/databases/judgement/collections//teams/' + list[i]._id.$oid + '?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

              contentType: "application/json"
            }).success(function () {
              alert("Delete success!");

            })

          }

        }
        $state.go('adminhome');
      })




    }

    // $scope.data = {};
    $scope.pageClass = 'home';
    $scope.home = function () {
      console.log("home page !");
      $state.go('home');
    }
    $scope.pageClass = 'resultpage';
    $scope.resultpage = function () {
      $state.go('results');
    }
    $scope.pageClass = 'addteam';
    $scope.addteam = function (teamname, usecase, leader, email) {
      // $state.go('home');

      inside.postMethod();
      //console.log("inside register function");
      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//teams?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',
        data: JSON.stringify({
          teamname: teamname,
          usecase: usecase,
          leader: leader,
          email: email

        }),
        contentType: "application/json"
      }).success(function () {
        $scope.teamname = "";
        $scope.usecase = "";
        $scope.leader = "";
        $scope.email = "";


        alert("team created successfully ");
        $state.go('adminhome');
        //$scope.msg ="User created successfully";
        //$window.location.href="index.html";
      })
    }


    $scope.pageClass = 'finalresult';
    $scope.finalresult = function () {


      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//declareresults?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',
        data: JSON.stringify({
          public: "yes"
        }),

        contentType: "application/json"
      }).success(function () {
        $scope.public = "";

        alert(" Results Declared ");
        $state.go('results');

      })
    }

  })
  //end of  controller

  //begin of judgehome controller


  .controller('judgeHomeCtrl', function ($scope, $state, $http, $window, $httpParamSerializerJQLike) {

    $scope.pageClass = 'listTeams';
    $scope.listTeams = function () {

      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//teams?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function (response) {

        var list = response;

        for (i = 0; i < list.length; i++) {

          console.log(list[i].teamname);


          $('#dropdownteams').append("<option value='" + list[i].teamname + "'>" + list[i].teamname + "</option>");


        }
      })
    }

    $scope.pageClass = 'scoreSubmit';
    $scope.scoreSubmit = function (dropdownvalue, score, comments) {
      // $state.go('home');

      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//teamscores?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function (response) {

        var list = response;
        var count = 0;
        console.log(localStorage.getItem("username"));

        for ( var i = 0; i < list.length; i++) {


          if (list[i].teamname == dropdownvalue && list[i].judge == localStorage.username) {

            $http({
              method: 'PUT',
              url: 'https://api.mongolab.com/api/1/databases/judgement/collections//teamscores/' + list[i]._id.$oid + '?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',
              data: JSON.stringify({
                judge: localStorage.username,
                teamname: dropdownvalue,
                score: score,
                comments: comments
              }),

              contentType: "application/json"


            }).success(function () {
              $scope.teamname = "";
              $scope.score = "";
              $scope.comments = "";
              alert(" score updated successfully ");
              $state.go('judgeHome');
            })

          }

          else {

            count++;

          }

          if (count == list.length) {
            inside.postMethod();
            //console.log("inside register function");
            $http({
              method: 'POST',
              url: 'https://api.mongolab.com/api/1/databases/judgement/collections//teamscores?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',
              data: JSON.stringify({
                judge: localStorage.username,
                teamname: dropdownvalue,
                score: score,
                comments: comments

              }),
              contentType: "application/json"
            }).success(function () {
              $scope.teamname = "";
              $scope.score = "";
              $scope.comments = "";


              alert(" score submitted successfully ");
              $state.go('judgeHome');
              //$scope.msg ="User created successfully";
              //$window.location.href="index.html";
            })
          }


        }
      })


    }
    $scope.pageClass = 'finalsubmit';
    $scope.finalsubmit = function () {


      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//judgedeclaration?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',
        data: JSON.stringify({
          username: localStorage.username,
          status: "submitted"
        }),

        contentType: "application/json"
      }).success(function () {
        $scope.username = "";
        $scope.status = "";
        alert(" final scores submitted");
        $state.go('judgedetails');

      })
    }


  })

  //end of judgehome controller


  .controller('resultsCtrl', function ($scope, $state, $http, $window, $httpParamSerializerJQLike) {


    var unfilledData = [];
    var tempArr = [];
    var finalScore = [];
    var teamNames = [];
    var charData = {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        }
      },
      title: {
        text: 'Hackathon Teams'
      },
      subtitle: {
        text: 'View of teams with respective scores'
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45
        }
      },
      series: [{
        name: 'Score',

      }]
    };

    function fill_char_data() {
/*
      console.log(finalScore);
      console.log(teamNames);
      console.log(charData.series[0].data);
      console.log(charData.series[0].data[0]);
      console.log(charData.series[0].data[3]);*/

      for(var  i =0; i<teamNames.length; i++){
        tempArr= [];
        for(var j=0; j<2; j++){
          if(j == 0){
            tempArr[j] = teamNames[i];
          }
          if(j ==1){
            tempArr[j] = finalScore[i];
          }

        }
        unfilledData[i] = tempArr;
      }

   console.log(unfilledData);

      charData.series[0]["data"] = unfilledData;
      $('#container').highcharts(charData);

    };


    $scope.pageClass = 'scoreResults';
    $scope.scoreResults = function () {


      $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/judgement/collections//teams?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

        contentType: "application/json"
      }).success(function (response) {
        var list = response;


        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/judgement/collections//teamscores?apiKey=Aqw5Vn6oE_tifGJTahI6Ou1ybtNh5MBf',

          contentType: "application/json"
        }).success(function (response1) {

          //console.log(response1);
          var winscore = 0;
          var winteam = "";

          for (var i = 0; i < list.length; i++) {

            var list2 = response1;
            var mainscore = 0;

            for (var j = 0; j < list2.length; j++) {


              if (list2[j].teamname == list[i].teamname) {

                mainscore += list2[j].score;

              }

            }
            finalScore[i] = mainscore;
            teamNames[i] = list[i].teamname;

            var str1 = " : ";
            var str2 = "<br>"
            $('#teamscores').append(list[i].teamname + str1 + mainscore + str2);

            if (winscore < mainscore) {
              winscore = mainscore;
              winteam = list[i].teamname;
            }
          }
          $('#winnerdetails').append("winning team is <b>" + winteam + " </b>with winning score <b>" + winscore);
          fill_char_data();
        })
      })
    }



  })





  //end of na1 posts controller

