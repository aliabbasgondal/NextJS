import { defineField } from "sanity";

export default {
    name: 'homePagePromotionalArea',
    type: 'document',
    title: 'Home Page Promotional Area',
    fields: [
        {
            name: "Title",
            type: "string",
            title: "Promotional Area Title",
        },
        {
            name: "PromotionalAreaLeftMessage",
            type: "array",
            title: "Promotional Area Messages",
            of:[
                {name:"AddMessage",
            title:"Add Message",
        type:"object",
    fields:[
        {
            name:"Title",
            type:"string",
            title:"Heading of the Message"
        },
        {
            name:"Message",
            type:"string",
            title:"Promotional Message"
        }
    ]}
                
        ]
        
        },
        {
            name: "PromotionalAreaRightMessage",
            type: "string",
            title: "Promotional Area Right Message",
        },
        {
            name: "featureImage",
            type: "image",
            title: "Feature Image",
          
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
            name: "FeatureSectionButton",
            type: "array",
            title: "Feature Section Button",
            of:[
                {name:"btnLink",
                title:"Add Button Link",
                type:"string"
                },
                {name:"btnText",
                title:"Add Button Title",
                type:"string"
                }

        ]
        },
    ]
}