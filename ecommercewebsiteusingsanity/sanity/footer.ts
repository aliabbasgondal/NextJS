import { defineField } from "sanity";

export default {
    name: 'footer',
    type: 'document',
    title: 'Footer',
    fields: [
     

       
        {
            name: "FooterLogo",
            title: "Footer Logo",
            type: "image"
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
        
        defineField({
            name: "socialMedia",
            type: "array",
            title: "Social Media Links",
            of: [
                {
                    type: "reference",
                    to: [
                        { type: "SocialIcons" },
                    ]
                }
            ]
        }),
        defineField({
            name: "footerLinks",
            type: "array",
            title: "Footer Links",
            of: [
                {
                    type: "reference",
                    to: [
                        { type: "innerPages" },
                    ]
                }
            ]
        }),
        {
            name: "copyRight",
            title: "Copy Right",
            type: "string"
        },
        {
            name: "designedBy",
            title: "Designed by",
            type: "string"
        },
        {
            name: "codyby",
            title: "Code by",
            type: "string"
        },

    ]
}