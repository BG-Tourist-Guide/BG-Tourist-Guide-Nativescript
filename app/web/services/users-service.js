'use strict';

let sha1 = require('sha1');
let requester = require('../requester').defaultInstance;
let usersHelper = require('../../helpers/users-helper').defaultInstance;

class UsersService {
  login(userName, password) {
    let promise = new Promise(function(resolve, reject) {
      let data = {
        userName,
        password: sha1(password)
      };

      requester.putJsonAsync('/api/users/token', data)
        .then(function(response) {
          if (response.result) {
            usersHelper.setCurrentUserInLocalStorage(response.result);
            resolve(response.result);
          }
          else {
            reject(response);
          }
        }, reject);
    });

    return promise;
  }

  register(userName, password) {
    let promise = new Promise(function(resolve, reject) {
      let data = {
        userName,
        password: sha1(password)
      };

      requester.postJsonAsync('/api/users', data)
        .then(function(response) {
          if (response.result) {
            usersHelper.setCurrentUserInLocalStorage(response.result);
            resolve(response.result);
          }
          else {
            reject(response);
          }
        }, reject);
    });

    return promise;
  }

  updateProfileInformation() {
    let promise = new Promise(function(resolve, reject) {
      requester.getJsonAsync('/api/users/profile')
        .then(function(response) {
          if (response.result) {
            usersHelper.setCurrentUserInLocalStorage(response.result);
            resolve(response.result);
          }
          else {
            reject(response);
          }
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  UsersService: UsersService,
  defaultInstance: new UsersService()
};