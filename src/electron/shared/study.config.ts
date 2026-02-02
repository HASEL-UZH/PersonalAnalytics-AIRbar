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
  trackers: {
    // ***AIRBAR - START
    taskTracker: {
      enabled: true,
      enabledTaskbar: true,
      enabledRetrospection: true
    },
    // ***AIRBAR - END
    windowActivityTracker: {
      enabled: true,
      intervalInMs: 1000,
      trackUrls: false,
      trackWindowTitles: true
    },
    userInputTracker: {
      enabled: true,
      intervalInMs: 60000
    },
    experienceSamplingTracker: {
      enabled: true,
      enabledWorkHours: true,
      scale: 7,
      questions: [
        'Compared to your normal level of productivity, how productive do you consider the previous session?',
        'How well did you spend your time in the previous session?'
      ],
      responseOptions: [
        ['not at all productive', 'moderately productive', 'very productive'],
        ['not well', 'moderately well', 'very well']
      ],
      intervalInMs: 1000 * 60 * 60 * 1, // default interval (must be listed in userDefinedInterval_h if set)
      samplingRandomization: 0.2, // 20% randomization, so the interval will be between 48 and 72 minutes
      allowUserToDisable: true,
      allowUserToChangeInterval: true,
      userDefinedInterval_h: [0.5, 1, 2, 3, 4]
    }
  }
};

export default studyConfig;
