const OrderItemHandler = require('./service')
const ProductHandler = require('../product/service')
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllOrderItems = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const [orderItems, pagination, totalPage, total] =
        await OrderItemHandler.getAllOrderIHandler(
            page,
            limit,
            sortDirection,
            sortField
        )

    res.send({
        success: 1,
        data: orderItems,
        Paging: {
            CurrentPage: pagination.page,
            Limit: pagination.limit,
            TotalPage: totalPage,
            Total: total,
        },
    })
}

// GET BY ID
const getOrderItem = async (req, res) => {
    const id = req.params.orderItemID.trim()

    const foundOrderItem = await OrderItemHandler.getOrderIHandler(id)

    if (!foundOrderItem) {
        throw new HttpError('Not found order-item!', 404)
    }

    res.send({
        success: 1,
        data: foundOrderItem,
    })
}

//
const getBestProducts = async (req, res) => {
    const { year, month } = req.query

    const getBestProduct = await OrderItemHandler.getBestProductsHandler(
        year,
        month
    )

    if (!getBestProduct) {
        throw new HttpError('Error get best products!', 404)
    }

    // const updatedData = await getBestProduct.map(async (entry) => {
    //     const productID = entry._id.productID

    //     const result = await ProductHandler.getProductHandler(productID)
    //     if (!result) {
    //         throw new HttpError('Not found product!', 404)
    //     }

    //     return {
    //         ...entry,
    //         _id: {
    //             // ...entry._id,
    //             name: result.name,
    //         },
    //     }
    // })

    res.send({
        success: 1,
        data: getBestProduct,
    })
}

// CREATE
const createOrderItem = async (req, res) => {
    const newOrderItemData = req.body

    const newOrderItem = await OrderItemHandler.createOrderIHandler(
        newOrderItemData
    )

    res.send({
        success: 1,
        id: newOrderItem._id,
    })
}

// UPDATE
const updateOrderItem = async (req, res) => {
    const id = req.params.orderItemID.trim()

    const updateOrderItemData = req.body

    const updatedOrderItem = await OrderItemHandler.updateOrderIHandler(
        id,
        updateOrderItemData
    )

    if (!updatedOrderItem) {
        throw new HttpError('Not found order-item!', 404)
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteOrderItem = async (req, res) => {
    const id = req.params.orderItemID.trim()

    const deletedOrderItem = await OrderItemHandler.deleteOrderIHandler(id)

    if (!deletedOrderItem) {
        throw new HttpError('Not found order-item!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    getAllOrderItems,
    getOrderItem,
    getBestProducts,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
}
