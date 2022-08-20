import "dotenv/config";

type Config = {
  SHAMAISON_TARGET_STATIONS: "main" | "develop";
};

const globalConfig = () => {
  const SHAMAISON_TARGET_STATIONS = JSON.parse(
    process.env.SHAMAISON_TARGET_STATIONS as string
  );
  return {
    SHAMAISON_TARGET_STATIONS,
  } as Config;
};

export { Config, globalConfig };
