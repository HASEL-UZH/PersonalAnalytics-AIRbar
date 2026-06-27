import { StudyConfiguration } from './StudyConfiguration';
import { DataExportFormat } from './DataExportFormat.enum';

const studyConfig: StudyConfiguration = {
  name: 'AIRbar',
  shortDescription:
    'AIRbar is a research-driven task management tool designed to improve focus by limiting your day to a small number of clearly defined priorities. It stays persistently visible on your screen, helping you stay aware of what matters most while also encouraging end-of-day reflection on how you spent your time.',
  infoUrl: 'https://hasel.dev/airbar',
  privacyPolicyUrl: 'https://github.com/HASEL-UZH/PersonalAnalytics/blob/dev/documentation/PRIVACY.md',
  uploadUrl: 'https://hasel.dev/upload',
  contactName: 'Dr. André Meyer',
  contactEmail: 'airbar@hasel.dev',
  subjectIdLength: 6,
  dataExportEnabled: false,
  dataExportFormat: DataExportFormat.ExportAsZippedSqlite,
  dataExportEncrypted: false,
  displayDaysParticipated: false,
  showActiveTimesInOnboarding: true,
  enableRetrospection: true,
  trackers: {
    // ***AIRBAR - START
    taskTracker: {
      enabled: true,
      enabledTaskbar: true,
      enabledRetrospection: true
    },
    // ***AIRBAR - END
    enabledWorkHours: true,
    windowActivityTracker: {
      enabled: true,
      intervalInMs: 1000,
      trackUrls: false,
      trackWindowTitles: true
    },
    userInputTracker: {
      enabled: true,
      intervalInMs: 60000,
      collectKeyDetails: false
    },
    experienceSamplingTracker: {
      enabled: true,
      questions: [
        {
          question:
            'Compared to your normal level of productivity, how productive do you consider the previous session?',
          answerType: 'LikertScale',
          scale: 7,
          responseOptions: ['not at all productive', 'moderately productive', 'very productive']
        },
        {
          question: 'How well did you spend your time in the previous session?',
          answerType: 'LikertScale',
          scale: 5,
          responseOptions: ['not well', 'moderately well', 'very well']
        },
        // {
        //   question: 'What is one aspect that affected your ability to focus the most in the last session?',
        //   answerType: 'TextResponse',
        //   responseOptions: 'singleLine',
        //   maxLength: 100
        // },
        // {
        //   question: 'What best describes your current task type?',
        //   answerType: 'SingleChoice',
        //   responseOptions: ['Coding', 'Reading/Writing Documents', 'Meeting', 'Planning', 'Email & Chat Communication', 'Learning', 'Other']
        // },
        // {
        //   question: 'Which distractions did you experience in the last session?',
        //   answerType: 'MultiChoice',
        //   responseOptions: ['Notifications', 'Meetings', 'Context switching', 'Personal interruptions', 'None']
        // }
      ],
      intervalInMs: 1000 * 60 * 60 * 1, // default interval (must be listed in userDefinedInterval_h if set)
      samplingRandomization: 0.2, // 20% randomization, so the interval will be between 48 and 72 minutes
      allowUserToDisable: true,
      allowUserToChangeInterval: true,
      userDefinedInterval_h: [0.5, 1, 2, 3, 4]
    },
    dailySurveyTracker: {
      enabled: false,
      surveys: [
        {
          samplingType: 'morning',
          delayInMinutes: 5,
          requireAllAnswers: false,
          questions: [
          ]
        },
        {
          samplingType: 'evening',
          delayInMinutes: -30,
          requireAllAnswers: false,
          questions: [
          ]
        }
      ]
    }
  }
};

export default studyConfig;
