'use strict';

module.exports = function(app) {
  // Install a `/` route that returns server status
  var router = app.loopback.Router();
  
  router.get('/', function(req, res) {
    res.render('index', {
      loginFailed: false
    });
  });

  router.get('/jobs', function(req, res) {
    res.render('jobs');
  });

  router.post('/jobs', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    app.models.User.login({email: email, password: password}, 
      'user',function(err, token) {
        if (err) 
          return res.render('index', {
            email: email,
            password: password,
            loginFailed: true
          });
        token = token.toJSON();
        res.render('jobs', {
          username: token.user.username,
          userid: token.user.id,
          accessToken: token.id
        });
      });
    });
  
  router.post('/createjob', function(req, res) {
    var serviceName = req.body.serviceName;
    var serverFirstName = req.body.serverFirstName;
    var ownerId = req.query['userid'];
    //var accessToken = token.id;
    app.models.Jobs.create({serviceName: serviceName, serverFirstName: serverFirstName, ownerId: ownerId},
      function(err, job) {
        if (err) throw err;
        console.log('Create job successfully');
        res.redirect('/jobs');
      }
    );
  });

  router.get('/logout', function(req, res) {
    var AccessToken = app.models.AccessToken;
    var token = new AccessToken({id: req.query['access_token']});
    token.destroy();
    res.redirect('/');
  });

  app.use(router);
};
