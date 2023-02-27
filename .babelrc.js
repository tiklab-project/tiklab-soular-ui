module.exports  = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": [
                        "> 1%",
                        "last 5 versions",
                        "ie >= 8"
                    ]
                }
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-transform-react-jsx",
        ["@babel/plugin-transform-arrow-functions"],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        "@babel/plugin-syntax-dynamic-import",
        ["@babel/plugin-transform-runtime",
            {
                "regenerator": true
            }
        ],
        ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css"
        }],
        ["import",
            {
                "libraryName": "@ant-design/icons",
                "libraryDirectory": "es/icons",
                "camel2DashComponentName": false
            },
            "@ant-design/icons"
        ],

        ["import", {
            "libraryName": "tiklab-eam-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-eam-ui/es/${fullName}`;
            }
        }, "tiklab-eam-ui"],
        ["import", {
            "libraryName": "tiklab-licence-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-licence-ui/es/${fullName}`;
            }
        }, "tiklab-licence-ui"],
        ["import", {
            "libraryName": "tiklab-message-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-message-ui/es/${fullName}`;
            }
        }, "tiklab-message-ui"],
        ["import", {
            "libraryName": "tiklab-plugin-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-plugin-ui/es/${fullName}`;
            }
        }, "tiklab-plugin-ui"],
        ["import", {
            "libraryName": "tiklab-privilege-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-privilege-ui/es/${fullName}`;
            }
        }, "tiklab-privilege-ui"],
        ["import", {
            "libraryName": "tiklab-user-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-user-ui/es/${fullName}`;
            }
        }, "tiklab-user-ui"],
        ["import", {
            "libraryName": "tiklab-integration-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-integration-ui/es/${fullName}`;
            }
        }, "tiklab-integration-ui"],
        ["import", {
            "libraryName": "tiklab-todotask-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-todotask-ui/es/${fullName}`;
            }
        }, "tiklab-todotask-ui"],
        ["import", {
            "libraryName": "tiklab-security-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-security-ui/es/${fullName}`;
            }
        }, "tiklab-security-ui"],
        ["import", {
            "libraryName": "tiklab-form-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-form-ui/es/${fullName}`;
            }
        }, "tiklab-form-ui"],
        ["import", {
            "libraryName": "tiklab-flow-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const [first, ...other] = split;

                let fullName = first
                for (let i =0; i<other.length; i++) {
                    const firstName = other[i].slice(0,1).toUpperCase();
                    const last =  other[i].slice(1,other[i].length);
                    const name = firstName+last
                    fullName = fullName+name
                }
                return `tiklab-flow-ui/es/${fullName}`;
            }
        }, "tiklab-flow-ui"],

        "@babel/plugin-transform-regenerator",
        "react-hot-loader/babel"
    ]
}
