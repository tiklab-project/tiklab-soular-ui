const tailwindcss = require('tailwindcss');


module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer')({
            // overrideBrowserslist: ['> 0.15% in CN']
            overrideBrowserslist: [
                'Android 4.1',
                'iOS 7.1',
                'Chrome > 31',
                'ff > 31',
                'ie >= 8',
                '> 1%', // 必须大于 1% 用户使用的浏览器
                'last 2 versions' // 所有主流浏览器最近的 2个版本
            ],
            grid: false
        })
    ]
}
