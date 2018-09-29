$(document).ready(function(){
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

var WebRegApp = angular.module('WebRegApp', ['ngRoute', 'ngAnimate', 'ngCookies', 'ui.bootstrap']);

/*--ROUTING--*/

WebRegApp.config(function($routeProvider) {    
        $routeProvider
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'mainController'
            })
            .when('/login', {
                templateUrl : 'login.html',
                controller  : 'loginController'
            })
            .when('/dashboard', {
                templateUrl : 'dashboard.html',
                controller  : 'dashboardController'
            })
			.when('/profile', {
                templateUrl : 'profile.html',
                controller  : 'profileController'
            })
			.when('/slides', {
                templateUrl : 'slides.html',
                controller  : 'slidesController'
            })
			.when('/homeworks', {
                templateUrl : 'homeworks.html',
                controller  : 'homeworksController'
            })
			.when('/grades', {
                templateUrl : 'grades.html',
                controller  : 'gradesController'
            })
            .when('/absences', {
                templateUrl : 'absences.html',
                controller  : 'absencesController'
            })
			.when('/teachers', {
                templateUrl : 'teachers.html',
                controller  : 'teachersController'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });
});

/*--CONTROLLERS--*/

WebRegApp.controller('mainController', function($scope, $rootScope, $http, $location, $cookies) {
    if(!$cookies.get("cookieread")==1){        
        $(".wr_black_screen").removeClass("hidden");
        $(".wr_black_screen").addClass("visible");
    }
    
    $scope.readcookie = function(){
        $cookies.put("cookieread",1);
        $(".wrwr_cookie_policy_alert").addClass("animated fadeOut");
        $(".wr_black_screen").hide();
    }
    
    $scope.logOut = function(){
        $cookies.remove("AccountID");
        $http({
                url: 'phpc/logout.php',
                method: 'POST',
				params: {cookiename : "account"}
        })
        .success(function(response){
            $location.path("/home");
        })
		.error(function(response){
			console.log("logout error" + response);
		});        
        $rootScope.account = null;
        $cookies.remove("account");
    }
    
    $scope.changeCss = function(cssFile){
        var oldlink = document.getElementById("cssPrimary");
        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", "css/"+cssFile);
        newlink.setAttribute("id", "cssPrimary");
        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);    
    }
    
    $scope.goTop = function(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    
    /*da cancellare*/
    $scope.italiano = function(){
        var position = $(".wr_slide_ita").position();
        $scope.goTo(position.top)
    }
    $scope.storia = function(){
        var position = $(".wr_slide_sto").position();
        $scope.goTo(position.top)
    }
    $scope.fisica = function(){
        var position = $(".wr_slide_edf").position();
        $scope.goTo(position.top)
    }
    $scope.tecnologie = function(){
        var position = $(".wr_slide_tec").position();
        $scope.goTo(position.top)
    }
    $scope.informatica = function(){
        var position = $(".wr_slide_inf").position();
        $scope.goTo(position.top)
    }
    
    $scope.goTo = function(val){
        $("html, body").animate({ scrollTop: val }, "slow");
    }
    
    $rootScope.events = [];
    
    /*if($cookies.get("AccountID")){
        var currentAccountID = $cookies.get("AccountID")
        $http({
            url: 'phpc/login.php',
            method: 'GET',
            params: { username: "", password: "", remember: false, accountid: currentAccountID}
        })
        .success(function(response){
                $rootScope.account = response;
                if($rootScope.account.AccountID){                    
                    $location.location.href = 'index.html#dashboard';
					console.log("eri già loggato (angular)")
                }
        })
        .error(function(response){
            alert("cookie autologin error");
        });
    } */   
});






















