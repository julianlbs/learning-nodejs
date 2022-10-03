// const { endOfDay } = require("date-fns");

const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
	const response = await Employee.find();
	if (!response)
		return res.status(204).json({ message: "No employees found." });

	res.json(response);
};

const createNewEmployee = async (req, res) => {
	if (!req?.body?.firstName || !req?.body?.lastName) {
		return res
			.status(400)
			.json({ message: "First and last names are required" });
	}

	try {
		const response = await Employee.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		});

		res.status(201).json(response);
	} catch (err) {
		console.log(err);
	}
};

const updateEmployee = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ message: "ID parameter is required" });
	}

	const response = await Employee.findOne({ _id: req.body.id }).exec();
	if (!response) {
		return res
			.status(204)
			.json({ message: `No employee matched ID ${req.body.id}` });
	}

	if (req.body?.firstName) response.firstName = req.body.firstName;
	if (req.body?.lastName) response.lastName = req.body.lastName;

	const result = await response.save();
	res.json(result);
};

const deleteEmployee = async (req, res) => {
	if (!req?.body?.id)
		return res.status(400).json({ message: "Employee ID required." });

	try {
		const response = await Employee.findOne({ _id: req.body.id }).exec();
		if (!response) {
			return res
				.status(204)
				.json({ message: `No employee matched ID ${req.body.id}` });
		}

		const result = await response.deleteOne({ _id: req.body.id });

		res.json(result);
	} catch (err) {
		console.log(err);
	}
};

const getEmployee = async (req, res) => {
	if (!req?.params?.id)
		return res.status(400).json({ message: "Employee ID required." });

	try {
		const response = await Employee.findOne({ _id: req.params.id }).exec();
		if (!response) {
			return res
				.status(204)
				.json({ message: `No employee matched ID ${req.params.id}` });
		}

		res.json(response);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getAllEmployees,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
};
