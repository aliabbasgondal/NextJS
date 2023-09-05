import { defineField } from "sanity";

export default {
    name: 'homePage',
    type: 'document',
    title: 'Home Page',
    fields: [       
        defineField({
            name: "banner",
            type: "reference",
            title: "Home Page Banner",
            to:[{type:"homePageBanner"}]
        }),
        defineField({
            name: "promotions",
            type: "reference",
            title: "Home Page Promotions",
            to:[{type:"homePagePromotions"}]
        }),
        defineField({
            name: "homePagePromotionsProducts",
            type: "reference",
            title: "Home Page Promotional Products",
            to:[{type:"homePagePromotionsProducts"}]
        }),
        
        defineField({
            name: "homePagePromotionalArea",
            type: "reference",
            title: "Home Page Promotional Area",
            to:[{type:"homePagePromotionalArea"}]
        }),
        defineField({
            name: "newsletter",
            type: "reference",
            title: "News Letter Section",
            to:[{type:"newsletter"}]
        }),
        

        

    ]
}