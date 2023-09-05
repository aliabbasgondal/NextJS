import { defineField } from "sanity";

export default {
    name: 'innerPages',
    type: 'document',
    title: 'Inner Pages',
    fields: [
     

        {
            name: "Title",
            title: "Page Title",
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
            name: "images",
            title: "Post Image",
            type: "array",
            of: [{
                name: "Image",
                title: "Image",
                type: "image"
            }]
        },

    ]
}