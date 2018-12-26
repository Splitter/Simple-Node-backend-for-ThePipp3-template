


//Create initial admin user

exports.create = {
    User: [
      {
        displayName: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin1234',
        canAccessKeystone: true
      },
    ],
  };