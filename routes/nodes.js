const router = require('express').Router();
const {
  getAllNodes,
  createNode,
  editNode,
  deleteNode,
} = require('../controllers/nodes');

router.get('/', getAllNodes);
router.post('/', createNode);
router.put('/', editNode);
router.delete('/', deleteNode);

module.exports = { router };
