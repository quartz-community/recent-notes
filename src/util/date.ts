interface GlobalConfiguration {
  defaultDateType: string;
  [key: string]: unknown;
}

interface QuartzPluginData {
  dates?: Record<string, Date>;
  [key: string]: unknown;
}

export function getDate(cfg: GlobalConfiguration, data: QuartzPluginData): Date | undefined {
  if (!cfg.defaultDateType) {
    throw new Error(
      "Field 'defaultDateType' was not set in the configuration object of quartz.config.ts.",
    );
  }
  return data.dates?.[cfg.defaultDateType];
}
