const Reminders = require('../models/reminders');
const {Op} = require('sequelize');

const createReminder = (req, res)=>{
    Reminders.create(req.body)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Reminders."
      });
    });
};

const getAllReminders = (req, res)=>{
    let user = req.query.user;
    let after = req.query.after;
    const where = {}

    if (after || user) {
      where[Op.and] = []
      if (after) {
        where[Op.and].push({
          date: {
            [Op.gte]: after
          }
        })
      }
      if (user) {
        where[Op.and].push({
          user: user
        })
      }
    }

    Reminders.findAll({ where })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting all Reminders."
      });
    });
};

const getReminder = (req, res)=>{
    Reminders.findByPk(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Reminder."
      });
    });
};

const deleteReminder = (req, res)=>{
    Reminders.destroy({
            where: {
                id: req.params.id
            }
    })
    .then(data => {
      res.status(405).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the Reminder."
      });
    });
};

const updateReminder = (req, res)=>{
    Reminders.update(req.body, {
            where: {
                id: req.params.id
            }
    })
    .then(data => {
      res.status(405).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the Reminder."
      });
    });
};

module.exports = {
createReminder,
getAllReminders,
getReminder,
deleteReminder,
updateReminder
}
