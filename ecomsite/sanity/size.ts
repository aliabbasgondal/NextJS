import { defineField, defineType } from 'sanity'
export const psize = defineType(
    {


        name: 'size',
        type: 'document',
        title: 'Product size',
        
        fields: [
            defineField(
                {
                    name: 'sizes',
                    type: 'string',
                    title: 'Sizes'
                })
        ]

    }
)