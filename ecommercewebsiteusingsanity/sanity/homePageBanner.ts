import { defineField } from "sanity";

export default {
    name: 'homePageBanner',
    type: 'document',
    title: 'Home Page Banner',
    fields: [
        {
            name: "homePageBannerIconMessage",
            type: "string",
            title: "Home Page Banner Icon Message",
        },
        {
            name: "homePageBannerSubTitle",
            type: "string",
            title: "Home Page Banner Sub Title",
        },
        {
            name: "homePageBannerSubTitle2",
            type: "string",
            title: "Home Page Banner Second Sub Title",
        },
        {
            name: "homePageBannerButtonText",
            type: "array",
            title: "Home Page Banner Button Text",
            of: [{
                name: "buttonText",
                title: "Button Text",
                type: "string"
            },

            {
                name: "buttonLink",
                title: "Button Link",
                type: "string"
            }
        ]
        },
        {
            name: "brandImages",
            title: "Home Page Brand Images",
            type: "array",
            of: [{
                name: "Brand_Image",
                title: "Brand Image",
                type: "image"
            }]
        },
        {
            name: "BannerImage",
            title: "Home Page Banner Images",
            type: "image",
        },

    ]
}