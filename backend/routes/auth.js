const express = require("express");
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");
const router = express.Router();
const User = require("../models/User");

router.get(
	"/login",
	ClerkExpressWithAuth(),
	async (req, res) => {
	  try {
		if (!req.auth) {
		  console.log('No JWT token received in request');
		  return res.status(401).send('Unauthorized');
		}
  
		const { id, first_name, last_name, phone_no } = req.auth.sessionClaims;
		console.log("User email extracted from JWT:", phone_no);
  
		let user = await User.findOne({ phone: phone_no });
		console.log(user)
  
		if (user) {
		  console.log('User already exists in database. Fetching data...');
		  return res.json(user);
		}
  
		const userData = {
		  clerkId: id,
		  firstName: first_name,
		  lastName: last_name,
		  phoneNo: phone_no,
		  // Add other fields you want to save from req.auth
		};
  
		console.log('User does not exist. Inserting new user data...');
		user = await User.create(userData);
		console.log('User data saved to MongoDB:', user);
  
		res.json(user);
	  } catch (error) {
		console.error('Failed to process authentication:', error.message);
		if (error.code === 11000) {
		  return res.status(409).send('User with this email already exists.');
		}
		res.status(500).send('Internal Server Error');
	  }
	}
  );
  
module.exports = router;
