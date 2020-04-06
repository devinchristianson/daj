module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            './tests/testvars.js',
            'https://unpkg.com/tone',
            'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.1.0/papaparse.min.js',
            {pattern: './static/chords.csv', watched: false, included: false, served: true},
            {pattern: './static/**/*.html', watched: false, included: true, served: true},
            {pattern: './static/**/*.css', watched: false, included: true, served: true},
            './static/**/*.js',
            './tests/**/*.js'
        ],
        reporters: ['progress'],
        port: 9876,  // karma web server port
        colors: true,
        logLevel: config.LOG_DEBUG,
        browsers: ['Firefox'], //dont forget to turn ON ChromeHeadless and IE
        autoWatch: false,
        concurrency: Infinity,
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless'],
            },
        },
    })
}