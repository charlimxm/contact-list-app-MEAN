var myApp = angular.module('myApp', [])

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) { // $http will send a request from the controller side to the server side. App.get to send the information that we want from the server side
  console.log('Hello World from controller')

  var refresh = function() {
    $http.get('/contactlist').success(function(res) {
      console.log('response received')
      $scope.contactlist = res
      $scope.contact = ''
    })
  }

  refresh()

  $scope.addContact = function() {
    console.log($scope.contact)
    $http.post('/contactlist', $scope.contact).success(function(res) {
      console.log(res)
      refresh()
    })
  }

  $scope.remove = function(id) {
    console.log(id)
    $http.delete('/contactlist/' + id).success(function(res) {
      refresh()
    })
  }

  $scope.edit = function(id) {
    console.log(id)
    $http.get('/contactlist/' + id).success(function(res) {
      $scope.contact = res
    })
  }

  $scope.update = function(id) {
    console.log($scope.contact._id)
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(res) {
      refresh()
    })
  }

  $scope.deselect = function() {
    $scope.contact = ''
  }

  //   person1 = {
  //     name: 'Tim',
  //     email: 'tim@gmail.com',
  //     number: '(111) 111-1111'
  //   },
  //   person2 = {
  //     name: 'Char',
  //     email: 'char@gmail.com',
  //     number: '(222) 222-2222'
  //   },
  //   person3 = {
  //     name: 'Fel',
  //     email: 'felicia@gmail.com',
  //     number: '(333) 333-3333'
  //   }
  //
  // var contactlist = [person1, person2, person3]
  // $scope.contactlist = contactlist
}])
