import { defineField } from "sanity";

export default {
    name: 'header',
    type: 'document',
    title: 'Header Items',
    fields: [
       
        {
            name: "items",
            type: "array",
            title: "Menu Items",
            of:[{

                name:"item",
                type:"object",
                title:"menu Item",
            fields:[{name:"item", title:"Menu Name", type:"string"},
            {name:"menuUrl", title:"Menu Url", type:"string"},
           
        ]
    }
    ]
        },
       
        {
            name: "logo",
            type: "image",
            title: "site logo",
          
        },
        

    ]
}