export default interface StudyInfoDto {
  subjectId: string;
  studyName: string;
  shortDescription: string;
  infoUrl: string;
  privacyPolicyUrl: string;
  contactName: string;
  contactEmail: string;
  appVersion: string;
  currentlyActiveTrackers: string[];
  enabledWorkHours: boolean;
  // ***AIRBAR - START
  enabledAirbar: boolean;
  enabledAirbarTaskbar: boolean;
  enabledAirbarTaskPlanning: boolean;
  enabledAirbarTimeTracking: boolean;
  enabledAirbarRetrospection: boolean;
  // ***AIRBAR - END
}
