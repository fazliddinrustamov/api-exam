// GET

import { read, write } from '../utils/model.js';

const GETCAT = (req, res) => {
  let categories = read('categories')
  let sub = read('subcategories')
  categories.map(category => {
    category.subCategories = sub.filter(subcategory => subcategory.category_id == category.category_id)
    category.subCategories.filter(subcategory => delete subcategory.category_id)
  })

  res.send( categories )
}

const GETBYIDCAT = (req, res) => {
  let categories = read('categories')
  let sub = read('subcategories')
  let { id } = req.params
  let category = categories.find(category => category.category_id == id)
  categories.map(category => {
    category.subCategories = sub.filter(subcategory => subcategory.category_id == category.category_id)
    category.subCategories.filter(subcategory => delete subcategory.category_id)
  })

  res.send( category )
}

const POSTCAT = (req, res) => {
  let categories = read('categories')
  let { category_name } = req.body
  let newCategory = { category_id: categories.at(-1)?.category_id + 1 || 1, category_name}
  categories.push(newCategory)
  write('categories', categories)
  res.status(201).json({ status: 201, message: "category added", data: newCategory })
}

const DELETECAT = (req, res) => {
  let categories = read('categories')
  let { id } = req.params
  let categoryIndex = categories.findIndex(category => category.category_id == id)
  if (categoryIndex != -1) {
    let category = categories.splice(categoryIndex, 1)
    write('categories', categories)
    return res.status(201).json({ status: 200, message: "category deleted", data: category })
  } else {
    return res.status(404).json({ status: 404, message: "category was not found" })
  }
}

const PUTCAT = (req, res) => {
  let categories = read('categories')
  let { id } = req.params;
  let { category_name } = req.body;
  let category = categories.find(category => category.category_id == id);
  if (!category){
    return res.status(404).json({ status: 404, message: "category was not found" })
  } else {
    category.category_name = category_name || category.category_name
    write('categories', categories)
    return res.status(201).json({ status: 200, message: "category updated", data: category })
  }
}

export {
  GETCAT, GETBYIDCAT, POSTCAT, DELETECAT, PUTCAT
}