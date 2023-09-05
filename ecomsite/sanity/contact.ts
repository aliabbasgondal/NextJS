import { defineField } from "sanity";

export default {
    name: 'contact',
    type: 'document',
    title: 'Contact Us',
    fields: [
     
        {
            title: 'Launchpad Location',
            name: 'location',
            type: 'geopoint'
          },
       
        {
            name: "email",
            title: "Email",
            type: "email"
        },
        {
            name: "phone",
            title: "Phone Number",
            type: "number"
        },

    ]
}