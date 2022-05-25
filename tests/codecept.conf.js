exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:4210',
      show: !Boolean(process.env.CI),
      headless: Boolean(process.env.CI),
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
      './step_definitions/steps.myCourses.js',
      './step_definitions/steps.lessons.js',
      './step_definitions/steps.auth.js',
      './step_definitions/steps.coursesByCategory.js',
      './step_definitions/steps.lessonsSidebar.js',
      './step_definitions/steps.footer.js',
      './step_definitions/steps.modal.js',
      './step_definitions/steps.anonUserBlock.js',
      './step_definitions/steps.statistics.js',
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
