import { defineField } from "sanity";

export default {
    name: 'product',
    type: 'document',
    title: 'product',
    fields: [
        defineField({
            name: "category",
            type: "reference",
            title: "Product Category",
            to: [
                {
                    type: "category"
                }
            ]
        }),
        defineField({
            name: "subCategory",
            type: "reference",
            title: "Product Sub Category",
            to: [
                {
                    type: "subCategory"
                }
            ]
        }),
        {
            name: 'title',
            type: 'string',
            title: 'Product Title'

        },

        {
            name: "description",
            title: "Product Description",
            type: "string"
        },
        defineField(
            {
                name: 'detail',
                title: 'Content',
                type: 'array',
                of: [
                    {
                        type: 'block'
                    },
                    {
                        type: 'image',
                        fields: [
                            {
                                type: 'text',
                                name: 'alt',
                                title: 'Alternative text',
                                description: `Some Texts goes here`,
                                options: {
                                    isHighlighted: true
                                }
                            }
                        ]
                    }
                ]
            }
        ),
        {
            name: "price",
            title: "Product Price",
            type: "number"
        },
        {
            name: "sale_Product",
            title: "Is Sale Product",
            type: "boolean",
            options:[
                "yes", "no"
            ]
        },
        {
            name: "sale_Product_price",
            title: "Sale Price",
            type: "number",
            
        },
        {
            name: "new_product",
            title: "Is new Product",
            type: "boolean",
            options:[
                "yes", "no"
            ]
        },
        defineField({
            name: "color",
            type: "array",
            title: "Product color",
            of: [
                {
                    type: "reference",
                    to: [
                        { type: "color" },
                    ]
                }
            ]
        }),
        defineField({
            name: "Size",
            type: "array",
            title: "Product Size",
            of: [
                {
                    type: "reference",
                    to: [
                        { type: "size" },
                    ]
                }
            ]
        }),
        {
            name: "image",
            title: "Product Image",
            type: "image"

        },
        {
            name: "Alternative_Image",
            title: "Alternative Image",
            type: "array",
            of: [{
                name: "Alt Image",
                title: "Alt Image",
                type: "image"
            }]
        },

    ]
}