module.exports = {
    theme:{
        fontFamily: {
           'main': ['Slabo27px']
        },
        extend: {
            colors: {
                'dark-purple': '#261132',
                'rus-violet': '#3e2f5b',
                'burnt-orange': '#ba5c12',
                'citrine': '#e0ca3c',
                'fawn': '#ffb86f'
            },
        }
    },
    content: [
        'components/**/*.{vue,js,ts}',
        'layouts/**/*.vue',
        'pages/**/*.vue',
        'composables/**/*.{js,ts}',
        'plugins/**/*.{js,ts}',
        'App.{js,ts,vue}',
        'app.{js,ts,vue}',
        'Error.{js,ts,vue}',
        'error.{js,ts,vue}',
        'content/**/*.md'
    ],
    target: [
        'relaxed',
    ]
}