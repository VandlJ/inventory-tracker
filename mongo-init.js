db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'motorcycle_inventory'
    },
    {
      role: 'dbAdmin',
      db: 'motorcycle_inventory'
    }
  ]
}); 