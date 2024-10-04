/**
 * An string with the format 'ip:port', example:
 * '0.0.0.0:27015'
 */
type address = string;

/** An object representing time. */
interface Time {
  hours: number;
  minutes: number;
  seconds: number;

  /** Since when is counting. */
  start: Date;
  /** The number of miliseconds that the player has been connected to the server */
  raw: number;
}

/** Info from a player in the server. */
interface ValveServerPlayerInfo {
  /* Index of the player. */
  index: number;
  /** Name of the player. */
  name: string;
  /** Player's score (usually "frags" or "kills"). */
  score: number;
  /** Time that the player has been connected to the server. */
  timeOnline: Time | null;

  /** Player's deaths (Only for "the ship" servers). */
  deaths?: number;
  /** Player's money (Only for "the ship" servers). */
  money?: number;
}

/** An object with the server info */
interface ValveServerInfo {
  /** Ip and port from the server */
  address: address;
  /** Response delay from the server (in miliseconds). */
  ping: number;
  /** Protocol version used by the server. */
  protocol: number;
  /** Whether the server uses a goldsource engine. */
  goldSource: boolean;
  /** Name of the server. */
  name: string;
  /** Map the server has currently loaded. */
  map: string;
  /** Name of the folder containing the game files. */
  folder: string;
  /** Full name of the game. */
  game: string;
  /** Steam Application ID of game. */
  appID: number | bigint;

  /** An object with info from the players in the server. */
  players: {
    /** Number of players on the server. */
    online: number;
    /** Maximum number of players the server reports it can hold. */
    max: number;
    /** Number of bots on the server. */
    bots: number;
  };

  /** Indicates the type of server (dedicated, non-dedicated or source tv relay/HLTV) */
  type: "dedicated" | "non-dedicated" | "source tv relay" | null;
  /** Indicates the operating system of the server (windows, linux or mac) */
  OS: "linux" | "windows" | "mac";
  /** Indicates whether the server requires a password */
  visibility: "private" | "public";
  /** Specifies whether the server uses VAC */
  VAC: boolean;
  /** If the game hasn't a mod it is `false`, otherwise it's the mod info */
  mod?: Mod | false;

  /**
   * This field only exist in a response if the server is running The Ship
   * Indicates the game mode (hunt, elimination, duel, deathmatch, vip team, team elimination)
   */
  mode?:
    | "hunt"
    | "elimination"
    | "duel"
    | "deathmatch"
    | "vip team"
    | "team elimination";
  /**
   * This field only exist in a response if the server is running The Ship
   * The number of witnesses necessary to have a player arrested.
   */
  witnesses?: number;
  /**
   * This field only exist in a response if the server is running The Ship
   * Time (in seconds) before a player is arrested while being witnessed.
   */
  duration?: number;

  /** Version of the game installed on the server. */
  version?: string;

  /** The server's game port number. (provided in the server response) */
  port?: number;
  /** Server's SteamID. */
  steamID?: bigint;

  /** SourceTV data */
  tv?: {
    /** Spectator port number for SourceTV. */
    port: number;
    /** Name of the spectator server for SourceTV. */
    name: string;
  };

  /** Tags that describe the game according to the server. */
  keywords?: string[];

  /** The server's 64-bit GameID. If this is present, the appID is more accurate */
  gameID?: bigint;
}

/** An object with server's rules */
interface ValveServerRules {
  [key: string]: string | boolean | number;
}
