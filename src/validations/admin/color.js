const { check, param } = require('express-validator');

exports.createColorValid = [ 
    check('productId').exists().withMessage("Product Id field is required"),
    check('name').exists().withMessage("Name field is required"),
    check('colorCode').exists().withMessage("Color Code field is required"),
]

exports.editColorValid = [ 
    param('colorId').exists().withMessage("Product Id field is required"),
    check('name').exists().withMessage("Name field is required"),
    check('colorCode').exists().withMessage("Color Code field is required"),
    check('status').exists().withMessage("Status field is required"),
]

exports.deleteColorValid = [ 
    check('colorId').exists().withMessage("Color Id field is required"),
    check('productId').exists().withMessage("Product Id field is required"),
]