module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [
       {
         "extends": "stylelint-config-standard",
         "rules": {
           "at-rule-no-unknown": [
             true,
             {
               "ignoreAtRules": ["tailwind"]
             }
           ]
         }
       },
   ],
 }