WebRegApp.controller('loginController', function($scope, $rootScope, $http, $location, $cookies) {
    
    
    
    if(!$rootScope.account){
        $rootScope.account = [];
    }    
    if($rootScope.account.AccountID){
        $location.path("/profile");
    }else{
        $rootScope.account = $cookies.getObject("account");
        if($rootScope.account){
            $location.path("/profile");
        }
    }
    
    $scope.isLoading = false;
    $scope.remember = false;
    $scope.loginerror = "";    
    $scope.login = function(usr,pass,rem){
        if($scope.username && $scope.password){
            $scope.isLoading = true;
            $http({
                url: 'phpc/login.php',
                method: 'GET',
                params: { username: usr, password: pass, remember: rem}
            })
            .success(function(response){
                    console.log(response);
                    //per il momento seleziono solo il primo utente per l'account scelto
                    $rootScope.accountUsers = response;
                    $rootScope.account = $rootScope.accountUsers[0];
                    if($rootScope.account){                        
                        if($scope.remember){
                            $cookies.putObject("account", $rootScope.account);                       
                        }                        
                        $location.path("/profile");
                    }else{
                        $scope.loginerror = "Invalid account";
                    }
            })
            .error(function(response){
                    $scope.loginerror = "Connection error. Try later.";
            });
            $scope.isLoading = false;
        }else{
            $scope.loginerror = "Username or password empty";
        }
    };
    
});






















WebRegApp.controller('dashboardController', function($scope, $rootScope, $location, $cookies, $http) {
    if(!$rootScope.account){
        $location.path("/login");
    }
    $rootScope.selected_menu_name="home";
    
    
});






















WebRegApp.controller('profileController', function($scope, $rootScope, $location, $cookies, $http, $compile) {
    $rootScope.selected_menu_name="profile";
    $scope.updatepassword = function (oldpassword, newpassword, newpassword2){
        if(oldpassword = $rootScope.account.Password){
             $http({
             url: 'phpc/updatePassword.php',
             method: 'POST',
             params: {
                     accountid : $rootScope.account.AccountID,
                     oldpassword: oldpassword,
                     newpassword: newpassword,
                     newpassword2: newpassword2
                }
             })
             .success(function(response){
                 $scope.passwordChangeMessage = response;
             })
             .error(function(response){
                 $scope.passwordChangeMessag = "getStudentClass error" + response;
             }); 
        }else{
            $scope.passwordChangeMessage = "Old password wrong.";
        }        
    }
    
    if(!$rootScope.account){
        $location.path("/login");
    }
    
    if(!$rootScope.studentClass){
        $http({
            url: 'phpc/getStudentClass.php',
            method: 'GET',
            params: {
                userid : $rootScope.account.UserID, 
                year : 2015 
            }
        })
        .success(function(response){
            $rootScope.studentClass = response;
        })
        .error(function(response){
            console.log("getStudentClass error" + response);
        }); 
    }
    
    $('#myModal').on('hidden.bs.modal', function (e) {
            d = new Date();
            $(".wr_profileimage").attr("src", $rootScope.account.ProfileImage+"?"+d.getTime());
    })
        
});
























WebRegApp.controller('absencesController', function($scope, $rootScope, $location, $cookies, $http) {
    if(!$rootScope.account){
        $location.path("/login");
    }
    $rootScope.selected_menu_name="absences";
    
    $scope.initCalendar = function(events){
        $('#absencesCalendar').fullCalendar({
			defaultDate: '2015-09-15',
			editable: false,
			eventLimit: true, // allow "more" link when too many events
			events: events
		});
    }
    
    if(!$rootScope.absences){
        $http({
            url: 'phpc/getStudentAbsences.php',
            method: 'GET',
            params: {
                studentid : $rootScope.account.UserID
            }
        })
        .success(function(response){
            $rootScope.absences = response;
            $.each($rootScope.absences, function(index,absence){
                var title = "";
                var color = "";
                if(absence.isJustified==1){
                    title = "Assenza giustificata";
                    color = "#08b169";
                }else{
                    title = "Assenza non giustificata";
                    color = "#B10821";
                }
                $rootScope.events.push({
					title: title,
					start: new Date(absence.AbsenceDate),
                    color: color
                });
            });
            $scope.initCalendar($rootScope.events);
        })
        .error(function(response){
            console.log("getStudentAbsences error" + response);
        });
    }else{
        $scope.initCalendar($rootScope.events);
    }
    
    
    
     
    
});


















