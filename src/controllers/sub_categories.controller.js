// SUB CATEGORIES

import { read, write } from '../utils/model.js';

const GETSUBCAT = (req, res) => {
  let sub = read('subcategories')
  let products = read('products')
  sub.map(subcategory => {
    subcategory.products = products.filter(product => product.sub_category_id == subcategory.sub_category_id)
    subcategory.products.filter(product => delete product.sub_category_id)
  })

  res.send( sub )
}

const GETBYIDSUBCAT = (req, res) => {
  let sub = read('subcategories')
  let products = read('products')
  let { subId } = req.params
  let subcategory = sub.find(subcategory => subcategory.sub_category_id == subId)
  sub.map(subcategory => {
    subcategory.products = products.filter(product => delete product.sub_category_id)
    subcategory.products.filter
  })

  res.send( subcategory )
}

const POSTSUBCAT = (req, res) => {
  let subcategories = read('subcategories')
  let { category_id, sub_category_name } = req.body
  let newSubCategory = { sub_category_id: subcategories.at(-1)?.sub_category_id + 1 || 1, category_id, sub_category_name }
  subcategories.push(newSubCategory)
  write('subcategories', subcategories)
  res.status(201).json({ status: 201, message: "subcategory added", data: newSubCategory })
}

const DELETESUBCAT = (req, res) => {
  let sub = read('subcategories')
  let { id } = req.params
  let subcategoryIndex = sub.findIndex(subcategory => subcategory.sub_category_id == id)
  if (subcategoryIndex != -1) {
    let subcategory = sub.splice(subcategoryIndex, 1)
    console.log(sub);
    write('subcategories', sub)
    return res.status(201).json({ status: 200, message: "subcategory deleted", data: subcategory })
  } else {
    return res.status(404).json({ status: 404, message: "subcategory was not found" })
  }
}

const PUTSUBCAT = (req, res) => {
  let subcategories = read('subcategories')
  let { id } = req.params;
  let { sub_category_name } = req.body;
  let subcategory = subcategories.find(subcategory => subcategory.sub_category_id == id);
  if (!subcategory){
    return res.status(404).json({ status: 404, message: "subcategory was not found" })
  } else {
    subcategory.sub_category_name = sub_category_name || subcategory.sub_category_name
    write('subcategories', subcategories)
    return res.status(201).json({ status: 200, message: "subcategory updated", data: subcategory })
  }
}

export {
  GETSUBCAT, GETBYIDSUBCAT, POSTSUBCAT, DELETESUBCAT, PUTSUBCAT
}