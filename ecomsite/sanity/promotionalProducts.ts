import { defineField } from "sanity";

export default {
    name: 'homePagePromotionsProducts',
    type: 'document',
    title: 'Promotions Products',
    fields: [
        {
            name: "SectionTitle",
            type: "string",
            title: "Title",
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