import studyConfig from '../../../shared/study.config';

describe('TaskSnap study configuration', () => {
  const taskTracker = studyConfig.trackers.taskTracker;

  test('enables task-context capturing by default', () => {
    expect(taskTracker.taskContextCapturingEnabled).toBe(true);
  });

  test('starts with explicit empty exclusion lists', () => {
    expect(taskTracker.defaultExcludedApps).toEqual([]);
    expect(taskTracker.defaultExcludedWebsites).toEqual([]);
  });
});