WebRegApp.controller('slidesController', function($scope, $rootScope, $location, $cookies, $http) {
    if(!$rootScope.account){
        $location.path("/login");
    }
    $rootScope.selected_menu_name="slides";
    
});






















WebRegApp.controller('homeworksController', function($scope, $rootScope, $location, $cookies, $http) {
    if(!$rootScope.account){
        $location.path("/login");
    }
    $rootScope.selected_menu_name="homeworks";
    
    if(!$rootScope.studentClass){
        $http({
            url: 'phpc/getStudentClass.php',
            method: 'GET',
            params: {
                userid : $rootScope.account.UserID, 
                year : 2015 
            }
        })
        .success(function(response){
            $rootScope.studentClass = response;
        })
        .error(function(response){
            console.log("getStudentClass error" + response);
        });
    }
    
    if(!$rootScope.homeworklist){
        $http({
            url: 'phpc/getStudentHomework.php',
            method: 'GET',
            params: {
                classid : $rootScope.studentClass.ClassID
            }
        })
        .success(function(response){
            $rootScope.homeworklist = response;
            var today = Date.now();
            var d = new Date(today);
            $.each($rootScope.homeworklist, function(index,homework){
                var dh = new Date(homework.DeliveryDate);
                if(dh>d){
                    homework.isNew = true;
                }else{
                    homework.isNew = false;
                }
            });
        })
        .error(function(response){
            console.log("getStudentHomework error" + response);
        });
    }
});






















WebRegApp.controller('gradesController', function($scope, $rootScope, $location, $cookies, $http, $filter) {
    if(!$rootScope.account){
        $location.path("/login");
    }
    $rootScope.selected_menu_name="grades";    
    
    if(!$scope.gradetypes){
        $http({
            url: 'phpc/getGradeTypes.php',
            method: 'GET'
        })
        .success(function(response){
            $scope.gradetypes = response;
        })
        .error(function(response){
            console.log("getGradeTypes error" + response);
        }); 
    }
    
    
    if(!$rootScope.studentClass){
        $http({
            url: 'phpc/getStudentClass.php',
            method: 'GET',
            params: {
                userid : $rootScope.account.UserID, 
                year : 2015 
            }
        })
        .success(function(response){
            $rootScope.studentClass = response;
        })
        .error(function(response){
            console.log("getStudentClass error" + response);
        }); 
    }
    
    if($rootScope.studentClass){
        if(!$rootScope.subjects){
            $http({
                url: 'phpc/getStudentSubjects.php',
                method: 'GET',
                params: {
                    userid : $rootScope.account.UserID,
                    classid : $rootScope.studentClass.ClassID
                }
            })
            .success(function(response){
                $rootScope.subjects = response;
                $rootScope.avarage_sum = 0;
                $rootScope.n_avarage = 0;                       
                $.each($rootScope.subjects, function(index,subject){                    
                    subject.grades = [];                                        
                    $http({
                        url: 'phpc/getStudentGradesForSubject.php',
                        method: 'GET',
                        params: {
                            userid : $rootScope.account.UserID,
                            subjectid : subject.SubjectID
                        }
                    })
                    .success(function(response){
                        subject.grades = response;
                        var sum = 0;
                        var n_grades = 0;
                        $.each(subject.grades, function(index,grade){
                            sum+=parseFloat(grade.Value);
                            n_grades++;
                        });
                        var subject_grades_avarage = sum/n_grades;
                        subject.Avarage = Math.round(subject_grades_avarage * 100) / 100;
                        if(subject.Avarage>0){
                            $rootScope.avarage_sum+=subject.Avarage;
                            $rootScope.n_avarage++;
                        }
                        $rootScope.total_avarage_sum_rounded = Math.round($rootScope.avarage_sum * 100) / 100;
                        $rootScope.total_avarage = $rootScope.total_avarage_sum_rounded/$scope.n_avarage; 
                        $rootScope.total_avarage = Math.round($rootScope.total_avarage * 100) / 100;                        
                    })
                    .error(function(response){
                        console.log("getStudentGradesForSubject error" + response);
                    });                    
                });
            })
            .error(function(response){
                console.log("getStudentSubjects error" + response);
            }); 
        }
    }
    
    
    $scope.chartInit = function(subject){        
        $("#canvas").hide(100);
        document.getElementById("canvas").remove();
        $(".wr_grades_chart").append('<canvas id="canvas"></canvas>');
        $("#wr_bs_grade").removeClass("hidden");
        $("#wr_bs_grade").show(100);
        $("#canvas").show(100);        
        var ctx = document.getElementById("canvas").getContext("2d");
        var linechartlabels = [];
        var linechartdatasets = [];
        var linechartdata = {
            labels: linechartlabels,
            datasets: linechartdatasets,
            options:{
                responsive: true,
                legend:{
                    enabled:true,
                    position:top
                }
            }
        };
        var subjectgradesvalues = [];
        $.each(subject.grades, function(index,grade){
            var date = new Date(grade.Date);
            var day = date.getDay();
            var month = date.getMonth();
            var year = date.getYear();
            linechartlabels.push($filter('date')(new Date(year, month, day), 'dd MMM'));
            subjectgradesvalues.push(grade.Value)
        });
        var dataset = {
            label: subject.Description,
            fillColor : "rgba(235,97,17,0.3)",
            strokeColor : "rgba(235,97,17,1)",
            pointColor : "rgba(255,193,0,1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(220,220,220,1)",
            data : subjectgradesvalues
        };
        linechartdatasets.push(dataset);                                                
        window.myLine = new Chart(ctx).Line(linechartdata, {
			responsive: true
		});
        $scope.charted_subject = subject.Description;
    }
    
    $scope.closeGradeTrand = function(){
        $("#wr_bs_grade").hide(100);
        $("#wr_bs_grade").addClass("hidden");
    }
    
});






















