const Employee = require('../models').Employee;

const { Sequelize } = require('sequelize');
const Op = Sequelize.Op
// in this controller we can add helper functions to format errors
// so we have a clear response when the call fails for any reason
module.exports = {
    list(req, res) {
        // the sort is sent as an array but inside a string
        // thus we need to evaluate the string as a code
        let sort = eval(req.query.sort)
        // this is the string value of range used for the headers
        let range = req.query.range

        //  here we build the pagination we could wrap it in a function
        let array_range = eval(range)
        let per_page = (array_range[1] - array_range[0]) + 1
        let offset = (array_range[0] % (per_page - 1)) * per_page
        let filter = JSON.parse(req.query.filter)
        // this can be moved to a helper function to be used across controllers
        if (typeof filter === 'object' && filter !== null && Object.keys(filter).length > 0) {
            filter = {
                [Op.or]: {
                    title: { [Op.like]: '%' + filter.search + '%' },
                    email: { [Op.like]: '%' + filter.search + '%' }
                }
            }

        } else {
            filter = {}
        }
        return Employee
            .findAndCountAll({
                order: [
                    sort
                ],
                where: filter,
                limit: per_page,
                offset: offset
            })
            .then((result) => {
                res.set({
                    'Content-Type': 'application/json',
                    'Access-Control-Expose-Headers': 'Content-Range',
                    'Content-Range': 'employees ' + range + '/' + `${result.count}`
                })
                res.status(200).send(result.rows)
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    },

    getById(req, res) {
        return Employee
            .findByPk(req.params.id)
            .then((employee) => {
                if (!employee) {
                    return res.status(404).send({
                        message: 'Employee Not Found',
                    });
                }
                return res.status(200).send(employee);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    },

    add(req, res) {
        return Employee
            .create(req.body)
            .then((employee) => {
                res.status(201).send(employee)
            })
            .catch((error) => {
                res.status(400).send({ errors: { email: "Already exists" } })
            });
    },

    update(req, res) {
        return Employee
            .findByPk(req.params.id)
            .then(employee => {
                if (!employee) {
                    return res.status(404).send({
                        message: 'Employee Not Found',
                    });
                }
                return employee
                    .update(req.body)
                    .then(() => res.status(200).send(employee))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => {
                res.status(400).send(error);
            })
    },

    delete(req, res) {
        return Employee
            .findByPk(req.params.id)
            .then(employee => {
                if (!employee) {
                    return res.status(400).send({
                        message: 'Employee Not Found',
                    });
                }
                return employee
                    .destroy()
                    .then(() => res.status(200).send(employee))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    check_email(req, res) {
        return Employee
            .findOne({ where: req.query })
            .then((employee) => {
                res.status(200).send({ email_unique: !employee })
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }
};