exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:4210',
      show: true,
      windowSize: '1200x900'
    }
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: [
        './step_definitions/steps.abstract.js',
        './step_definitions/steps.recovery.js',
        './step_definitions/steps.categoryCrud.js',
        './step_definitions/steps.subcategoryCrud.js',
        './step_definitions/steps.course.js',
        './step_definitions/steps.searchCourses.js',
        './step_definitions/steps.courseDetails.js',
    ]
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: './*_test.js',
  name: 'tests'
}