WebRegApp.controller('teachersController', function($scope, $rootScope, $location, $cookies, $http) {
    if(!$rootScope.account){
        $location.path("/login");
    }
    $rootScope.selected_menu_name="teachers";
    
    if(!$rootScope.teachers){
        
        if(!$rootScope.studentClass){
            $http({
                url: 'phpc/getStudentClass.php',
                method: 'GET',
                params: {
                    userid : $rootScope.account.UserID, 
                    year : 2015 
                }
            })
            .success(function(response){
                $rootScope.studentClass = response;
            })
            .error(function(response){
                console.log("getStudentClass error" + response);
            }); 
        }
        
        $http({
            url: 'phpc/getTeacherListForStudent.php',
            method: 'GET',
            params: {
                myclassid : $rootScope.studentClass.ClassID, 
            }
        })
        .success(function(response){
            $rootScope.teachers = response;
        })
        .error(function(response){
            console.log("getTeacherListForStudent error" + response);
        }); 
    }
    
});


/*--ANIMATIONS--*/

/* WebRegApp.animation('.wr_loginform', [function() {
  return {
    // make note that other events (like addClass/removeClass)
    // have different function input parameters
    enter: function(element, doneFn) {
      jQuery(element).fadeIn(1000, doneFn);

      // remember to call doneFn so that angular
      // knows that the animation has concluded
    },

    move: function(element, doneFn) {
      jQuery(element).fadeIn(1000, doneFn);
    },

    leave: function(element, doneFn) {
      jQuery(element).fadeOut(1000, doneFn);
    }
  }
}]); */

/*--DIRECTIVES--*/

WebRegApp.directive('topMenu', function() {
  return {
    restrict: 'E',
    templateUrl: 'topMenu.html'
  };
});

WebRegApp.directive('leftMenu', function() {
  return {
    restrict: 'E',
    templateUrl: 'leftMenu.html',
    }
});

WebRegApp.directive('themes', function() {
  return {
    restrict: 'E',
    templateUrl: 'themes.html',
    }
});

WebRegApp.directive('modalChangePicture', function() {
  return {
    restrict: 'E',
    templateUrl: 'changepicturemodal.html',
    }
});