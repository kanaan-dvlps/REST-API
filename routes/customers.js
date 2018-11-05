const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const Customer = require('../models/Customer');
const config = require('../config');
module.exports = server => {
  //Get Customers
  server.get('/customers', rjwt({ secret: config.JWT_SECRET}), async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  //Get single Customer
  server.get('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);
      res.send(customer);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no customers with the id of ${req.params.id}`));
    }
  });

  //Add Customers
  server.post('/customers', async (req, res, next) => {
    //Check for JSON
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'Application/json"));
    }
    /* what we did in the syntax below is we have to create a new customer variable in order to save it inside the DB so what we did was using ES6 to access the req.body values what we had to do was 
    const customer = new Customer({
      name: req.body.name,
      email: req.body.email,
      balance: req.body.balance
    });
    but instead we created a variable and we said we want to access the different req.body values so we said:
    const { name, email, balance } = req.body;
    meaning we want the req.body.name, req.body.email, req.body.balance values from req.body
    and below that we make a new customer every time that we enter an entery to our DB and with ES6 
    name: name,
    email: email,
    balance: balance
    are the same values so you can type it in only once like right now that we are actually using it inside our new customer object.
    const customer = new Customer({
      name,
      email,
      balance
    }); */
    const { name, email, balance } = req.body;
    const customer = new Customer({
      name,
      email,
      balance
    });
/* this is where we save the customers inside the DB prior code just created the new customer.  */
    try {
      const newCustomer = await customer.save();
      res.send(201); // this means something was created 
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });

  //Update customers
  server.put('/customers/:id', rjwt({ secret: config.JWT_SECRET}), async (req, res, next) => {
    //Check for JSON
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'Application/json"));
    }try {
      const customer = await Customer.findOneAndUpdate({ _id: req.params.id}, req.body);
      res.send(200);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no customers with the id of ${req.params.id}`));
    }
    });

    //Delete Customer
    server.del('/customers/:id', rjwt({ secret: config.JWT_SECRET}), async (req, res, next) =>{
      try{
        const customer = await Customer.findOneAndRemove({ _id: req.params.id });
        res.send(204);
        next();
      } catch(err) {
        return next(new errors.ResourceNotFoundError(`there is no such Customer with id of ${req.params.id}`));
      }
    });
}