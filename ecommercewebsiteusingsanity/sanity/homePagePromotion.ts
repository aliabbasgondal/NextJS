import { defineField } from "sanity";

export default {
    name: 'homePagePromotions',
    type: 'document',
    title: 'Promotions',
    fields: [
        {
            name: "title",
            type: "string",
            title: "Section Title",
        },
        {
            name: "promotionalBanner1",
            type: "object",
            title: "Promotional Banner",
            fields:[{name:"heading", title:"Banner Heading", type:"string"},
            {name:"subHeading", title:"Banner Sub Heading", type:"string"},
            {name:"buttonText", title:"Button Text", type:"string"},
            {name:"buttonLink", title:"Button Link", type:"string"},
            {name:"buttonbg", title:"Button Background", type:"image"},
        ]
        },
        {
            name: "promotionalBanner2",
            type: "object",
            title: "Promotional Banner",
            fields:[{name:"heading", title:"Banner Heading", type:"string"},
            {name:"subHeading", title:"Banner Sub Heading", type:"string"},
            {name:"buttonText", title:"Button Text", type:"string"},
            {name:"buttonLink", title:"Button Link", type:"string"},
            {name:"buttonbg", title:"Button Background", type:"image"},
        ]
        },
        defineField({
            name: "promotionalImage",
            type: "array",
            title: "Promotional Product Image",
            of:[
                {
                    type: "reference",
                    to: [
                        { type: "product" },
                    ]
                }
            ]
        }),
        

    ]
}