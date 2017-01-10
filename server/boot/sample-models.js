module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.create(
	  {username: 'Hoang Phu', email: 'nghoangphu@gmail.com', password: 'hoangphu'},
    function(err, user) {
	    if (err) throw err;
      console.log('Created user:', user);
      user.jobs.create({
        serviceName: 'Service name for Phu',
        serverFirstName: 'Server first name for Phu'
      }, function(err, job) {
        if (err) throw err;
        console.log('Create job: ', job);
      })
    }
  );
  User.create(
	  {username: 'Phuong Lan', email: 'phuongzlan@gmail.com', password: 'phuonglan'},
    function(err, user) {
	    if (err) throw err;
      console.log('Created user:', user);
      user.jobs.create([
        {serviceName: 'Service name 1 for Lan', serverFirstName: 'Server first name 1 for Lan'},
        {serviceName: 'Service name 2 for Lan', serverFirstName: 'Server first name 2 for Lan'}
      ], function(err, job) {
        if (err) throw err;
        console.log('Create job: ', job);
      })
    }
  );
}
